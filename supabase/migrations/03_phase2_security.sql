-- Phase 2: secure public catalog access, request creation, and admin operations.
-- Apply this migration before adding Supabase credentials to js/config.js.

create schema if not exists private;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.books
  add column if not exists is_active boolean not null default false;

alter table public.orders
  add column if not exists client_request_id text,
  add column if not exists fulfillment_method text,
  add column if not exists notes text,
  add column if not exists source text not null default 'web';

alter table public.orders
  drop constraint if exists orders_client_request_id_check,
  add constraint orders_client_request_id_check
    check (
      client_request_id is null
      or client_request_id ~ '^PF-[0-9]{8}-[A-F0-9]{6}$'
    ),
  drop constraint if exists orders_fulfillment_method_check,
  add constraint orders_fulfillment_method_check
    check (
      fulfillment_method is null
      or fulfillment_method in ('pickup', 'delivery')
    ),
  drop constraint if exists orders_status_check,
  add constraint orders_status_check
    check (status in ('pending', 'confirmed', 'purchased', 'fulfilled', 'cancelled'));

create unique index if not exists orders_client_request_id_idx
  on public.orders(client_request_id)
  where client_request_id is not null;

create index if not exists orders_created_at_idx
  on public.orders(created_at desc);

create index if not exists orders_status_idx
  on public.orders(status);

create unique index if not exists books_slug_idx
  on public.books(slug);

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

alter table public.books enable row level security;
alter table public.orders enable row level security;
alter table public.admin_users enable row level security;

do $$
declare
  policy_row record;
begin
  for policy_row in
    select tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('books', 'orders', 'admin_users')
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      policy_row.policyname,
      policy_row.tablename
    );
  end loop;
end;
$$;

revoke all on table public.books from anon, authenticated;
revoke all on table public.orders from anon, authenticated;
revoke all on table public.admin_users from anon, authenticated;

grant select on table public.books to anon, authenticated;
grant insert on table public.orders to anon, authenticated;
grant select, update on table public.orders to authenticated;
grant insert, update, delete on table public.books to authenticated;
grant select on table public.admin_users to authenticated;

create policy books_anon_read_active
on public.books
for select
to anon
using (is_active);

create policy books_authenticated_read
on public.books
for select
to authenticated
using (
  is_active
  or (select private.is_admin())
);

create policy books_admin_insert
on public.books
for insert
to authenticated
with check ((select private.is_admin()));

create policy books_admin_update
on public.books
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy books_admin_delete
on public.books
for delete
to authenticated
using ((select private.is_admin()));

create policy orders_public_create
on public.orders
for insert
to anon, authenticated
with check (
  client_request_id is not null
  and jsonb_typeof(items) = 'array'
  and jsonb_array_length(items) between 1 and 20
  and jsonb_typeof(user_details) = 'object'
  and length(trim(coalesce(user_details->>'name', ''))) between 2 and 80
  and length(trim(coalesce(user_details->>'contact', ''))) between 5 and 120
  and fulfillment_method in ('pickup', 'delivery')
  and length(coalesce(notes, '')) <= 500
  and status = 'pending'
  and total_amount is null
  and receipt_sent = false
  and source = 'web'
);

create policy orders_admin_read
on public.orders
for select
to authenticated
using ((select private.is_admin()));

create policy orders_admin_update
on public.orders
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy admin_users_read_own
on public.admin_users
for select
to authenticated
using (user_id = (select auth.uid()));

comment on table public.admin_users is
  'Users permitted to access Pages Forward store administration.';

comment on column public.books.is_active is
  'Controls whether a catalog row is publicly visible.';

comment on column public.orders.client_request_id is
  'Human-readable request ID generated by the public web client.';

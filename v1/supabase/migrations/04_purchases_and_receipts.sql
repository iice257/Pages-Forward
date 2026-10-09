-- Phase 3: purchases, delivery details, private receipt storage, and admin operations.
-- Apply after 03_phase2_security.sql.

alter table public.orders
  add column if not exists delivery_address text,
  add column if not exists contact_phone text,
  add column if not exists receipt_path text,
  add column if not exists receipt_name text,
  add column if not exists receipt_type text,
  add column if not exists receipt_size integer;

alter table public.orders
  alter column status set default 'paid_pending_confirmation';

alter table public.orders
  drop constraint if exists orders_status_check,
  add constraint orders_status_check
    check (
      status in (
        'paid_pending_confirmation',
        'confirmed_paid',
        'processing',
        'fulfilled',
        'cancelled'
      )
    ),
  drop constraint if exists orders_receipt_type_check,
  add constraint orders_receipt_type_check
    check (
      receipt_type is null
      or receipt_type in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp')
    ),
  drop constraint if exists orders_receipt_size_check,
  add constraint orders_receipt_size_check
    check (receipt_size is null or receipt_size between 1 and 5242880),
  drop constraint if exists orders_contact_phone_check,
  add constraint orders_contact_phone_check
    check (contact_phone is null or length(trim(contact_phone)) between 7 and 40),
  drop constraint if exists orders_delivery_address_check,
  add constraint orders_delivery_address_check
    check (delivery_address is null or length(trim(delivery_address)) between 8 and 300);

create index if not exists orders_contact_phone_idx
  on public.orders(contact_phone);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'purchase-receipts',
  'purchase-receipts',
  false,
  5242880,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
declare
  policy_row record;
begin
  for policy_row in
    select tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'orders'
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      policy_row.policyname,
      policy_row.tablename
    );
  end loop;

  for policy_row in
    select policyname
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname like 'purchase_receipts_%'
  loop
    execute format(
      'drop policy if exists %I on storage.objects',
      policy_row.policyname
    );
  end loop;
end;
$$;

revoke all on table public.orders from anon, authenticated;
grant insert on table public.orders to anon, authenticated;
grant select, update on table public.orders to authenticated;

grant insert on table storage.objects to anon, authenticated;
grant select on table storage.objects to authenticated;

create policy orders_public_purchase_create
on public.orders
for insert
to anon, authenticated
with check (
  client_request_id is not null
  and client_request_id ~ '^PF-[0-9]{8}-[A-F0-9]{6}$'
  and jsonb_typeof(items) = 'array'
  and jsonb_array_length(items) between 1 and 20
  and jsonb_typeof(user_details) = 'object'
  and length(trim(coalesce(user_details->>'phone', ''))) between 7 and 40
  and length(trim(coalesce(user_details->>'address', ''))) between 8 and 300
  and contact_phone = user_details->>'phone'
  and delivery_address = user_details->>'address'
  and fulfillment_method = 'delivery'
  and status = 'paid_pending_confirmation'
  and total_amount is null
  and receipt_sent = true
  and receipt_path is not null
  and split_part(receipt_path, '/', 1) = 'purchase-receipts'
  and split_part(receipt_path, '/', 2) = client_request_id
  and receipt_name is not null
  and receipt_type in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp')
  and receipt_size between 1 and 5242880
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

create policy purchase_receipts_public_upload
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'purchase-receipts'
  and (storage.foldername(name))[1] ~ '^PF-[0-9]{8}-[A-F0-9]{6}$'
  and lower(name) ~ '^PF-[0-9]{8}-[A-F0-9]{6}/[0-9]+-receipt\.(pdf|jpg|jpeg|png|webp)$'
);

create policy purchase_receipts_admin_read
on storage.objects
for select
to authenticated
using (
  bucket_id = 'purchase-receipts'
  and (select private.is_admin())
);

comment on column public.orders.delivery_address is
  'Delivery address provided by the customer during purchase checkout.';

comment on column public.orders.contact_phone is
  'Phone number used by the bookstore to contact the purchaser.';

comment on column public.orders.receipt_path is
  'Private Supabase Storage path in the purchase-receipts bucket.';

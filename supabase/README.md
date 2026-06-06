# Supabase Setup

The storefront currently runs offline-first. Supabase is optional until a live Pages Forward project is connected and verified.

## Important

`migrations/02_seed_data.sql` contains the deprecated generated catalog. It is not the current real bookstore inventory.

Do not enable `useRemoteCatalog` in `js/config.js` until:

1. The Phase 2 security migration is applied.
2. The 39 real inventory rows are imported.
3. Only the real rows have `is_active = true`.
4. Public and admin access have been tested against Row Level Security.

## Setup Order

1. Create or connect the intended Supabase project.
2. Apply the existing schema migration required by the project.
3. Apply `migrations/03_phase2_security.sql`.
4. Create the administrator through Supabase Auth.
5. Seed that Auth user into `public.admin_users`:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'admin@example.com'
on conflict (user_id) do nothing;
```

6. Import the real catalog and set those rows to `is_active = true`.
7. Put the project URL and publishable key in `js/config.js`.
8. Test anonymous catalog reads, anonymous request inserts, denied order reads, and authenticated admin operations.
9. Set `useRemoteCatalog: true` only after the remote inventory matches `js/data.js`.

The publishable key is safe to include in browser code only when RLS and grants are correct. Never place a secret or service-role key in this repository.

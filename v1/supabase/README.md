# Supabase Setup

The storefront runs offline-first until a live Pages Forward Supabase project is connected and verified.

## Important

The deprecated generated fake catalog seed was removed. Do not enable `useRemoteCatalog` in `js/config.js` until the 39 real inventory rows are imported and marked active.

## Setup Order

1. Create or connect the intended Supabase project.
2. Apply `migrations/01_update_schema.sql`.
3. Apply `migrations/03_phase2_security.sql`.
4. Apply `migrations/04_purchases_and_receipts.sql`.
5. Create the administrator through Supabase Auth.
6. Seed that Auth user into `public.admin_users`:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'admin@example.com'
on conflict (user_id) do nothing;
```

7. Import the real catalog and set real rows to `is_active = true`.
8. Put the project URL and publishable key in `js/config.js`.
9. Configure `store.bankName`, `store.accountName`, `store.accountNumber`, and `store.whatsappNumber` in `js/config.js`.
10. Test anonymous active catalog reads.
11. Test anonymous receipt upload into the private `purchase-receipts` bucket.
12. Test anonymous purchase insert with receipt, address, and phone.
13. Test denied anonymous purchase reads.
14. Test authenticated admin reads, receipt signed URLs, purchase status updates, and inventory updates.
15. Set `useRemoteCatalog: true` only after the remote inventory matches `js/data.js`.

The publishable key is safe to include in browser code only when RLS and grants are correct. Never place a secret or service-role key in this repository.

## Current Live Backend Status

The connected Supabase account currently exposes only inactive, unrelated projects. No migration has been applied to a live database from this workspace.

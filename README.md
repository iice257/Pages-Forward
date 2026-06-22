# Pages Forward

Pages Forward is an offline-first storefront for a real bookstore inventory. Visitors browse available and reserved books, add available books to cart, view bank-transfer details, enter delivery details, upload a transaction receipt, and reach the store on WhatsApp.

## Active Pages

- Storefront and cart checkout: `index.html`
- Purchase history: `purchases.html`
- Store admin: `admin.html`

## Stack

- Static HTML, CSS, and JavaScript
- Browser `localStorage` for offline purchase history
- Optional Supabase backend for catalog, purchases, receipt storage, and admin access
- Optional Vercel static deployment via `vercel.json`

## MVP Flow

1. Visitor opens the catalog.
2. Available books appear before reserved or unavailable books.
3. Visitor adds available books to cart.
4. Cart count and selected books update immediately.
5. Visitor checks out and sees the configured bank-transfer account.
6. Visitor enters delivery address and phone number.
7. Visitor uploads a PDF/image transaction receipt.
8. Purchase is saved to `localStorage.pf_purchases`.
9. If Supabase is configured, the receipt uploads to private Storage and the purchase row is inserted.
10. Visitor can open WhatsApp with the purchase details.
11. Admin signs in with Supabase magic link, verifies `admin_users`, reviews purchases, opens receipts, updates purchase status, and manages inventory.

## Configuration

Edit `js/config.js` before using this outside local testing:

- `store.bankName`
- `store.accountName`
- `store.accountNumber`
- `store.whatsappNumber`
- `supabase.url`
- `supabase.publishableKey`
- `supabase.receiptBucket`

Do not put Supabase secret or service-role keys in browser files.

## Supabase

Apply migrations in order:

1. `supabase/migrations/01_update_schema.sql`
2. `supabase/migrations/03_phase2_security.sql`
3. `supabase/migrations/04_purchases_and_receipts.sql`

The old generated fake seed was removed. Import only the real bookstore catalog when enabling remote catalog reads.

## Vercel

`vercel.json` enables clean URLs, cache headers for static assets, and basic security headers for the static deployment.

## Cleanup Notes

- `origin/main` metadata was merged into the active app.
- `origin/alts` was not merged because it is old gifting/catalogue work.
- `origin/next-js-port` was not merged because it is an older framework migration with gifting/request concepts and would slow the current purchase MVP.
- Obsolete prototype pages, old modules, generated fake seed data, and unused catalog preview assets were pruned.

## Production Gaps

- Configure the real bank account and WhatsApp number.
- Apply migrations to the correct active Supabase project.
- Import the real catalog into Supabase if remote catalog mode is enabled.
- Add abuse protection/rate limiting for public purchase creation and receipt uploads.
- Add backups, monitoring, and admin runbooks.
- Add automated browser regression coverage for checkout and admin.

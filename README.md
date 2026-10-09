# Pages Forward

A real bookstore, kept as three versions behind one landing page with three tabs.

| Tab | Folder | What it is |
|---|---|---|
| **V1 Storefront** (live) | `v1/` | Offline-first static storefront for the real inventory: cart, bank-transfer checkout, receipt upload, WhatsApp hand-off, optional Supabase admin. Pages: `index.html`, `purchases.html`, `admin.html`. |
| **V2 Rebuild** (prototype) | `v2/` | Vite rebuild: showcase, catalog, book detail, checkout, library and an ebook reader. Originally Express + lowdb (`v2/server`); the deployed landing builds it with `VITE_STATIC=1`, which swaps in `src/utils/api.static.js` (seed data + localStorage) so it needs no server. |
| **V3 Primordial Cosmic** (concept) | `v3/` | A premium-bookstore direction. Not built; holds the January 2026 design references and the original starter page (`stub-original.html`). |

## Run and build

```bash
npm run build      # assembles dist/: landing, v1, v2 (Vite, static demo mode), v3
npm run preview    # serves dist/ on http://localhost:4173
```

- Develop V1 by opening `v1/index.html` (static, no build).
- Develop V2 with its real server: `cd v2 && npm install && npm start` (API on :3001, Vite on :5173).
- Vercel builds with `npm run build` and serves `dist/` (see `vercel.json`). The landing embeds each version in an iframe, so `X-Frame-Options` is `SAMEORIGIN`.

## History

V2 was a separate repo (`Pages-forward-rebuild`); its history was merged into this one. Supabase setup for V1 is in `v1/supabase/` and `v1/docs/APP_MAP.md`; see V1's section below for the original MVP flow.

## V1 details (original README)

### Active Pages

- Storefront and cart checkout: `v1/index.html`
- Purchase history: `v1/purchases.html`
- Store admin: `v1/admin.html`

### Stack

- Static HTML, CSS, and JavaScript
- Browser `localStorage` for offline purchase history
- Optional Supabase backend for catalog, purchases, receipt storage, and admin access
- Optional Vercel static deployment via `vercel.json`

### MVP Flow

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

### Configuration

Edit `js/config.js` before using this outside local testing:

- `store.bankName`
- `store.accountName`
- `store.accountNumber`
- `store.whatsappNumber`
- `supabase.url`
- `supabase.publishableKey`
- `supabase.receiptBucket`

Do not put Supabase secret or service-role keys in browser files.

### Supabase

Apply migrations in order:

1. `supabase/migrations/01_update_schema.sql`
2. `supabase/migrations/03_phase2_security.sql`
3. `supabase/migrations/04_purchases_and_receipts.sql`

The old generated fake seed was removed. Import only the real bookstore catalog when enabling remote catalog reads.

### Vercel

`vercel.json` enables clean URLs, cache headers for static assets, and basic security headers for the static deployment.

### Cleanup Notes

- `origin/main` metadata was merged into the active app.
- `origin/alts` was not merged because it is old gifting/catalogue work.
- `origin/next-js-port` was not merged because it is an older framework migration with gifting/request concepts and would slow the current purchase MVP.
- Obsolete prototype pages, old modules, generated fake seed data, and unused catalog preview assets were pruned.

### Production Gaps

- Configure the real bank account and WhatsApp number.
- Apply migrations to the correct active Supabase project.
- Import the real catalog into Supabase if remote catalog mode is enabled.
- Add abuse protection/rate limiting for public purchase creation and receipt uploads.
- Add backups, monitoring, and admin runbooks.
- Add automated browser regression coverage for checkout and admin.

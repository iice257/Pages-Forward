# Pages Forward

Pages Forward is an offline-first catalog for a real bookstore inventory. Visitors can browse available and reserved books, build a request list, provide contact and fulfillment details, save the request, and share it with the bookstore.

## MVP Scope

- Public entry point: `index.html`
- Saved request history: `requests.html`
- Protected operations scaffold: `admin.html`
- Catalog data: `js/data.js`, generated from the real inventory metadata in `assets/gifts_metadata.csv`
- Covers: local files in `assets/covers`
- Request persistence: browser `localStorage`
- Optional backend: Supabase, disabled until `js/config.js` is configured
- Fulfillment: offline follow-up after a request is shared, or server-side capture after Supabase is secured

The MVP intentionally does not fake prices, checkout, payments, delivery, or entitlement. Prices and fulfillment details are confirmed by the bookstore after request submission.

See `docs/APP_MAP.md` for the current page, action, and feature inventory.

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static file server.

Example:

```powershell
python -m http.server 4173
```

Then visit `http://127.0.0.1:4173/index.html`.

## Verified Flow

1. Visitor lands on the bookstore catalog.
2. Available books appear first; reserved books remain visible but cannot be requested.
3. Visitor adds an available book to the request list.
4. Request list count updates and the selected book is visible.
5. Visitor provides a name, contact, and pickup or delivery preference.
6. The validated pending request is saved to `localStorage.pf_orders`.
7. The request list clears and the generated request can be shared or copied.
8. The saved request remains visible on `requests.html`.

## Current Inventory Notes

- 39 real books are in the current catalog.
- 18 are marked available.
- 21 are marked reserved.
- Two books currently use fallback cover art because matching cover files were not found:
  - `Advantage Play`
  - `The Amazing Results of Positive Thinking`

## Not Production-Ready Yet

Phase 2 now includes:

- Validated request details and fulfillment preference
- Saved request history with share, copy, and remove actions
- Optional Supabase request sync
- Fail-closed administrator authentication scaffold
- RLS and least-privilege migration scaffolding
- Persistent light/dark theme

Before deploying this as a real operational storefront, complete and verify:

- Real pricing and stock source of truth
- Connect the intended Supabase project
- Apply and verify the Phase 2 security migration
- Import the real catalog and activate only those rows
- Seed at least one approved administrator
- Server-side rate limiting or abuse prevention for public requests
- Error logging and monitoring
- Deployment configuration
- Backup and recovery plan for inventory/orders
- Automated browser coverage for the request and admin flows

The configured legacy Supabase hostname no longer resolves and has been removed from client code. Do not enable remote catalog loading until the replacement project is connected and its real inventory matches `js/data.js`.

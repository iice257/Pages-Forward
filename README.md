# Pages Forward

Pages Forward is a lightweight static catalog for a real bookstore inventory. The current MVP lets visitors browse available and reserved books, add available books to a request list, and save/copy a bookstore request for follow-up.

## MVP Scope

- Public entry point: `index.html`
- Catalog data: `js/data.js`, generated from the real inventory metadata in `assets/gifts_metadata.csv`
- Covers: local files in `assets/covers`
- Request persistence: browser `localStorage`
- Fulfillment: offline follow-up after the request is copied or sent to the bookstore

The MVP intentionally does not fake prices, checkout, payments, delivery, or entitlement. Prices and fulfillment details are confirmed by the bookstore after request submission.

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
5. Visitor submits the request.
6. A pending request is saved to `localStorage.pf_orders`.
7. The request list clears and the generated request message can be copied.

## Current Inventory Notes

- 39 real books are in the current catalog.
- 18 are marked available.
- 21 are marked reserved.
- Two books currently use fallback cover art because matching cover files were not found:
  - `Advantage Play`
  - `The Amazing Results of Positive Thinking`

## Not Production-Ready Yet

Before deploying this as a real operational storefront, review and implement:

- Real pricing and stock source of truth
- Authenticated admin access
- Supabase Row Level Security and least-privilege policies
- Server-side order/request capture
- Input validation and rate limiting
- Error logging and monitoring
- Deployment configuration
- Backup and recovery plan for inventory/orders
- A basic automated browser test for the request flow

`admin.html` and the Supabase migrations are early scaffolding only. Do not treat the admin surface as safe for production until authentication and database policies are in place.

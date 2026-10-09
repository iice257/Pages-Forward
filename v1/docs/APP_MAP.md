# Pages Forward App Map

## Active MVP Pages

### `index.html` - Storefront

Purpose: browse real inventory, add available books to cart, and complete a bank-transfer purchase.

Actions:

- Move between featured books with arrows, mouse wheel, swipe, or keyboard arrows
- Open the full catalog
- Search by title, author, description, category, or niche
- View available, reserved, and unavailable status
- Add or remove available books from cart
- Review cart
- View configured bank-transfer account
- Enter delivery address
- Enter phone number with contact-use disclosure
- Upload transaction receipt
- Save a validated purchase
- Copy/share purchase details
- Reach out on WhatsApp
- Open saved purchase history
- Toggle light and dark themes

### `purchases.html` - My Purchases

Purpose: show purchases saved in the current browser.

Actions:

- Review purchase ID, date, phone, receipt name, and selected books
- Reach out on WhatsApp
- Share a purchase through the Web Share API when supported
- Copy a purchase to the clipboard
- Remove a local purchase record after confirmation
- Return to the catalog
- Toggle light and dark themes

Limit: local history is device- and browser-specific until Supabase is connected.

### `admin.html` - Store Operations

Purpose: manage purchases and inventory after the backend is configured.

States:

- Backend setup required
- Administrator sign in
- Access denied
- Authorized operations dashboard

Authorized actions:

- Send a Supabase magic-link sign-in email
- Refresh purchases and inventory
- Open transaction receipts through short-lived signed URLs
- Confirm payment, mark processing, fulfill, or cancel purchases
- Update book price, stock, and availability
- Sign out

Security behavior: the page performs no database reads or writes until a Supabase session exists and the user is present in `public.admin_users`.

## Shared Modules

- `js/data.js`: real 39-book inventory
- `js/purchases.js`: purchase validation, persistence, receipt upload, formatting, sharing, WhatsApp URL generation, and optional backend sync
- `js/theme.js`: persistent light/dark theme
- `js/config.js`: public runtime configuration
- `js/supabase-client.js`: optional, guarded Supabase initialization
- `css/style.css`: storefront, cart, and checkout styles
- `css/purchases.css`: saved-purchase page styles

## Current Product Boundary

The product is now a bookstore purchase workflow using bank transfer and receipt upload. It is not an online card checkout and does not independently verify payment; the admin confirms receipt/payment before fulfillment.

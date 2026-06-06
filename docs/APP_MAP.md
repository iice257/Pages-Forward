# Pages Forward App Map

## Active MVP Pages

### `index.html` - Bookstore Catalog

Purpose: browse the real inventory and create a bookstore request.

Actions:

- Move between featured books with arrows, mouse wheel, swipe, or keyboard arrows
- Open the full catalog
- Search by title, author, description, category, or niche
- View available, reserved, and unavailable status
- Add or remove available books from the request list
- Review the request list
- Enter customer name and phone or email
- Choose pickup or delivery
- Add optional fulfillment notes
- Save a validated request
- Share or copy the generated request
- Open saved request history
- Toggle light and dark themes

### `requests.html` - My Requests

Purpose: show requests saved in the current browser.

Actions:

- Review request ID, date, customer, fulfillment method, and selected books
- Share a request through the Web Share API when supported
- Copy a request to the clipboard
- Remove a local request record after confirmation
- Return to the catalog
- Toggle light and dark themes

Limit: local history is device- and browser-specific until Supabase is connected.

### `admin.html` - Store Operations

Purpose: manage requests and inventory after the backend is configured.

States:

- Backend setup required
- Administrator sign in
- Access denied
- Authorized operations dashboard

Authorized actions:

- Send a Supabase magic-link sign-in email
- Refresh requests and inventory
- Confirm, fulfill, or cancel requests
- Update book price, stock, and availability
- Sign out

Security behavior: the page performs no database reads or writes until a Supabase session exists and the user is present in `public.admin_users`.

## Deprecated Pages

### `explore.html`

Status: obsolete prototype.

Issues:

- Uses the old state/filter architecture
- Contains gifting-theme references
- Links to nonexistent `forward.html` and `collection.html`
- Does not represent the current request workflow

### `legacy.html`

Status: archived catalog prototype.

Issues:

- Uses old collection terminology and filtering logic
- Contains gifting-season compatibility behavior
- Is not part of the active MVP journey

## Shared Modules

- `js/data.js`: real 39-book inventory
- `js/requests.js`: request validation, persistence, formatting, sharing, and optional backend sync
- `js/theme.js`: persistent light/dark theme
- `js/config.js`: public runtime configuration
- `js/supabase-client.js`: optional, guarded Supabase initialization
- `css/style.css`: catalog and request-flow styles
- `css/requests.css`: saved-request page styles

## Current Product Boundary

The product is a bookstore request workflow, not an ecommerce checkout. It does not calculate a payable total, collect payment, promise delivery, or mark a request as a completed sale. The bookstore confirms pricing and fulfillment separately.

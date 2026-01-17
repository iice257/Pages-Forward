# Pages Forward — Architecture & MVP Roadmap

## 0. Reframe (important)

Scrapping the *Pages Forward = no going back* mechanic **right now** is the correct call. You’re not killing the brand; you’re deferring a constraint. Shipping the site > enforcing philosophy early. Philosophy can be layered later without re‑architecting if we’re deliberate now.

So the new priority is:

> **A fast, filterable, readable, data‑smart book platform that can scale into gifting, collections, and commerce.**

Everything below is structured to avoid rewrites.

---

## 1. Tech Stack (Validated & Minimal)

### Frontend

- **React** (Vite or Next.js App Router)
  - If SEO matters immediately → **Next.js**
  - If speed of build > SEO → **Vite + React** (can migrate later)

**Recommendation:** Next.js. Books + previews + filters benefit from crawlability.

### Styling

- Tailwind CSS (utility speed + consistency)
- **shadcn/ui** (base component primitives — Button, Dialog, Tabs, Dropdown, Toast)
- **Radix UI** (underlying accessibility primitives, used directly where needed)
- shadcn‑based extensions as needed (e.g. **cmdk** for command palette, **sonner** for toasts)

**Rationale:** avoid rebuilding solved components, keep full control over markup/styles, and remain framework‑agnostic. Components live in‑repo and can be edited freely.

### State

- URL‑driven state for filters (`?genre=…&format=…`)
- Local state only for UI (modals, onboarding steps)

---

## 2. Core Site Structure (Non‑Negotiable)

### Pages

- `/` → Main catalogue
- `/gift` → Gifting‑only filtered view (or `/ ?mode=gift`)
- `/book/[slug]` → Book detail + preview
- `/collections` → User collections (future‑proofed)

**Do NOT over‑page. Filtering should do most of the work.**

---

## 3. Catalogue & Filter System (This is your edge)

You’re right: filters are the soul of a book site.

### Filters (V1)

- Genre
- Mood / Theme
- Length
- Format (Physical / Audio / Ebook)
- Price
- Gifting eligible (boolean)

### Filter Principles

- Multi‑select
- Sticky
- URL‑encoded
- Resettable
- Zero re‑renders (client‑side filtering on cached dataset)

### Marketing Angle

> “Find *exactly* the book you want — not an algorithm’s guess.”

That’s strong.

---

## 4. Gifting Mode (Critique + Refinement)

Your gifting flow is solid but **must be a MODE, not a page mutation hack**.

### Recommended Implementation

- **Golden bordered button / banner** → toggles `giftMode = true`
- UI reacts globally:
  - "Add" → "Choose"
  -
    - icon → bookmark / check icon
  - Prices slashed
  - Non‑gift books hidden

### Naming Clarity

The top‑left text/logo is called:

> **Wordmark** (text logo) or **Site Identity / Brand Mark**

In React terms: `Header > Brand`

---

## 5. Gift Selection Rules (Validated)

### Constraints (Correct)

- 1 gift per verified user
- Physical copy only
- No cart behavior

### Critique

This **cannot rely on frontend state alone**. OTP verification must mint a **persistent anonymous user ID**.

---

## 6. OTP + Verification Flow (Clean Architecture)

### Flow (Approved)

1. Click "Choose"
2. Modal opens
3. Step 1: Onboarding (2–3 lines)
4. Step 2: Email input
5. Step 3: OTP input
6. Verification success → gift locked

### Anti‑Abuse (Minimal)

- OTP cooldown (60s)
- Max 3 attempts / hour
- Hash email → never store raw

---

## 7. Collections System (MVP vs Future)

### V1 (Minimal)

- Gift collection
  - Max 1
- Email‑verified but anonymous (no public identity; persistent via backend user ID + localStorage)

### V2

- Want to Read
- Read
- Do Not Suggest

### V3

- Public lists
- Shareable profiles

**Do NOT ship all at once.**

---

## 8. Book Preview System (Critical Decision)

### Recommendation: DOWNLOAD, NOT READER (for now)

Why:

- Reader = pagination, memory, resume, device quirks
- Preview ≠ full reading experience

### Implementation

- Server generates **preview PDF** (Prologue + Chapter 1)
- Rate‑limit: 1 preview / day / user
- Watermarked subtly

Reader can come later.

---

## 9. Formats & Pricing (Sanity Check)

### Formats

- Physical
- Ebook (PDF/EPUB)
- Audiobook

### Bundles

- Any 2 → discount
- All 3 → max discount

**Do NOT surface all pricing complexity on day one UI.**
Progressive disclosure.

---

## 10. Ratings & Comments (Anonymous = Smart)

### Rules

- Anonymous but locked to user ID
- Can only rate books they’ve previewed or purchased
- No likes / replies (reduces moderation burden)

---

## 11. Video Books (Correctly Deferred)

This is a **V4 feature**.
Document it, ignore it, move on.
You were right to park it.

---

## 12. Database Choice (Strong Critique Here)

### Supabase — Yes, but with discipline

Why it works:

- Postgres (real database)
- Free tier generous
- Auth + OTP built‑in
- Row‑level security

### Schema Core

- books
- authors
- formats
- gift\_eligibility
- users (anonymous)
- collections
- ratings

### Bulk Updates

- CSV import
- Admin dashboard
- AI agents can write via RPC safely

**Spreadsheets will fail you.**
Supabase is the correct floor.

---

## 13. Data Collection (Ethical + Useful)

### What to Track (Core)

- Filter usage (which filters, combinations, frequency)
- Preview downloads (per book, per user)
- Gift selections (conversion, drop‑offs)
- Page views & funnel exits

### Insight Routing (Non‑Optional)

Data is not just logged — it must **flow back as insight**.

#### For You (Admin / Builder)
- Internal analytics dashboard:
  - Most filtered genres/themes
  - High‑interest books with low conversion
  - Preview → gift conversion rate
  - Gifting funnel drop‑off points
- Exportable data (CSV) for deeper analysis
- Signals to guide:
  - Catalogue curation
  - Pricing adjustments
  - Gifting rotations

#### For Users (Private & Personal)
- Lightweight personal stats page:
  - Books previewed
  - Genres explored
  - Gifts chosen (history)
  - Reading intent signals (Want to Read / Read)
- Framed as **reflection**, not gamification

### Guardrails

Avoid:
- Creepy tracking
- Dark patterns
- Public leaderboards
- Social pressure mechanics

All analytics remain:
- Anonymous
- Opt‑in where required
- Useful to decision‑making, not dopamine loops

---

## 14. MVP Cut Line (Be ruthless)

### MVP MUST INCLUDE

- React rebuild
- Catalogue + filters
- Gifting mode
- OTP verification
- Preview downloads
- Supabase backend

### MUST NOT

- Reader
- Video books
- Social features
- Accounts

---

## 15. Final Verdict

You’re not overthinking.
You’re **correctly sequencing**.

The only real danger is:

> **Shipping nothing because everything is possible.**

Your next move should be:

1. Lock MVP
2. Scaffold Supabase
3. Build filters first
4. Add gifting mode last

If you want, next we can:

- Design the filter UX
- Write the Supabase schema
- Draft the OTP backend logic
- Or define the exact MVP feature checklist


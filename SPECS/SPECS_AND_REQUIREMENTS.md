# SPECS_AND_REQUIREMENTS.md — Pages Forward

> All functional requirements, UI/UX behavior, feature specs, edge cases, and constraints.

---

## 1. First Impressions: Splash Screen

### Welcome Experience
- On first visit, users see a **splash screen** with "Pages Forward" in large, elegant typography
- Fades away after ~2 seconds with smooth transition

### Gifting Season Splash
- When "Gifting Season" is activated (via button OR filter), display a similar transitional splash
- Text: "Gifting Season" with gold gradient styling
- Brief, elegant, then fades to reveal filtered gift-eligible books

---

## 2. Catalogue

### Display
- After splash, users see elegant **split-screen experience**:
  - Left panel: Large book cover with dramatic shadows
  - Right panel: Title, author, description, genre tags
- Arc carousel at bottom for navigation

### The Promise (MUST BE VISIBLE)
> *"This isn't a cart or wishlist. It's a single, deliberate choice."*

This messaging must be prominently displayed where users can read it — **not tucked away**.

---

## 3. Search & Filter System

> **Source of Truth**: `assets/search_and_filter_specifications.md`

### Architecture Principles
- Search and Filters are **core navigation infrastructure**, not auxiliary UI
- Implemented as **separate, well-isolated modules**
- Reusable, testable, URL-driven, analytics-aware

### Tagging Schema (Strict — Enforced at Data Layer)
Every book **must** have exactly three tags:

| Tag Level | Options | Rules |
|-----------|---------|-------|
| **Primary Type** | Fiction, Non-fiction | Exactly one |
| **Main Category** | 17 options (Business, Motivational, Romance, etc.) | Exactly one |
| **Niche/Genre** | Specific descriptor (Cyberpunk, Productivity, Trauma, etc.) | Exactly one |

### Filter Button Behavior
- **Default**: Icon-only button on left side
- **On Click**: Expands horizontally to left with smooth animation
- **Expanded State**: Reveals dual-mode toggle `[Sort | Filter]` + filter options

### Search Component
- Search icon on **right side** (opposite Filter)
- Expands into combobox when clicked
- Only one of Search OR Filter may be expanded at a time
- Fuzzy search across: title, author, description, all three tags

### Search Results Display
- Results appear as user types
- Each result shows book title + up to three matched metadata fields with highlighting
- **When no results**: Combobox offers "Request '{query}' as a book" option

### Grouping Logic
- Default: A-Z alphabetical grouping
- Groups dynamically reorder/disappear/re-form with search/filter
- **Never flatten into ungrouped feed**

---

## 4. Book Requests System (V1 — Required)

> Treat Requests as **foundational infrastructure**, not optional enhancement.

### Purpose
- Allow users to request books not in catalogue
- Convert dead ends (empty search/filters) into engagement
- Provide demand insight for catalogue expansion

### Entry Points (All Required)
| Location | Trigger |
|----------|---------|
| Search combobox | No results → "Request '{query}' as a book" |
| Filter results | Zero results → "Can't find what you're looking for? Request a book" |
| Full library view | Explicit but secondary button |

### Request Flow
1. Opens lightweight modal/form
2. Capture:
   - **Requested title** (required)
   - Author (optional)
   - Format preference: Physical / Ebook / Audio (optional)
   - Note (optional)
3. User identity:
   - **Anonymous in public display**
   - Persisted internally
   - Email reused if already verified elsewhere

### Explicit Non-Goals
- ❌ No voting on requests
- ❌ No public request list
- ❌ No social features

---

## 5. Gifting Mode

### Activation Methods
1. **Button**: "Gifting Season" button (gold-accented, prominent)
2. **Filter**: Gift filter selection

Both trigger the Gifting Season splash experience.

### When Active
- Non-gift books **hidden**
- Prices visually **slashed**
- "Add" → "Choose"
- Gold accents throughout

### Why One Selection? (MUST BE VISIBLE)
> *"Pages Forward believes in intentional reading. One book, chosen carefully, read deeply."*

This explanation must be elegantly presented and visible to users.

---

## 6. Gift Rules

| Rule | Constraint |
|------|------------|
| Gifts per user | **1 maximum** |
| Format | **Physical copy only** |
| Cart behavior | **None** — single selection |
| Verification | **Email OTP required** |

---

## 7. Gift Selection Flow

### User Account Awareness
- If user already verified from regular browsing, **skip onboarding and email steps**
- Only ask for OTP verification if needed

### Step Sequence (New Users)
1. Click "Choose" on a book
2. Modal with steps (conditional):
   - **Step 1**: Onboarding copy (skip if returning)
   - **Step 2**: Email input (skip if verified)
   - **Step 3**: OTP verification
3. Success → Gift locked

### Onboarding Copy (VISIBLE & ELEGANT)
> *"Pages Forward is offering one free physical book to verified readers. This is your book — no strings, no catches. Choose wisely; once confirmed, your selection is final."*

---

## 8. Anti-Abuse Measures

| Protection | Limit |
|------------|-------|
| OTP cooldown | **60 seconds** between sends |
| Max attempts | **3 per hour** per email |
| **OTP timeout** | **10 minutes** — code expires (backend-enforced) |
| Email storage | **Hashed only** |
| Rate limiting | **Backend-enforced** |

---

## 9. Admin Dashboard (V1 — Required)

> The dashboard is the **primary operational surface** for the site owner.

### Purpose
- Clear visibility into all site activity
- Quick scanning and decision-making
- No external tools required to understand activity

### Dashboard Scope (V1)
| Section | Content |
|---------|---------|
| **Gift Selections** | Recent gifts, user info, timestamps, new/unread state |
| **Book Requests** | All requests, title/author/format, timestamps, new badge |
| **Orders** | Even if purchasing not fully enabled yet |
| **Activity Summary** | Basic counts and recent activity |

### UI Requirements
- Clean, readable, non-cluttered
- Optimized for quick scanning
- No analytics overreach in V1

### Explicit Non-Goals
- ❌ No complex charts/graphs in V1
- ❌ No real-time push updates in V1

---

## 10. Notifications Strategy (Phased)

### V1 — Dashboard Only
- **No push notifications**
- **No email notifications**
- All events visible via admin dashboard only

### V2 — Transactional Email
- Email alerts for high-signal events:
  - New gift selected
  - New book request
  - New order
- Emails are **operational**, not marketing

### V3/V4 — Optional Push
- Real-time alerts only if justified by volume
- Layer on existing event architecture

---

## 11. Event Architecture (Forward-Compatible)

Systems must emit clear internal events for:

| Event | Triggered When |
|-------|----------------|
| `gift.selected` | User claims a gift |
| `request.submitted` | User submits book request |
| `order.created` | User places an order |

Events must be:
- Decoupled from delivery mechanisms
- Consumable by: Dashboard (V1), Email (V2), Push (V3+)

---

## 12. Navigation & Gestures

### Keyboard
- All interactive elements keyboard-navigable
- Arrow keys for book navigation

### Mouse
- Scrollable navigation where applicable

### Touch (Mobile & Desktop Touchscreens)
- Clean, smooth swipe gestures
- Must not break other interactions or cause glitches

---

## 13. Accessibility

- Focus indicators visible
- Screen reader labels for icons
- Color not sole indicator of status
- Reduced motion mode supported

---

## 14. Analytics Events

### Builder Insights (Admin Dashboard)
- Filter usage
- Search terms (aggregated)
- Preview → gift conversion rate
- Request patterns

### User Insights (Personal)
- Books previewed
- Genres explored
- Gift history

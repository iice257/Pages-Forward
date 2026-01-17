# ARCHITECTURE_AND_DESIGN.md — Pages Forward

> System architecture, frontend structure, backend design, state management, and data flow.

---

## 1. Frontend Architecture

### Framework
- **Next.js (App Router)** — Scaffolded in root `/` (HTML files moved to `/pf-html`)

### Styling
- **Tailwind CSS** — Utility-first, consistency with existing design tokens
- **shadcn/ui** — Base component primitives
- **Radix UI** — Underlying accessibility primitives

### Design Tokens (from `pf-html/css/gifting-theme.css`)
```css
:root {
  --bg: #f8f5f0;      /* Warm cream background */
  --bg2: #fdfcf9;     /* Panel background */
  --sand: #d8cfc2;    /* Border color */
  --ink: #1a1815;     /* Primary text */
  --sage: #6b7a62;    /* Success state */
  --amber: #c4884a;   /* Warning/reserved state */
  --red: #a85454;     /* Error state */
  --avail: #4a8c5a;   /* Available state */
  --gold-gradient: linear-gradient(135deg, #DFBD69 0%, #F9ECA5 50%, #B88A44 100%);
}
```

---

## 2. Component Structure

### Core Components

| Component | Purpose |
|-----------|---------|
| `<SplashScreen />` | Welcome + Gifting Season variants |
| `<Header />` | Brand, Filter, Search, GiftMode, Theme, Collection |
| `<BookSlide />` | Dual-panel with gesture support |
| `<ArcCarousel />` | Bottom navigation |
| `<VerificationModal />` | OTP flow with conditional steps |
| `<RequestModal />` | Book request form |

### Search & Filter (Isolated Modules)

| Module | Location |
|--------|----------|
| `<FilterButton />`, `<FilterPanel />`, `<FilterGroup />` | `components/filter/` |
| `<SearchButton />`, `<SearchCombobox />` | `components/search/` |
| `useFilters`, `useSearch`, `useGrouping` | `hooks/` |

### Admin Components

| Component | Purpose |
|-----------|---------|
| `<AdminLayout />` | Dashboard shell |
| `<GiftsList />` | Recent gift selections |
| `<RequestsList />` | Book requests with status |
| `<OrdersList />` | Order tracking |
| `<ActivityFeed />` | Recent events summary |

---

## 3. Data Schema

### Books (Strict 3-Tag Schema)
```typescript
interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  primaryType: 'Fiction' | 'Non-fiction';
  mainCategory: MainCategory; // 17 options
  niche: string;
  authorPopularity: number; // 0-1
  bookPopularity: number;   // 0-1
  length: 'Short' | 'Medium' | 'Long';
  status: 'available' | 'reserved' | 'unavailable';
  isGiftEligible: boolean;
}
```

### Book Requests
```typescript
interface BookRequest {
  id: string;
  requestedTitle: string;
  author?: string;
  formatPreference?: 'physical' | 'ebook' | 'audio';
  note?: string;
  userUuid: string;
  userEmail?: string; // hashed
  isRead: boolean;
  createdAt: Date;
}
```

### Events (Forward-Compatible)
```typescript
interface AppEvent {
  id: string;
  type: 'gift.selected' | 'request.submitted' | 'order.created';
  payload: Record<string, unknown>;
  userUuid: string;
  isRead: boolean;
  createdAt: Date;
}
```

---

## 4. Global State

### URL-Driven (filters)
```
/?category=business&length=medium&sort=popularity&mode=gift
```

### Local State (UI)
- `isGiftMode`, `isFilterExpanded`, `isSearchExpanded`
- `currentSlideIndex`, `isModalOpen`, `modalStep`

### Persisted (localStorage)
- `collection`, `dismissed`, `onboardingComplete`, `emailVerified`, `uuid`

---

## 5. Pages (Routes)

### Public
| Route | Purpose |
|-------|---------|
| `/` | Main catalogue with slider |
| `/?mode=gift` | Gift mode |
| `/book/[slug]` | Book detail |

### Admin
| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard overview |
| `/admin/gifts` | Gift selections list |
| `/admin/requests` | Book requests list |
| `/admin/orders` | Orders list |

---

## 6. Backend Architecture (Supabase)

### Tables

```sql
-- books (strict 3-tag schema)
id, slug, title, author, primary_type, main_category, niche,
author_popularity, book_popularity, length, status, is_gift_eligible

-- users
id, uuid, email_hash, email_verified, onboarding_complete, gift_claimed

-- book_requests (V1)
id, requested_title, author, format_preference, note,
user_uuid, user_email_hash, is_read, created_at

-- events (forward-compatible)
id, type, payload, user_uuid, is_read, created_at

-- collections
id, user_id, book_id, status, created_at
```

### Event Emission Pattern
All user actions emit events that are:
- Stored in `events` table
- Consumable by Admin Dashboard (V1)
- Ready for Email (V2), Push (V3+)

---

## 7. Data Flow

```
User Action → Event Emitted → Stored in DB
                    ↓
            Admin Dashboard (V1)
                    ↓
            Email Alerts (V2)
                    ↓
            Push Notifications (V3+)
```

---

## 8. Admin Dashboard (V1)

### Design Principles
- Clean, readable, non-cluttered
- Optimized for quick scanning
- No analytics overreach
- Primary notification surface (no email in V1)

### Layout
```
┌─────────────────────────────────────────────┐
│ Admin Dashboard                              │
├──────────────┬──────────────────────────────┤
│ Sidebar      │ Main Content                 │
│ ─────────    │ ─────────────                │
│ Overview     │ [Activity Summary]           │
│ Gifts        │ [Recent Gifts]               │
│ Requests     │ [Recent Requests]            │
│ Orders       │ [Recent Orders]              │
└──────────────┴──────────────────────────────┘
```

---

## 9. Navigation & Gestures

### Keyboard
- Arrow keys, Tab, Enter/Space

### Mouse
- Scroll wheel navigation on carousel

### Touch
- Swipe left/right (smooth, non-blocking)

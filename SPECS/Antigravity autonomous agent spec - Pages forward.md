# Pages Forward — Autonomous Agent Spec (Antigravity / Claude / Gemini)

> **Purpose:** This document is the *single source of truth* prompt for an autonomous coding/design agent (Claude 4.5 primary; Gemini 3 Pro fallback) operating in Antigravity using spec‑driven development (walkthroughs + task lists).

> **Operating mode:** Long‑running, near‑autonomous execution with minimal human intervention. The agent should assume ownership, make reasonable decisions, and surface questions only when absolutely blocking.

---

## FILE STRUCTURE REQUIREMENT (MANDATORY)

The agent MUST split outputs into **separate files/artifacts** as follows:

1. **`PROJECT_RULES.md`**

   - Immutable rules the agent must always follow

2. **`ARCHITECTURE_AND_DESIGN.md`**

   - System architecture
   - Frontend structure
   - Backend design
   - State management
   - Data flow

3. **`SPECS_AND_REQUIREMENTS.md`**

   - All functional requirements
   - UI/UX behavior
   - Feature specs
   - Edge cases
   - Constraints

> The agent must NOT collapse these into a single file.

---

## PROJECT\_RULES.md

### 1. Authority & Autonomy

- Assume autonomy in implementation decisions.
- Do not ask permission for reasonable choices.
- Ask questions ONLY if blocked by missing information.

### 2. Scope Discipline

- Implement **MVP only**.
- Future features (V2–V4) must be acknowledged but **never implemented or included in task lists**.

### 3. UI Philosophy

- Discovery‑first, not algorithm‑first.
- Choice over accumulation (especially in gifting mode).
- Minimal, restrained, readable.
- No dark patterns.

### 4. Component Policy

- Use **shadcn/ui** components as the base.
- Components are copied into the repo and modified freely.
- No full UI frameworks (MUI, AntD, Chakra, etc.).

### 5. Identity Model

- Users are **email‑verified but socially anonymous**.
- Email is required for OTP verification.
- No public profiles or usernames in MVP.

### 6. Data Ethics

- Collect only useful data.
- No behavioral manipulation.
- Analytics must benefit both builder and user.

### 7. Non‑Negotiables

- Filters must be URL‑driven.
- Gifting is a global MODE, not a separate hacky page.
- Backend rules must enforce all limits (not frontend only).

---

## ARCHITECTURE\_AND\_DESIGN.md

### Frontend

- Framework: **Next.js (App Router)**
- Styling: Tailwind CSS
- Components: shadcn/ui + Radix UI where needed

### Global State

- `mode: "browse" | "gift"`
- Filter state encoded in URL params
- UI state local only (modals, steps)

### Pages

- `/` — main catalogue
- `/gift` OR `/?mode=gift`
- `/book/[slug]`
- `/collections`

### Backend

- Platform: **Supabase**
- Auth: Email + OTP
- Database: PostgreSQL
- Row‑Level Security enforced

### Core Tables (High‑Level)

- books
- authors
- formats
- users (email‑verified, anonymous)
- collections
- ratings
- analytics\_events

### Data Flow

- User action → event logged
- Event → analytics tables
- Aggregates → admin insights + user stats

---

## SPECS\_AND\_REQUIREMENTS.md

### Catalogue

- Display all books
- Filterable by:
  - Genre
  - Mood / Theme
  - Length
  - Format
  - Price
  - Gift eligibility

### Filters

- Multi‑select
- Sticky
- Resettable
- URL‑encoded
- Client‑side filtering on cached dataset

### Gifting Mode

- Activated via prominent gold‑accented button/banner
- When active:
  - Non‑gift books hidden
  - Prices visually slashed
  - "Add" → "Choose"
  - Plus icon → bookmark / selection icon

### Gift Rules

- One gift per verified user
- Physical copy only
- No cart behavior

### Gift Selection Flow

1. User clicks "Choose"
2. Modal opens
3. Step 1: onboarding copy (2–3 lines)
4. Step 2: email input
5. Step 3: OTP verification
6. Success locks gift

### Anti‑Abuse

- OTP cooldown: 60 seconds
- Max attempts: 3 per hour

### Collections (MVP)

- Gift collection only
- Max 1 item
- Visible only after verification

### Book Preview

- Downloadable PDF only
- Includes prologue + chapter 1
- Rate‑limited: 1 preview per user per day
- Subtle watermark

### Ratings & Comments

- Anonymous
- One rating per user per book
- Only if previewed or purchased

### Analytics & Insights

#### Builder

- Filter usage
- Preview → gift conversion
- Funnel drop‑offs

#### User

- Books previewed
- Genres explored
- Gift history

---

## FUTURE VERSIONS (REFERENCE ONLY — DO NOT BUILD)

### V2

- Reading lists
- Want to Read / Read / Do Not Suggest

### V3

- Public profiles
- Shareable lists

### V4

- Video books
- AI summaries

These MUST NOT appear in task lists.

---

## WALKTHROUGH.md

The agent should generate a narrative walkthrough explaining:

- How a user discovers books
- How filtering works
- How gifting mode changes the site
- How verification and gifting work
- How data is collected and surfaced

Written for iterative review.

---

## TASK LIST.md

The agent's ordered task list must include:

1. Project scaffolding
2. Supabase setup
3. Auth + OTP flow
4. Catalogue ingestion
5. Filter system
6. Gifting mode
7. Preview downloads
8. Analytics events

Each task must be:

- Testable
- MVP‑scoped

---

## FINAL INSTRUCTION TO AGENT

You are building a **real product**, not a demo.

Optimize for:

- Clarity
- Maintainability
- Forward compatibility
- Follow the existing design etc

Do not invent features.
Do not skip constraints.
Do not wait for permission.

Proceed deliberately.


---

## ⚠️ Critical Project Framing: Migration, Not Greenfield

This project is **NOT a new build**. It is a **controlled migration and refactor** of an already-working system.

### Source of Truth
- The existing implementation lives in **a single large HTML file**.
- That file contains **real layout decisions, real design language, real UX intent, and real components (even if implicit)**.
- This existing HTML must be treated as the **authoritative reference**, not a draft or placeholder.

### Purpose of React + shadcn
- React and shadcn are being introduced to **avoid reinvention**, not enable it.
- The goal is to **extract, modularize, and improve** what already exists.
- shadcn components should be preferred wherever possible to prevent burning tokens rebuilding solved UI patterns.

### Migration Principles (in strict order)
1. **Preserve behavior and layout** from the existing HTML
2. **Decompose into sane, reusable components**
3. **Improve consistency, ergonomics, and maintainability**
4. **Optimize UX only where real friction exists**

### Implementation Expectations
- Begin by **decomposing the existing HTML** into pages, sections, and repeating patterns.
- Treat each extracted unit as a **candidate component**, not a blank design space.
- For each component:
  - First ask: *Which shadcn component already expresses this?*
  - If there is an ~80% match, adapt it rather than replacing it.
  - Only build custom components when the existing HTML implies one or shadcn cannot express the behavior cleanly.

### Explicit Non-Goals
- ❌ Reimagining or redesigning the site
- ❌ Architecture-for-architecture’s-sake
- ❌ Abstract component systems without grounding
- ❌ Token-heavy reinvention of solved UI patterns
- ❌ Treating React as a license to start over

### Guiding Rule (Non-Negotiable)
> **Start from what exists, extract it, then improve it — never invent first.**

Any deviation from this rule indicates the implementation is off course.


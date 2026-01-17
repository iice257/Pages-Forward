# Search and Filter Specifications

This document defines the **authoritative architecture, behavior, and constraints** for the Search and Filter system. It supersedes and refines any prior informal descriptions. The system is intentionally opinionated and must be implemented as a **first‑class, robust subsystem**, not a generic filter panel.

---

## 1. Foundational Principles

- Search and Filters are **core navigation infrastructure**, not auxiliary UI.
- They must be implemented as **separate, well‑isolated components/modules**.
- They must be reusable, testable, URL‑driven where applicable, and analytics‑aware.
- Do **not** simplify or flatten the system for convenience.

---

## 2. Tagging & Classification System (Strict Schema)

Every book **must** have exactly **three tags**, enforced at the data layer:

### 2.1 Primary Type (exactly one)
- Fiction
- Non‑fiction

### 2.2 Main Category (exactly one)
One of the following (≈17 total):
- Business
- Motivational
- Romance
- Sci‑Fi
- Health
- Mental
- Biography
- History
- Psychology
- Self‑Help
- Philosophy
- Finance
- Technology
- Politics
- Culture
- Religion / Spirituality
- Other

### 2.3 Niche / Genre (exactly one)
- Highly specific descriptor (e.g. Cyberpunk, Domestic Thriller, Productivity, Trauma, etc.)

No book may exist without **all three tags present**.

---

## 3. Filter Component Architecture

### 3.1 Structural Requirements

- Filters must live in a **dedicated module/file**.
- The main app may only consume **exposed state, callbacks, or events**.
- Avoid hard coupling with search, grouping, or page layout logic.

---

## 4. Filter Entry & Expansion Behavior

### 4.1 Filter Button (Left Side)

**Default State**
- Icon‑only button labeled implicitly as Filter

**On Click**
- Expands horizontally **to the left**
- Smooth width + opacity animation
- Reveals filter controls

### 4.2 Expanded Filter Controls

When expanded, the filter reveals buttons for:
- Category
- Length
- Popularity
- Availability
- Gift (separate single‑state filter)

The entry button transforms into a **dual‑mode toggle**:

```
[ Sort | Filter ]
```

This toggle determines whether selections apply sorting or filtering logic.

Only **one main filter group** may be open at a time.

---

## 5. Nested Interaction Logic (Critical)

- Clicking a main filter button reveals its child options.
- Selecting a child option:
  - Applies immediately
  - Closes all open menus
  - Collapses the filter back to its default button state

### Active State Display

When active, the collapsed Filter button displays:

```
[ Parent Filter — Child Selection ]
```

### Constraints
- Only **one main filter** active at a time
- At most **two child selections** active simultaneously (where applicable)

---

## 6. Filter Definitions

### 6.1 Category Filter

**Child Options**
- Fiction
- Non‑fiction
- All main categories (≈17)

**Rules**
- Fiction / Non‑fiction do **not** exclude other categories
- Maximum of **two category children** active at once

**Layout**
- Fills available horizontal space
- Small but readable font
- Wraps naturally across lines

---

### 6.2 Length Filter

**Child Options**
- Short
- Medium
- Long

**Rules**
- Mutually exclusive
- Only one may be selected

---

### 6.3 Popularity Filter

Two underlying dimensions per book:
- Author popularity (0–1)
- Book popularity (0–1)

Mapped to labels:
- Renowned
- Moderate
- Niche / Underground

This filter must support **both sorting and filtering**, depending on the Sort | Filter toggle.

---

### 6.4 Availability Filter

- Single‑state (no children)
- When active, only available books are shown
- Obeys Sort | Filter toggle logic

---

### 6.5 Gift Filter

- Separate single‑state filter (similar to Availability)
- Filters books eligible for gifting
- Must integrate cleanly with Gifting Mode

---

## 7. Search Component (Independent Subsystem)

### 7.1 Placement & Interaction

- Search icon lives on the **right side**, opposite Filter
- Clicking Search:
  - Expands into a search bar (combobox)
  - Collapses the Filter if open
- Clicking Filter collapses Search if open

Only **one of Search or Filter** may be expanded at any time.

---

### 7.2 Search Behavior

- Fuzzy search across:
  - Book title
  - Author name
  - Description
  - Any of the three tags

- Search applies **before** filters and sorting
- Filters then refine the search results
- Search must work with zero filters applied

---

### 7.3 Combobox Results

- Results appear as the user types
- Each result shows:
  - Book title (primary)
  - Up to **three matched metadata fields**, clearly labeled

Example:
- Title: *Atomic Habits*
- Matches:
  - Category: Motivational
  - Description: “…habits…”
  - Niche: Productivity

- Matched terms must be **highlighted**
- Results must be cleanly formatted and readable

---

## 8. Grouping Logic (Non‑Negotiable)

### Default State
- Full list grouped alphabetically (A–Z)
- Sorted alphabetically within groups

### With Search / Filters / Sorting
- Groups must dynamically:
  - Reorder
  - Disappear
  - Re‑form

The grouping structure **must remain intact** unless explicitly disabled.
Do **not** flatten the list into a single ungrouped feed.

---

## 9. Technical & Architectural Constraints

- Search and Filter logic must live in **separate modules**
- Grouping logic must be decoupled from filtering
- URL state must reflect filters where applicable
- Analytics hooks must exist for:
  - Filter usage
  - Search terms (aggregated, non‑invasive)

---

## 10. Interpretation Rules

- If ambiguity exists, choose the **most conservative interpretation**
- Do not silently merge features
- Do not remove limits or constraints

---

## Final Note

This system is intentionally **not generic**.

It is a core product surface.
Treat it with the same rigor as authentication or payments.


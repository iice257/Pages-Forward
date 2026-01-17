# PROJECT_RULES.md — Pages Forward

> Immutable rules the agent and all contributors must always follow.

---

## 1. Authority & Autonomy

- Assume autonomy in implementation decisions
- Do not ask permission for reasonable choices
- Ask questions **ONLY** if blocked by missing information

## 2. Scope Discipline

- Implement **MVP only**
- Future features (V2–V4) must be acknowledged but **never implemented or included in task lists**
- V2: Reading lists (Want to Read / Read / Do Not Suggest)
- V3: Public profiles, shareable lists  
- V4: Video books, AI summaries

## 3. UI Philosophy

- **Discovery-first**, not algorithm-first
- **Choice over accumulation** (especially in gifting mode)
- **Minimal, restrained, readable**
- **No dark patterns**

## 4. Component Policy

- Use **shadcn/ui** components as the base
- Components are copied into the repo and modified freely
- **No full UI frameworks** (MUI, AntD, Chakra, etc.)
- Only build custom components when shadcn cannot express the behavior cleanly

## 5. Identity Model

- Users are **email-verified but socially anonymous**
- Email is required for OTP verification
- No public profiles or usernames in MVP

## 6. Data Ethics

- Collect only useful data
- No behavioral manipulation
- Analytics must benefit both builder and user
- No creepy tracking, dark patterns, or social pressure mechanics

## 7. Non-Negotiables

- Filters **must be URL-driven**
- Gifting is a **global MODE**, not a separate page
- Backend rules must enforce all limits (not frontend only)

## 8. Migration Principle (Guiding Rule)

> **Start from what exists, extract it, then improve it — never invent first.**

- The existing HTML is the **authoritative reference**
- React and shadcn are introduced to **avoid reinvention**, not enable it
- Preserve behavior and layout first, then decompose into components, then improve

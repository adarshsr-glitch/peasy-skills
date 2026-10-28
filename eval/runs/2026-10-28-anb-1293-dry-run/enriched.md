# Enriched brief — Electricity Products Admin (ANB-1293)

> Produced by `peasy-brainstorm` from `vague.md` and the ANB-1293 rules in `pack/rules/`. Every value carries a confidence stamp. Business rules default to `open` and point at the Jira epic.

## Problem

The current Electricity Specifications screen is cluttered with obsolete fields and lacks per-supplier scoping, so admins cannot efficiently find, create, or maintain products belonging to a specific supplier. Stamp: `confident`.

(Source: brief verbatim + `ANB-1293 Goal & Business Value` in the pack confirms the same motivation.)

## User

Admin user of the New Engine Admin — Peasy staff maintaining the product catalog that feeds the comparison engine. Stamp: `confident`.

## Success signal

Admin can land on the Specifications tab, pick a supplier, and either edit, create, or duplicate a product in that supplier's catalog without seeing fields the business no longer uses. "Feel like Peasy" is unresolved beyond visual tokens — see opens below. Stamp: `inferred`.

## Vertical and supplier

- Vertical: `electricity` — stamp: `confident` (brief + Jira epic).
- Supplier: any supplier that has electricity products registered — the feature is multi-tenant per-supplier. Stamp: `confident`.

## Affected surfaces

- [x] Admin / New Engine Admin
- [ ] Public comparison flow
- [ ] "In vergelijking" display
- [ ] API only

Stamp: `confident`. Scope is explicitly admin-only; the comparison flow consumes products but is out of scope.

## Change shape

- [x] New flow (new screen or new state) — a redesigned Specifications tab with progressive-disclosure states, replacing the legacy screen.
- [x] Changed field (default, validation, label) — several fields relabelled, obsolete ones removed, status badge introduced per `ANB-1348`.
- [x] New rule (no UI change) — per-supplier uniqueness enforcement per `ANB-1358`.
- [ ] New field on an existing screen — net new fields are not introduced; the 17 fields exist already (some are relabelled, several obsolete ones are removed).

Stamp: `inferred`. The brief says "clean up," which the pack reconciles to "removed obsolete fields, introduced supplier scoping, new rules for status + uniqueness." A PM should confirm nothing additional is wanted.

## Jira epic reference

`ANB-1293` — Energy / New Engine Admin: Electricity Product Specifications. Stamp: `confident`.

Child stories carried into scope (all present in `pack/rules/anb-1293.md`):

- `ANB-1298` View and select electricity products
- `ANB-1303` Create a new electricity product
- `ANB-1304` Manage product specifications
- `ANB-1305` Save specifications
- `ANB-1306` Manage product status (badge + `Toon in vergelijking` lock)
- `ANB-1307` Empty state when no supplier is selected
- `ANB-1308` Multilingual readiness (NL / FR / EN)
- `ANB-1347` Duplicate electricity product
- `ANB-1358` Validate product name uniqueness per supplier

## Open rules

Every rule the Jira stories list is already in `pack/rules/anb-1293.md` with a citation. What stays open is intent beyond Jira — things the brief hints at but no ticket resolves:

- `open` — "Make it feel like Peasy": does this imply motion, micro-copy warmth, playful empty-state illustrations, or purely visual-token conformance? (Peasy brand voice in `../../../peasy.be-brand-kit.md` is "playful + reassuring + plain-spoken" but no Jira ticket maps those to admin UI.)
- `open` — Transition behavior from the current legacy screen URL: does the new screen reuse the same route, or does a redirect need to happen on first ship?
- `open` — Analytics / event tracking on create, duplicate, and save actions: not mentioned in any ANB story.
- `open` — Keyboard shortcuts or power-user affordances: not mentioned.

## Notes for review

Fields the PM should sanity-check before invoking `/peasy-ship`:

- **Success signal** (`inferred`) — "cluttered → clean" is directional, not measurable. If there's a time-to-create or clicks-to-save metric the admin team cares about, add it.
- **Change shape** (`inferred`) — I assumed the four Jira stories above exhaust the delta. Confirm nothing new is wanted on top (e.g., bulk edit, CSV import, archived state).
- **Open rules** — the four opens are the real decisions. Nothing in Jira resolves them; a PM / designer call is needed.

Everything else was derivable with confidence from the brief plus the ANB-1293 rules in the pack.

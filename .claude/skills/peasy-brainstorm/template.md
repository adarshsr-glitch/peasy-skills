# Enriched brief — <feature name>

> **How this file works.** Every value below carries a confidence stamp (`confident`, `inferred`, `open`). Edit anything marked `inferred` or `open` before invoking `/peasy-ship`. Business rules default to `open` and must cite a Jira epic.

## Problem

<one-sentence statement of what gap this feature closes>
Stamp: `inferred`

## User

<who this feature serves — admin, consumer, supplier, FA, etc.>
Stamp: `inferred`

## Success signal

<how we'll know this feature worked>
Stamp: `open`

## Vertical and supplier

- Vertical: <electricity | gas | mortgage | insurance>
- Supplier: <specific supplier if applicable, or "any">

Stamp: `inferred`

## Affected surfaces

- [ ] Public comparison flow (consumer-facing)
- [ ] Admin / New Engine Admin
- [ ] "In vergelijking" (comparison display)
- [ ] API only

Stamp: `inferred`

## Change shape

- [ ] New field on an existing screen
- [ ] Changed field (default, validation, label)
- [ ] New flow (new screen or new state)
- [ ] New rule (no UI change)

Stamp: `inferred`

## Jira epic reference

<ANB-XXXX if known>
Stamp: `open`

## Open rules

Every rule starts here as `open`. Resolve each one by (a) pointing at the Jira epic above, (b) having an FA / BA fill it in explicitly, or (c) adding it to `pack/rules/<epic>.md` before invoking `/peasy-ship`.

- `open` — <specific rule the brief implies but is not yet in pack/rules/>
- `open` — <another rule to resolve>
- `open` — <another>

## Notes for review

<the brainstorm skill fills this with a short list of which fields it marked `inferred` or `open` and why, so the PM knows exactly where to focus>

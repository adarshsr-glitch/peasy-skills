# pack/components/

One file per Peasy component. Each file documents:

- Import path from Peasy's frontend package.
- Props / API surface.
- Variants and states.
- Usage rules (when to pick this component vs. a cousin).
- Accessibility expectations.

**Currently empty.** Blocks on Peasy's frontend repo being cloned. See `../../BLOCKERS.md`.

Minimum set the ANB-1293 benchmark needs before Phase 3 can run:

- `Dropdown.md` (supplier + product selectors; follows the Dropdown Guidelines referenced in `ANB-1298 AC5`)
- `TextInput.md`
- `TextInputNumeric.md` (for `Contractduur`, `Indexeringsperiode`)
- `RadioGroup.md` (for `Toon in vergelijking`, status-dependent locking)
- `CheckboxGroup.md` (for `Betaalmethoden`)
- `Button.md` (primary + ghost variants: `Product aanmaken`, `Annuleren`, Save)
- `Badge.md` (Status pill: green `Actief`, grey `Niet actief`)
- `StickyActionBar.md` (top + bottom Save actions, per `ANB-1305 AC1`)
- `PageHeader.md`

Each of these must be the real component Peasy ships, not a reimplementation.

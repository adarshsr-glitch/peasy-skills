# Deviations log — ANB-1293 Electricity Edit View

Run date: 2026-10-28
Pack version: whatever's at HEAD when this prototype was built.
Prototype output: `sandbox/src/features/anb-1293-electricity/EditView.tsx` and `./*.module.css`.

Honest accounting of where the prototype departed from the pack, and where the pack itself is still a reconstruction rather than a mirror.

## Components resolved against the pack

All 9 ANB-1293 components imported from `src/components/` are built directly from the matching `pack/components/*.md` file. The observable API is preserved. Peasy devs porting this feature should map each import per the file's `peasy_mapping:` frontmatter line.

## High-severity deviations

### Dropdown is a native `<select>`

Pack says the Dropdown must show status-colored items in the product dropdown per `ANB-1306 AC3`. The sandbox uses a native HTML `<select>` for keystroke-free simplicity; native option styling is browser-dependent and does not support the colored dot. Treat the sandbox dropdown as a stand-in for Peasy's real custom dropdown.

**Phase 4 fix location:** `pack/components/Dropdown.md` + snippet request.

### Button state treatments

Pack flags hover / focus / active / disabled / loading as inferred. The sandbox implements:

- Hover: `filter: brightness(0.95)`.
- Focus: `outline: 2px solid var(--indigo)` with 2px offset.
- Disabled: `opacity: 0.5` + `cursor: not-allowed`.
- Loading: not implemented. No loading simulation in this prototype.

Peasy's real Button almost certainly has specific treatments for all five. Snippet request priority: high (this is `pack/components/README.md` ask #1).

### Figma dev mode not available

Every token value in `src/tokens.css` is a hex approximation from PNG observation. The approximations are honest but not exact. On port, Peasy's real token source overrides this file entirely.

## Medium-severity deviations

### StickyActionBar reconstructed as a layout wrapper

`pack/components/StickyActionBar.md` openly flagged this may be a layout pattern rather than a component. The sandbox implements it as a thin component with `position="top" | "bottom"` and no sticky positioning behavior (no `position: fixed` or `sticky`). The ANB-1305 AC1 requirement "Save at both top and bottom" is met by rendering the button at the top via `PageHeader actions` and at the bottom via a direct wrapper — StickyActionBar as implemented isn't actually used in `EditView.tsx`. On port: either Peasy's component replaces this, or this file + its usage pattern get documented in `pack/patterns/` instead.

### TextInputNumeric is a separate component

Pack flags this as likely a prop on `TextInput`, not a separate component. The sandbox keeps it separate for parity with `pack/components/TextInputNumeric.md`. On port: delete `TextInputNumeric.tsx` and pass `inputMode="numeric"` (or Peasy's equivalent) to `<TextInput>` directly.

### RadioGroup locked state

`ANB-1306 AC5` requires `Toon in vergelijking` to auto-set to Nee and lock when Status = Niet actief. The sandbox implements `locked` as a boolean prop on `RadioGroup`; when true, non-selected options dim and clicks are suppressed. Peasy's real shape may use a different prop name or compose this behavior differently (per-option disabled, or a wrapping guard). Snippet request priority: high.

## Low-severity deviations

### Icons

The five SVG icons in `src/components/icons.tsx` are hand-drawn stand-ins. Peasy ships its own icon set — on port, swap every icon import for Peasy's equivalents.

### Fonts

The sandbox loads Manrope from Google Fonts as a fallback for both Grold and gfflt (both proprietary). Visually close but not pixel-identical. On port: Peasy's real font pipeline replaces the Google Fonts import.

### Metadata chip composition

The pack doesn't define a dedicated "metadata chip" or "date stamp" component; the sandbox renders them inline inside `PageHeader meta`. Peasy may ship `Chip` and `DateStamp` as named components — snippet request priority: low.

### No actual save, no routing, no validation

The sandbox is state-only. "Nieuw product," "Dupliceer product," and both Save buttons are no-ops. The create and duplicate flows are not implemented — only the `product-selected` edit view. `ANB-1358` uniqueness, `ANB-1303 AC5` empty-field validation, and `ANB-1305 AC4` single-product update are all behavioral requirements the pack documents but the prototype doesn't exercise.

## What the sandbox proves

- The 9 pack component files compose into a working admin surface. The Figma composition is achievable from the pack APIs without inventing a new component.
- The token layer is sufficient to style the entire page without a literal hex anywhere in the component or feature code.
- The `ANB-1306 AC5` locked-state behavior is expressible on `RadioGroup`'s observable API.
- The `--info-bg` / `--info-fg` tier added to colors.md is exactly the metadata-chip tint — confirmed useful.

## What the sandbox does NOT prove

- Visual fidelity scoring. Side-by-side with the Figma or live product would need Figma dev mode + real tokens.
- Interaction fidelity. Dropdown open state, hover / focus / active states, keyboard navigation — all inferences.
- Rule enforcement in behavior. Validation, uniqueness, Save update scope — none exercised.
- Create and Duplicate flows. Not implemented.

## Priority snippet-request list, carried forward

From `pack/components/README.md`:

1. Button state treatments (hover / focus / active / disabled / loading).
2. Dropdown open-state visual (and status-colored items).
3. RadioGroup `locked` prop shape.
4. StickyActionBar vs. PageHeader boundary.
5. TextInputNumeric — one prop on TextInput or a separate component?

All five remain unresolved in this prototype. Each one that gets answered by a Peasy snippet collapses one or more deviations above.

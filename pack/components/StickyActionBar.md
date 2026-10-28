---
name: StickyActionBar
source: figma-png + inference
peasy_mapping: possibly NOT a dedicated component. ANB-1305 AC1 requires a Save action at both the top and bottom of the page — Peasy may ship a `StickyActionBar` for this, or they may just render two `Button` instances at fixed positions. Snippet or Figma dev mode settles it.
---

# StickyActionBar

A container for primary page actions, with the characteristic that it appears twice on long pages — once at the top of the editable region and once at the bottom, both performing the same operation. On the ANB-1293 Specifications page it holds the `Bewaar de eigenschappen` (Save) button.

## Honest caveat

This may not be a component at all. Two realistic shapes:

1. **It is a component.** `<StickyActionBar>` takes action buttons as children, handles the sticky positioning, and shows up at top and bottom via composition (two instances) or props (`position="top" | "bottom"`).
2. **It is a layout pattern.** Not a component — just two `<Button>` instances placed by the page template, probably via a shared `<PageActions>` region at both ends of the edit card.

The Figma PNGs don't make the distinction visible. If a snippet confirms option 2, this file folds into `pack/patterns/` as a page pattern, not a component.

## Peasy mapping (if the component exists)

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<StickyActionBar position="top">…</StickyActionBar>` | `<StickyActionBar />` or `<PageActions />` or just manual composition |

## Observable API (reconstruction, if it exists)

```ts
type StickyActionBarProps = {
  position?: 'top' | 'bottom' | 'both';   // "both" is the ANB-1293 case
  children: ReactNode;                     // typically one or more Button components
  sticky?: boolean;                        // whether the bar sticks on scroll
  align?: 'start' | 'end' | 'spread';      // Figma shows end-aligned (right)
};
```

The `sticky` prop is a direct question — is the top instance sticky to the viewport as the user scrolls, or does it scroll with the page? The Figma PNGs are static, so this is unobserved. Peasy's live admin would answer it in one click.

## Visual treatment

### Position

- Top: inside the edit card, upper-right. Observed in all three Figma PNGs.
- Bottom: inside the edit card, lower-right. **Spec'd** by `ANB-1305 AC1` but not visible in the Figma PNG crops (fields extend below the visible fold).

Both instances render the same Save button, right-aligned.

### Behavior

- Both top and bottom perform identical operations. `[ANB-1305 AC1]`
- Not visible: whether the top is sticky-to-viewport on scroll.

## Tokens used

Depends on resolution of the "component vs. pattern" question. If it's a component with a container, likely:

| Property | Token |
| --- | --- |
| Background (if present) | `--surface-raised` or `--surface-page` |
| Border (if present) | `--border-subtle` |
| Internal padding | `--space-4` to `--space-6` |
| Alignment | `end` (right) |

If it's not a component (just two button placements), there are no container tokens — the buttons simply reuse `pack/components/Button.md` tokens.

## Behavior rules

- Save at both top and bottom. `[ANB-1305 AC1]`
- Both perform the same operation. `[ANB-1305]`
- Hidden during Create and Duplicate flows — the primary action switches to `Product aanmaken` / `Product dupliceren` instead. `[ANB-1303 AC2, ANB-1347 AC2]`

## Usage rules

- Only on long edit pages where scrolling is likely.
- Short edit forms (no scroll) use a single bottom action; no top instance.
- Not for navigational actions ("Back", "Next step") — those belong to a stepper, not an action bar.

## Open questions

- Is it a component or a page pattern? Priority: medium — determines whether this file stays or moves to `pack/patterns/`.
- Is the top instance sticky to the viewport during scroll?
- Does the component accept secondary actions alongside the primary (e.g., "Save and continue")?
- How does the bar behave on narrower viewports (admin is likely desktop-only, but confirm)?

## Evidence

| Observation | Source |
| --- | --- |
| `Bewaar de eigenschappen` at top-right of edit card | `figma/ANB-1293-Electricity-Specificaties.png`, `figma/ANB-1293-Electricity-Manage-Specifications.png` |
| Save at both ends of page (rule, not visually confirmed at the bottom) | `pack/rules/anb-1293.md` → `ANB-1305 AC1` |
| Hidden during Create/Duplicate | `pack/rules/anb-1293.md` → `ANB-1303 AC2`, `ANB-1347 AC2` |

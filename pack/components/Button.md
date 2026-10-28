---
name: Button
source: figma-png + live-site
peasy_mapping: likely imports as `import { Button } from '~/ui/Button'` or similar; verify props type via a snippet request.
---

# Button

Peasy ships at least two button families — a **pill primary** used on marketing surfaces (peasy.be) and a **rounded primary** used in the admin (ANB-1293 Figma). They share the indigo brand color and the "solid vs. ghost" variant split; only the border radius differs. The admin dropdown is what ANB-1293 actually uses.

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<Button variant="primary">` | `<Button variant="primary" />` (likely rounded in admin, pill in marketing — may be the same component with a prop) |
| `<Button variant="ghost">` | `<Button variant="ghost" />` or `<Button variant="secondary" />` |
| Icon-left pattern | likely a `leadingIcon` prop or `children` composition |

Confirm during a pasted-snippet request.

## Observable API (reconstruction)

```ts
type ButtonProps = {
  variant: 'primary' | 'ghost';
  size?: 'md' | 'lg';           // "md" inferred from admin; "lg" from marketing hero
  leadingIcon?: ReactNode;      // "+" on "Nieuw product", floppy on Save, duplicate glyph on Dupliceer
  trailingIcon?: ReactNode;     // "→" on marketing CTA cards
  disabled?: boolean;
  loading?: boolean;            // inferred — admin Save likely shows a pending state
  onClick: () => void;
  type?: 'button' | 'submit';
  children: ReactNode;
};
```

Severity of each prop's uncertainty:

- `variant` — high confidence. Two visibly distinct families; the prop is almost certainly named `variant`.
- `size` — medium. The marketing hero button is noticeably larger than the admin buttons; a size prop is a reasonable inference but could be composition instead.
- `leadingIcon` / `trailingIcon` — medium. Could be icon-slot props, or just `children` composition.
- `loading` — inference. Not observed; included because every production button component tends to need one.

## Variants

### Primary — admin (rounded)

Observed in all three ANB-1293 Figma PNGs.

- Background: `--indigo` (`#394295`-ish; see `pack/tokens/colors.md`).
- Text: white.
- Border radius: ~`6-8px`. Clearly not a full pill.
- Padding: ~`12px 20px` vertical × horizontal.
- Icon on the left, ~`8px` gap to text.
- Examples: "+ Nieuw product", "Bewaar de eigenschappen" (Save), "Product aanmaken".

### Primary — marketing (pill)

Observed on peasy.be: "Bespaar nu" in the header, "Check hoeveel jij kan besparen" in the hero.

- Same indigo, same white text.
- Border radius: fully pill (`border-radius: 999px`).
- Padding: ~`14-20px` vertical × `24-32px` horizontal depending on size.
- No icon on marketing CTAs.

### Ghost

Observed in ANB-1293 Figma: the "Dupliceer product" button next to the Nieuw product action; the "Annuleren" button on the Create view.

- Background: white.
- Text: `--indigo`.
- Border: `1px solid --indigo` (visible on Figma zoom; may be a lighter indigo in dark/hover states — unconfirmed).
- Same radius and padding as the matching primary variant.
- Icon treatment same as primary.

### Trailing-icon CTA (marketing cards)

Observed on peasy.be comparison cards ("Hypothecaire lening →").

- Background: white, light grey border.
- Icon on the right (`→`).
- Appears to be a card tap target rather than a Button in the ANB-1293 sense. Likely a different component (`LinkCard` or similar). Noted for later harvest; not in the ANB-1293 minimum set.

## States

| State | Treatment |
| --- | --- |
| Default | As above per variant. |
| Hover | Not observed in static PNGs. **Inference**: slight darkening on indigo bg, slight tint on ghost bg. Confirm by live-site inspection in a future turn. |
| Active (pressed) | Not observed. Inference. |
| Focus | Not observed. Inference: visible outline for accessibility. |
| Disabled | Not observed. Inference: reduced opacity (`~0.5`) and `cursor: not-allowed`. |
| Loading | Not observed. Inference: spinner replaces leading icon, text remains. |

Hover / active / focus / disabled / loading states are a top candidate for a pasted-snippet request to Peasy's team — all five are production essentials and all five are inferred.

## Tokens used

| Property | Token | Source |
| --- | --- | --- |
| Background (primary) | `--indigo` | `pack/tokens/colors.md` |
| Text (primary) | `--surface-base` (white) | implicit |
| Background (ghost) | `--surface-base` | implicit |
| Text (ghost) | `--indigo` | `pack/tokens/colors.md` |
| Border (ghost) | `--indigo` | observation |
| Border radius (admin) | `--radius-md` (~6-8px) | **inference**; `pack/tokens/` has no radii file yet |
| Border radius (marketing) | `--radius-pill` (999px) | **inference** |
| Padding | `--space-3`, `--space-5` (~12px, 20px) | **inference**; `pack/tokens/` has no spacing file yet |

Four of these tokens don't exist in the pack yet. Phase 1 next-step: write `pack/tokens/radii.md` and `pack/tokens/spacing.md` from Figma observation.

## Usage rules

- Primary admin for the main action in a context. "Save," "Create," "Submit."
- Ghost admin for the escape or secondary action. "Cancel," alternate paths, less-emphasized actions that still deserve a button over a link.
- Icon-left in admin; icon-free in marketing. Never both.
- One primary button per decision block. Multiple primaries in one row = design review.
- Marketing pill is only on consumer surfaces (peasy.be). Admin uses rounded. Mixing them reads wrong.

## Open questions

- Hover, focus, active, disabled, loading state treatments.
- Is "pill vs. rounded" one component with a prop, or two components? A snippet answers it.
- Is there a destructive variant (red) for delete? Not observed; probably exists.
- Is there a text-only link variant? The "Annuleren" button is ghost, not text; but admin surfaces often have both.
- Size scale (how many sizes exist, their exact dimensions).

## Evidence

| Observation | Source |
| --- | --- |
| Indigo primary with icon-left | `figma/ANB-1293-Electricity-Specificaties.png` (Nieuw product, Bewaar de eigenschappen) |
| Ghost with indigo border | `figma/ANB-1293-Electricity-Specificaties.png` (Dupliceer product at top) |
| "Annuleren" ghost | `figma/ANB-1293-Electricity-New-Product.png` |
| "Product aanmaken" primary | `figma/ANB-1293-Electricity-New-Product.png` |
| Pill primary on marketing | peasy.be homepage: "Bespaar nu", "Check hoeveel jij kan besparen" |
| Rounded card CTA with trailing arrow | peasy.be homepage: comparison cards |

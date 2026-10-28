---
name: Badge
source: figma-png
peasy_mapping: likely imports as `import { Badge } from '~/ui/Badge'` or `~/ui/StatusBadge`; verify props via snippet. Possibly a dedicated `StatusBadge` since the one observed treatment is tied to a status enum.
---

# Badge

A small pill with a leading dot and a short label, used to communicate state inline next to a title. In ANB-1293 it marks the product's `Status` field next to the product name on the Specifications page.

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<Badge tone="success" label="Actief" />` | `<Badge tone="success">Actief</Badge>` or `<StatusBadge status="actief" />` — depends on whether the component takes an enum or a tone |

Two plausible shapes:

1. **Generic Badge** — takes `tone` or `variant` and arbitrary `label`.
2. **StatusBadge** — takes a Peasy-domain `status` enum and renders the correct label + color internally.

Shape 2 is more opinionated and fits Peasy's domain-driven admin, but shape 1 is more common in design systems. A snippet settles it.

## Observable API (reconstruction)

```ts
type BadgeProps = {
  tone: 'success' | 'neutral' | 'warning' | 'danger';
  // "success" and "neutral" observed; "warning" and "danger" inferred (every production badge has them).
  label: string;
  dot?: boolean;        // observed: true for status; may be opt-in or always-on
  size?: 'sm' | 'md';   // inference — only one size observed
};
```

Severity:

- `tone` with the four values: high confidence that `success` and `neutral` exist; `warning` and `danger` are inferences for completeness.
- `dot`: high confidence that the dot is part of the design; low confidence on whether it's a prop or always rendered.
- `size`: inference.

## Variants observed

### `tone="success"` — Actief

Observed on the Specifications edit view.

- Background: light green tint, approximate `#DAF4E6` (reconstructed from PNG; not pulled from an exact token source).
- Text: medium green, approximate `#1F8A4A`.
- Leading dot: same medium green, ~`6-8px` diameter.
- Pill shape: fully rounded (`border-radius: 999px`).
- Padding: ~`4px 10px` vertical × horizontal.
- Font size: smaller than body (~`13-14px`).

### `tone="neutral"` — Niet actief

Not observed in the three PNGs (the sample product in Figma is Actief), but `ANB-1306 AC2` specifies "light grey" for Niet actief.

- Background: light grey tint, approximate `--lavender` (`#D7D9EA`) or lighter.
- Text: medium grey (unobserved).
- Leading dot: medium grey (unobserved).

Spot for a snippet or Figma dev mode: the exact Niet actief colors.

### `tone="warning"` / `tone="danger"`

Not observed. Inference — the component likely supports them. Not needed for the ANB-1293 benchmark; harvest later when a feature requires them.

## Tokens used

| Property | Token | Source |
| --- | --- | --- |
| Background (success) | `--success-bg` (`~#DAF4E6`) | **inference**; `pack/tokens/colors.md` does not have semantic status tokens yet |
| Text (success) | `--success-fg` (`~#1F8A4A`) | **inference** |
| Dot (success) | `--success-fg` | **inference** |
| Background (neutral) | `--neutral-bg` | **inference** |
| Border radius | `--radius-pill` (`999px`) | **inference** |
| Padding | `--space-1`, `--space-3` (~4px, 10px) | **inference** |

Six of these tokens don't exist in the pack. The `pack/tokens/colors.md` file needs a status/semantic tier added — currently it only has the brand palette.

## Where it's used

- Next to the product name on the Specifications edit view (`ANB-1306 AC1`).
- Inside the product dropdown items (`ANB-1306 AC3`) — same color system, likely a smaller size and no label (just the dot). This is unobserved and may actually be a different component.

## Usage rules

- Status, state, or category only. Not for interactive counts (that's `Badge` with a different count variant, or `Chip`).
- Always with a leading dot in the admin treatment. Marketing surfaces may differ.
- Short labels — one or two words. The admin uses "Actief" and "Niet actief"; nothing longer observed.
- One Badge per subject. Stacking multiple Status badges next to one entity is a design review.

## Open questions

- Exact color values for both tones. Hex-picking from the PNG is approximate; the real tokens live in Figma dev mode.
- Is the dot a prop or always rendered?
- Is this one component (`Badge` with `tone`) or two (`StatusBadge` with `status` enum)?
- The dropdown-item variant — same component or different?

## Evidence

| Observation | Source |
| --- | --- |
| Light-green pill with dot + "Actief" | `figma/ANB-1293-Electricity-Specificaties.png`, `figma/ANB-1293-Electricity-Manage-Specifications.png` |
| Status colors (green / light grey) specified | `ANB-1306 AC2` in `pack/rules/anb-1293.md` |
| Product dropdown colored by status | `ANB-1306 AC3` in `pack/rules/anb-1293.md` |

---
name: Dropdown
source: figma-png
peasy_mapping: likely imports as `import { Select } from '~/ui/Select'` or `~/ui/Dropdown`; verify props via snippet. The ANB-1293 Figma uses them as form controls, not as nav menus — nav uses a different pattern on peasy.be.
---

# Dropdown

The admin form dropdown used by ANB-1293 for supplier and product selection. Called out as "Dropdown Guidelines" in `ANB-1298 AC5` (the Jira doc links to a Peasy wiki page: https://verzekeringen.atlassian.net/wiki/x/AQCjHw).

**Not** the same as the navigation menu triggers on peasy.be ("Hypothecaire lening ▾") — those are a different component we don't harvest here.

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<Dropdown label="…" value={…} onChange={…} options={…} />` | likely `<Select label="…" />` or `<Dropdown label="…" />` with similar props |

The internal name may be `Select`. Confirm with a snippet.

## Observable API (reconstruction)

```ts
type DropdownProps<T> = {
  label: string;                   // rendered above the control: "Leverancier", "Product"
  value: T | null;
  onChange: (next: T) => void;
  options: Array<{
    value: T;
    label: string;
    status?: 'actief' | 'niet-actief';  // for product dropdown — colors items by status per ANB-1306 AC3
  }>;
  placeholder?: string;
  disabled?: boolean;
  error?: string;                  // not observed on this screen; inferred — forms generally need it
  required?: boolean;              // not observed; inferred
  id?: string;
  name?: string;
};
```

Severity of each prop's uncertainty:

- `label` prop separate from the DOM input: high confidence. The label sits above the control with consistent spacing in all three Figma views.
- `options` with `status` on each: high confidence for product dropdown; the status-colored item is explicit in `ANB-1306 AC3`.
- `error` prop: inference. Not observed on this screen, but every production dropdown needs one.

## Visual treatment

### Closed (default)

Observed in all three ANB-1293 Figma PNGs.

- Container: white background, light grey border (~`1px solid`), ~`8-10px` border radius.
- Height: ~`48-56px`.
- Horizontal padding: ~`16px`.
- Selected value: left-aligned, dark text.
- Trailing chevron glyph on the right side (~`16px` from the right edge).
- Label above the control: dark text, slightly bold, ~`4-8px` gap to the control.
- Full-width within its grid column.

### Open

Not observed in any PNG. **Inference**:

- Panel floats below with same width.
- Options list with hover highlight.
- Status-colored items for product dropdown (green dot for Actief, grey dot for Niet actief per `ANB-1306 AC3`).

Open-state treatment is a priority snippet request.

### Disabled

Not observed. Inference: reduced opacity, no chevron hover affordance.

### Error

Not observed in these PNGs. Inference: red border (destructive-tier color), error message below. Required-field validation copy comes from `pack/terminology/validation.md` (`"Dit veld is verplicht."`).

## Tokens used

| Property | Token | Source |
| --- | --- | --- |
| Background | `--surface-base` (white) | observation |
| Border | `--border-subtle` (light grey, ~`#D7D9EA` family) | observation; `pack/tokens/colors.md` has `--lavender #D7D9EA` which may be this |
| Text | `--ink` (`#000000`) | `pack/tokens/colors.md` |
| Border radius | `--radius-md` (~8px) | **inference**; `pack/tokens/radii.md` doesn't exist yet |
| Horizontal padding | `--space-4` (~16px) | **inference** |
| Height | `--control-h-md` (~48px) | **inference** |

Four of these tokens need `pack/tokens/radii.md`, `pack/tokens/spacing.md`, and a control-height scale — none exist yet. Same gap as Button.

## Behavior rules

- Listed products are scoped to the selected supplier. `[ANB-1298 AC2]`
- Product dropdown items are colored by status: green for `Actief`, light grey for `Niet actief`. `[ANB-1306 AC3]`
- Follows the Peasy Dropdown Guidelines wiki page referenced in `ANB-1298 AC5`.
- Hidden during Create and Duplicate flows. `[ANB-1303 AC2, ANB-1347 AC2]`
- Selecting a product loads all specification fields and metadata. `[ANB-1298 AC3]`

## Interaction

- Keyboard: not observed. Inference: Enter / Space opens; arrows move highlight; Enter selects; Esc closes.
- Click outside: closes the panel. Inference.
- Typeahead: unknown. Supplier and product lists may be short enough to not need it. Depends on real-world supplier count — snippet or product-data question.

## Usage rules

- Use for selecting one value from a known set.
- Not for multi-select (that's a different component — likely `MultiSelect` or a checkbox group).
- Not for free-text entry with suggestions (that's `Combobox` or `Autocomplete`).
- Label above, never inside as placeholder — `ANB-1298 AC1` explicitly specifies the label.

## Open questions

- Exact open-state treatment, including the status-colored item design.
- Keyboard navigation shape.
- Does it support `description` or `helperText` under the label?
- Multi-select variant: does Peasy ship one, and does the admin need it anywhere?
- Component name: `Select` vs. `Dropdown` vs. `Picker` — a snippet settles it.

## Evidence

| Observation | Source |
| --- | --- |
| White bg, grey border, chevron right | `figma/ANB-1293-Electricity-Specificaties.png` (Leverancier, Product) |
| Label above the control, consistent gap | all three PNGs |
| Dropdown hidden during Create flow | `figma/ANB-1293-Electricity-New-Product.png` + `ANB-1303 AC2` |
| Status-colored dropdown items (rule, not visually observed) | `ANB-1306 AC3` |
| Peasy Dropdown Guidelines wiki referenced | `ANB-1298 AC5` → https://verzekeringen.atlassian.net/wiki/x/AQCjHw |

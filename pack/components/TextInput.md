---
name: TextInput
source: figma-png
peasy_mapping: likely imports as `import { TextInput } from '~/ui/TextInput'` or `~/ui/Input`; verify props via snippet.
---

# TextInput

The admin's standard single-line text field. Used for product names, verwerkingslink URLs, and any free-text spec. Shares its container shell with `Dropdown` — same border, radius, height — differing only in trailing affordance (chevron on Dropdown, nothing on TextInput).

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<TextInput label="…" value={…} onChange={…} />` | likely `<TextInput />` or `<Input label="…" />` with similar props |

## Observable API (reconstruction)

```ts
type TextInputProps = {
  label: string;             // "Productnaam NL", "Verwerkingslink NL", etc.
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  helperText?: string;       // small subdued text below the field — "Basic-online (51613)" is observed
  error?: string;            // inference — forms need it
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  maxLength?: number;        // inference
  autoComplete?: string;     // inference
};
```

Severity:

- `label` as a separate prop: high confidence — label-above pattern is consistent across all three Figma views.
- `helperText`: high confidence — observed on `Productnaam NL` and `Productnaam FR` as "Basic-online (51613)".
- `error`: inference — not observed on this screen but required-field validation needs it per `ANB-1303 AC5`.

## Visual treatment

### Default

Observed in all three ANB-1293 Figma PNGs.

- Container: `--surface-base` background, `--border-subtle` border (~`1px`), `--radius-md` corners.
- Height: ~`48px` (matches Dropdown).
- Horizontal padding: `--space-4` (16px).
- Text: `--ink-strong`.
- Label above: `--ink-strong`, slightly bold, `--space-1` or `--space-2` gap to the control.
- Helper text below (when present): `--ink-muted`, smaller font size.
- Full-width within its grid column.

### Focused

Not observed. Inference: `--border-strong` (indigo) replaces the subtle grey border; outer focus ring using indigo at low alpha.

### Disabled

Not observed. Inference: `--ink-muted` text, reduced opacity, no interaction affordance.

### Error

Not observed. Inference: `--danger-fg` border, `--danger-bg` tint possible, `--danger-fg` message below using the `error` prop. Validation message copy from `pack/terminology/validation.md`.

## Tokens used

| Property | Token |
| --- | --- |
| Background | `--surface-base` |
| Border | `--border-subtle` |
| Border radius | `--radius-md` |
| Text | `--ink-strong` |
| Label | `--ink-strong` |
| Helper text | `--ink-muted` |
| Horizontal padding | `--space-4` |
| Label-to-control gap | `--space-1` or `--space-2` |
| Error border | `--danger-fg` (inference) |
| Error message | `--danger-fg` (inference) |

## Behavior rules

- All ANB-1293 text fields are required. `[ANB-1304 AC1, AC4]`
- `Productnaam NL` and `Productnaam FR` are also subject to per-supplier case-insensitive uniqueness. `[ANB-1358 AC1]`
- `Verwerkingslink NL/FR` are URLs; validation beyond required is unspecified.

## Usage rules

- Use for free-text input.
- Not for numeric input — use `TextInputNumeric` instead (visually identical, semantically different).
- Not for structured input (dates, phone, currency) — those get dedicated components when they appear.
- Always labelled; never label-as-placeholder.

## Open questions

- Focused / disabled / error state exact treatments.
- Does the component accept a `type` prop (`email`, `url`, `tel`) or does the admin always rely on type="text" + validation?
- Does `helperText` and `error` share a slot (one at a time) or stack?
- Clear button, prefix / suffix slots — not observed.

## Evidence

| Observation | Source |
| --- | --- |
| White bg, grey border, label above | `figma/ANB-1293-Electricity-Specificaties.png` (Productnaam NL/FR, Verwerkingslink NL/FR) |
| Helper text under field | `figma/ANB-1293-Electricity-Specificaties.png` ("Basic-online (51613)") |
| Empty state in create view | `figma/ANB-1293-Electricity-New-Product.png` |

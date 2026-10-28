---
name: CheckboxGroup
source: figma-png
peasy_mapping: likely imports as `import { CheckboxGroup } from '~/ui/CheckboxGroup'` or `~/ui/Checkbox`; verify via snippet. Same compound-vs-single-component question as RadioGroup.
---

# CheckboxGroup

A horizontal set of checkboxes with a shared label. Used on ANB-1293 for multi-select spec fields: `Klantendienst`, `Situatie`, `Betaalmethoden`, `Regio`.

Structurally parallel to `RadioGroup` — same layout, same group-label pattern — differing only in selection semantics (many vs. one) and in the box shape (square vs. circle).

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<CheckboxGroup label="…" value={…} onChange={…} options={…} />` | `<CheckboxGroup />` or `<Checkbox.Group />` depending on compound convention |

## Observable API (reconstruction)

```ts
type CheckboxGroupProps<T extends string> = {
  label: string;
  value: T[];                 // selected values; empty array when nothing checked
  onChange: (next: T[]) => void;
  options: Array<{ value: T; label: string }>;
  layout?: 'horizontal' | 'vertical';  // observed: horizontal
  disabled?: boolean;
  error?: string;             // inference
  required?: boolean;         // inference
  min?: number;               // inference — some fields may require at least one
  max?: number;               // inference
};
```

Severity: same as `RadioGroup`. The `min` prop is a notable inference — ANB-1304 says fields are mandatory, which for a checkbox group most naturally means "at least one selected."

## Visual treatment

### Default (horizontal)

Observed in all three Figma PNGs.

- Row of checkbox + label pairs.
- Group label above the row.
- Each checkbox: square, ~`16-18px`, `--border-subtle` border, `--surface-base` fill, `--radius-sm` corners.
- Checked: `--indigo` background with white check glyph inside.
- Label-to-checkbox gap: `--space-2`.
- Option-to-option gap: `--space-4` to `--space-5` (16-20px).

### Disabled

Not observed. Inference: `--ink-muted` labels, reduced opacity.

### Error

Not observed. Inference: `--danger-fg` message below the group; the box border likely stays neutral unless a snippet says otherwise.

### Indeterminate

Not applicable to ANB-1293 (no parent-child checkbox hierarchy observed). The component likely supports it elsewhere but it's not needed for this benchmark.

## Tokens used

| Property | Token |
| --- | --- |
| Box border (default) | `--border-subtle` |
| Box fill (default) | `--surface-base` |
| Box fill (checked) | `--indigo` |
| Check glyph | `--surface-base` (white) |
| Box radius | `--radius-sm` |
| Group label | `--ink-strong` |
| Option label | `--ink-strong` |
| Option-to-option gap | `--space-4` to `--space-5` |
| Label-to-box gap | `--space-2` |
| Error message | `--danger-fg` (inference) |

## Behavior rules

- Multi-select from a known set.
- Mandatory per `ANB-1304 AC1` — enforced as "at least one selected" (inference; Jira doesn't specify).
- Required-field validation copy from `pack/terminology/validation.md`.

## Usage rules

- Multi-select choice from a small set (2–6 options).
- For single-select, use `RadioGroup`.
- For yes/no, use `RadioGroup` with "Ja"/"Nee"; don't use a lone checkbox for yes/no — Peasy's admin is consistent about that per the ANB-1293 Figma.
- Horizontal in admin by default; vertical when option labels are long.

## Open questions

- Required semantics — "at least one" or something else?
- Indeterminate state exists but is it used anywhere?
- Max-selection limit — does any field cap the number selected?
- Keyboard navigation shape.

## Evidence

| Observation | Source |
| --- | --- |
| Horizontal checkboxes with group label above | `figma/ANB-1293-Electricity-Specificaties.png` (Klantendienst, Situatie, Betaalmethoden, Regio) |
| Square box with corner radius | all three Figma PNGs |
| Mandatory requirement | `pack/rules/anb-1293.md` → `ANB-1304 AC1` |

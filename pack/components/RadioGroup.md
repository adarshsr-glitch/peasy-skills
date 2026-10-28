---
name: RadioGroup
source: figma-png
peasy_mapping: likely imports as `import { RadioGroup } from '~/ui/RadioGroup'` or `~/ui/Radio`; verify via snippet. The component bundles its radios — no separate `<Radio />` is observed being used standalone.
---

# RadioGroup

A horizontal set of radio buttons with a shared label. Used across most ANB-1293 spec fields: `Status`, `Toon in vergelijking`, `Tarieftype`, `Metertype`, `Commissie`, `Online contract`, `Klantsegment`, `Groene energie`.

The locked state is load-bearing: when `Status = Niet actief`, `Toon in vergelijking` auto-sets to `Nee` and locks per `ANB-1306 AC5`. The component must support this.

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<RadioGroup label="…" value={…} onChange={…} options={…} />` | `<RadioGroup />` or `<Radio.Group />` — depends on compound-vs-single-component convention |

## Observable API (reconstruction)

```ts
type RadioGroupProps<T extends string> = {
  label: string;              // "Status", "Toon in vergelijking", etc.
  value: T | null;
  onChange: (next: T) => void;
  options: Array<{ value: T; label: string }>;
  layout?: 'horizontal' | 'vertical';  // observed: always horizontal in admin
  locked?: boolean;           // locked state per ANB-1306 AC5 — true keeps the current value and disables interaction
  disabled?: boolean;         // same visual as locked but semantically different (whole field unavailable)
  error?: string;             // inference
  required?: boolean;         // inference
};
```

Severity:

- `label` as separate prop: high confidence.
- `options` as array of `{value, label}`: high confidence.
- `layout` prop: inference. All observed uses are horizontal; the prop might not exist.
- `locked` vs `disabled`: inference. The spec needs the behavior (per `ANB-1306 AC5`); whether it's one prop or two is unknown.

## Visual treatment

### Default (horizontal)

Observed in all three Figma PNGs.

- Row of radio button + label pairs, left-to-right.
- Group label (`Status`, etc.) sits above the row, same treatment as other field labels.
- Each radio: circular, ~`16-20px` diameter, `--border-subtle` ring, `--surface-base` fill.
- Selected: inner dot in `--indigo` fills the center of the ring.
- Label-to-radio gap: `--space-2` (8px).
- Option-to-option gap: `--space-4` to `--space-5` (16-20px).
- Row vertical padding: tight — the whole group reads as one line.

### Locked (per ANB-1306 AC5)

Not observed in the PNGs (the sample product is `Actief`, so `Toon in vergelijking` isn't locked). Inference:

- The selected option remains visible with the dot.
- Non-selected options render with `--ink-muted` label and reduced ring opacity.
- Interaction is suppressed (cursor, no hover change).
- No special explanatory tooltip observed; the lock is contextual.

### Disabled

Not observed. Inference: same visual as locked, applied to all options.

### Error

Not observed. Inference: `--danger-fg` message below the group; the radio ring may or may not change color.

## Tokens used

| Property | Token |
| --- | --- |
| Ring (default) | `--border-subtle` |
| Fill | `--surface-base` |
| Inner dot (selected) | `--indigo` |
| Group label | `--ink-strong` |
| Option label | `--ink-strong` |
| Option label (locked) | `--ink-muted` |
| Option-to-option gap | `--space-4` to `--space-5` |
| Label-to-radio gap | `--space-2` |
| Error message | `--danger-fg` (inference) |

## Behavior rules

- `Status` controls `Toon in vergelijking`'s locked state. `[ANB-1306 AC5]`
- Mandatory in all cases. `[ANB-1304 AC1]`
- Required-field validation uses the standard message from `pack/terminology/validation.md`.

## Usage rules

- Mutually exclusive choice from a small set (2–5 options).
- Horizontal layout in admin by default; vertical only if options are too long to fit a row.
- For a boolean yes/no, prefer `RadioGroup` with "Ja"/"Nee" over a toggle switch — Peasy admin uses radios consistently for binary spec choices.
- For multi-select, use `CheckboxGroup`.

## Open questions

- Is `locked` a prop on the group, a prop on an individual option, or an inferred state from context?
- Focus treatment per-option (keyboard navigation).
- Does the group support vertical layout, and what does it look like?
- Variant for icon-plus-label options (not observed in ANB-1293 but common in other admin surfaces).

## Evidence

| Observation | Source |
| --- | --- |
| Horizontal radios with group label above | `figma/ANB-1293-Electricity-Specificaties.png` (Status, Tarieftype, Metertype, Commissie, Online contract, Klantsegment, Groene energie, Toon in vergelijking) |
| Locked state rule | `pack/rules/anb-1293.md` → `ANB-1306 AC5` |
| Mandatory requirement | `pack/rules/anb-1293.md` → `ANB-1304 AC1` |

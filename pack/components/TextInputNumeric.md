---
name: TextInputNumeric
source: figma-png
peasy_mapping: likely NOT a separate component — most Peasy codebases ship a single `TextInput` with a `type="number"` or `inputMode="numeric"` prop. Verify via snippet; if confirmed, consolidate this file.
---

# TextInputNumeric

Visually identical to `TextInput`. Semantically different: accepts numeric input only. Used on `Contractduur` (contract duration in months) and `Indexeringsperiode` per `ANB-1304 AC4`.

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<TextInputNumeric label="…" value={…} onChange={…} />` | **almost certainly** `<TextInput inputMode="numeric" />` or `<TextInput type="number" />` — a prop on the shared `TextInput`. If this guess holds, this file folds into `TextInput.md`. |

If Peasy's codebase genuinely has a distinct `NumberInput` component (step controls, min/max props), this file stays separate.

## Observable API (reconstruction)

```ts
type TextInputNumericProps = Omit<TextInputProps, 'value' | 'onChange'> & {
  value: number | '';
  onChange: (next: number | '') => void;
  min?: number;              // inference
  max?: number;              // inference
  step?: number;             // inference
};
```

The empty-string allowance in the value is deliberate — the Figma `Indexeringsperiode` field shows a placeholder `0`, which could be either the default value or just the placeholder text. Most production number inputs allow an empty string to differentiate "not entered" from "zero."

## Visual treatment

Identical to `TextInput`. Same background, border, radius, padding, label-above pattern.

### Observed placeholders

- `Contractduur (in maanden)`: `24` — likely a placeholder suggesting a common default, not an initial value.
- `Indexeringsperiode`: `0` — same.

## Tokens used

Same as `TextInput`. See that file's token table.

## Behavior rules

- Accepts numeric input only. `[ANB-1304 AC4]`
- Required like all other spec fields. `[ANB-1304 AC1]`
- Validation: no numeric range or step rules observed; the Jira text only says "numeric values only".

## Usage rules

- Use for integers (months, periods, quantities).
- Decimals — not confirmed. Figma shows no explicit decimal UI, but Contractduur as "months" and Indexeringsperiode could be integers only.
- Prevents non-numeric keystrokes at input, not just at validation.

## Open questions

- One component with a prop, or two components? Snippet request priority: medium — this changes the file structure.
- Does it offer spinner controls, or just a filtered text input?
- Decimal / currency / percentage variants — any of them in Peasy's system?

## Evidence

| Observation | Source |
| --- | --- |
| Numeric constraint on Contractduur, Indexeringsperiode | `pack/rules/anb-1293.md` → `ANB-1304 AC4` |
| Visually identical to TextInput | `figma/ANB-1293-Electricity-Specificaties.png`, `figma/ANB-1293-Electricity-New-Product.png` |
| Placeholder values `24` and `0` | `figma/ANB-1293-Electricity-Specificaties.png` |

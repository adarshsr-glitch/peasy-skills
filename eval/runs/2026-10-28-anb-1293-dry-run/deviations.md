# Design skill — refusal report

`peasy-design` did not emit a prototype on this run. Per its SKILL contract: when `pack/components/` is empty the skill refuses and raises the Phase 1 blocker rather than inventing components.

## Why it refused

The pack is in a split state:

| Pack layer | State | Can design skill proceed? |
| --- | --- | --- |
| `pack/rules/anb-1293.md` | Full, cited | ✅ |
| `pack/terminology/` | Full for ANB-1293, cited | ✅ |
| `pack/tokens/` | Preliminary (colors + typography families) | ⚠️ Enough to style, not enough to ship |
| `pack/patterns/anb-1293-states.md` | Full | ✅ |
| `pack/components/` | **Empty** | ❌ Hard refuse |

A prototype must import real Peasy components, not reimplement them. With no component files in the pack, the only alternatives would be (a) handwrite a replica of Peasy's design system from screenshots — invents a component surface, violates the SKILL — or (b) emit skeleton code with every component as `<TODO />` — produces something that cannot be reviewed as fidelity. The skill refuses.

## What's needed to unblock

Component files the pack must have before the ANB-1293 benchmark can be scored. Each file documents one Peasy component: its real import path, its props / API, its variants and states, and the usage rule telling the skill when to pick it.

Minimum set for this benchmark:

- `Dropdown.md` — supplier and product selectors. Must follow the Peasy Dropdown Guidelines referenced in `ANB-1298 AC5`.
- `TextInput.md` — the 15 text fields.
- `TextInputNumeric.md` — `Contractduur` and `Indexeringsperiode`.
- `RadioGroup.md` — `Toon in vergelijking` with a locked state (needed by `ANB-1306 AC5`).
- `CheckboxGroup.md` — `Betaalmethoden`.
- `Button.md` — primary (`Product aanmaken`, `Product dupliceren`) + ghost (`Annuleren`) + Save variants.
- `Badge.md` — Status pill in green / light grey (needed by `ANB-1306 AC2`).
- `StickyActionBar.md` — top + bottom Save actions per `ANB-1305 AC1`.
- `PageHeader.md` — section title under supplier selector (needed by `ANB-1303 AC2`, `ANB-1347 AC2`).

Each file must be sourced from Peasy's frontend repo — the real component, not a reconstruction. See `../../../BLOCKERS.md`.

## What tokens still need reconciliation

Even with components in hand, the current `pack/tokens/` files are preliminary and would not pass visual-fidelity scoring (threshold ≥ 85 in `eval/rubric.md`). What needs the frontend repo:

- Spacing scale (none in the pack yet).
- Radii scale (none in the pack yet).
- Shadow / elevation set (none in the pack yet).
- Type scale (sizes, weights, line heights).
- Semantic token layer, if one exists (`--color-text`, `--color-surface`, etc.) above the palette.

## What would be in the deviations log on a real run

For completeness, this is the shape of the log the design skill would emit if it had enough pack to run. The columns stay the same whether the log has three entries or thirty.

| Deviation | Pack entry needed | Workaround used | Severity |
| --- | --- | --- | --- |
| (example) `Badge` not in pack | `pack/components/Badge.md` | Rendered a `<span>` with Status token colors; no interactive affordance | High |
| (example) No `Illustration` component | `pack/components/Illustration.md` | Omitted the empty-state illustration | Low |

An empty log would mean the pack covered every component the pipeline reached for — the signal that the pack is "complete enough" for the current benchmark.

## Status

- Skill: `peasy-design`
- Outcome: `refused`
- Reason: `pack/components/ empty`
- Downstream: the ANB-1293 benchmark cannot be scored on visual, functional, or component-reuse dimensions until components land.
- Not blocking: the `peasy-requirements` output in `spec.md` is independent and complete.

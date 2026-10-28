---
name: Spacing
source: figma-png + inference
---

# Spacing scale

Peasy's admin reads as a `4px` base scale with `8px` as the dominant unit. The scale below is a best-fit reconstruction of the gaps visible in the three ANB-1293 Figma PNGs. Figma dev mode would confirm it directly.

## Scale

| Token | Value | Where observed |
| --- | --- | --- |
| `--space-0` | `0` | — |
| `--space-1` | `4px` | Badge dot-to-text gap; small inner padding |
| `--space-2` | `8px` | Button icon-to-text gap; radio-to-label gap |
| `--space-3` | `12px` | Button vertical padding; label-to-control gap |
| `--space-4` | `16px` | Dropdown horizontal padding; radio group gap |
| `--space-5` | `20px` | Button horizontal padding |
| `--space-6` | `24px` | Field-row vertical rhythm; card inner padding |
| `--space-8` | `32px` | Section vertical padding; sidebar-to-content gap |
| `--space-10` | `40px` | Column-to-column gap in the two-column field grid |
| `--space-12` | `48px` | Section-to-section vertical gap |

Non-sequential numbers (`7`, `9`, `11`) are intentionally skipped — Peasy's admin doesn't seem to use them. Add if observed later.

## Mapping to components

| Use | Token |
| --- | --- |
| Button horizontal padding | `--space-5` (20px) |
| Button vertical padding | `--space-3` (12px) |
| Button icon-to-text gap | `--space-2` (8px) |
| Dropdown horizontal padding | `--space-4` (16px) |
| Dropdown label-to-control gap | `--space-1` or `--space-2` (4–8px) |
| Badge horizontal padding | `--space-3` (10–12px — reconstructed as `--space-3`) |
| Badge vertical padding | `--space-1` (~4px) |
| Badge dot-to-text gap | `--space-1` (4px) |
| Specifications page field-row rhythm | `--space-6` (24px) |
| Two-column field grid gap | `--space-10` (40px) |
| Edit card inner padding | `--space-6` or `--space-8` (24–32px) |

## Rules

- Prefer the T-shirt scale over literal px values anywhere in generated code.
- Round observed values to the nearest scale step. "~22px" becomes `--space-5` (20px), not an off-scale value.
- Horizontal and vertical spacing come from the same scale.

## Open

- Base unit — 4px assumed. Could be 8-based with intermediates (`--space-1 = 2px`, `--space-2 = 4px`, …). Unlikely but possible.
- Semantic aliases (`--pad-input`, `--gap-form-row`) alongside T-shirt — unknown.
- Negative spacing (margin pulls) — not observed; probably doesn't exist as a token.

---
name: Radii
source: figma-png + inference
---

# Border radii

Four distinct radius families are visible across the ANB-1293 Figma PNGs and peasy.be: a small chip radius, a medium form-control radius, a large card radius, and a full pill. The exact values are inferred — Figma dev mode or a snippet settles them.

## Scale

| Token | Value | Where observed |
| --- | --- | --- |
| `--radius-sm` | `4px` | Metadata chip (`Product ID: 683 | Supplier ID: 5`) — inferred |
| `--radius-md` | `8px` | Admin buttons, inputs, dropdowns — observed |
| `--radius-lg` | `16px` | Large card wrapping the product edit area — observed |
| `--radius-pill` | `999px` | Status badge, marketing CTAs, tab pills — observed |

## Mapping to components

| Use | Token |
| --- | --- |
| Primary / ghost button (admin) | `--radius-md` |
| Primary button (marketing hero) | `--radius-pill` |
| Dropdown closed state | `--radius-md` |
| TextInput | `--radius-md` |
| Status badge | `--radius-pill` |
| Metadata chip | `--radius-sm` |
| Product edit card | `--radius-lg` |
| Tab pills (`Specificaties`, etc.) | `--radius-pill` |

## Open

- Exact values. `8px` is a best fit for `--radius-md` but could be `6px` or `10px` depending on the real token. Hex-picking from PNGs is approximate.
- Semantic alias tokens (`--radius-input`, `--radius-card`) alongside the T-shirt scale — not confirmed; the scale above assumes T-shirt only.
- Whether marketing and admin share a single `Button` component with a radius prop or variant, or two components with different fixed radii. See `pack/components/Button.md` open questions.

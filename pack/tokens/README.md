# pack/tokens/

Design tokens — colors, typography, spacing, radii, shadows — that every generated prototype draws from.

| File | Status |
| --- | --- |
| `colors.md` | Preliminary (brand-kit + browser extraction). Reconcile with frontend. |
| `typography.md` | Preliminary (families only). Reconcile with frontend. |
| `spacing.md` | Not written. Needs frontend. |
| `radii.md` | Not written. Needs frontend. |
| `shadows.md` | Not written. Needs frontend. |

## Discipline

- Everything here is traceable to a source: Peasy's token file in the frontend, a Figma node id, or the live product.
- No invented values. If a token is unknown, leave it out and raise a Phase 1 blocker.
- When the frontend repo lands, the preliminary files above get **replaced**, not patched — their only purpose is to let the pipeline run thinly before full harvest.

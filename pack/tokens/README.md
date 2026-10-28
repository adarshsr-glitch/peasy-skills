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

- Every token file carries a `source:` line from the trust tiers in `../sources.md`.
- No invented values. If a token's value cannot be observed, leave it out — do not guess a reasonable number.
- When a pasted snippet arrives (ground-truth tier), the lower-tier file is **replaced**, not patched. The pack prefers one strong value to several weak ones.

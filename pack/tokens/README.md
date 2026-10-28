# pack/tokens/

Design tokens — colors, typography, spacing, radii, shadows — that every generated prototype draws from.

| File | Status |
| --- | --- |
| `colors.md` | Full — three tiers (palette, semantic status, semantic structural). Several values flagged `**inferred**` pending Figma dev mode. |
| `typography.md` | Preliminary (families only). Scale and weights deferred to Figma dev mode. |
| `spacing.md` | Full — 10-step T-shirt scale, 4px base, with per-component mapping. Base unit assumed. |
| `radii.md` | Full — four-step scale (sm / md / lg / pill), with per-component mapping. Exact values approximate. |
| `shadows.md` | Not written. Admin screens show little elevation; add when observed. |

## Discipline

- Every token file carries a `source:` line from the trust tiers in `../sources.md`.
- No invented values. If a token's value cannot be observed, leave it out — do not guess a reasonable number.
- When a pasted snippet arrives (ground-truth tier), the lower-tier file is **replaced**, not patched. The pack prefers one strong value to several weak ones.

# Typography

> **Preliminary.** Font families below are confirmed from the live site; sizes, weights, and the type scale are not yet imported. Replace with the real values from the frontend repo.

## Families

| Role | Family | Fallback stack (temporary) |
| --- | --- | --- |
| Display / headings | `Grold` | `"Grold", "Manrope", system-ui, sans-serif` |
| Body | `gfflt` | `"gfflt", "Manrope", system-ui, sans-serif` |

Both `Grold` and `gfflt` are proprietary — not on Google Fonts. The design skill must point at Peasy's font declarations in the frontend repo (woff2 served from a known path, or a loader module). Until then, prototypes use the fallback stack and read as roughly-Peasy, not pixel-Peasy.

## Scale

Not yet established. The design skill should use whatever scale lives in the frontend's `typography` tokens — do not invent one here.

## Open questions

- Where are the font files served from? Hosted (self), Google Fonts proxy, CDN?
- Is there a `font-weight` convention (Grold at 500 for headings, 400 for subhead, etc.)?
- Letter-spacing on uppercase labels — the live site shows a slight tracking on eyebrows; needs confirming from source.

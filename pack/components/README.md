# pack/components/

One file per Peasy component. Each file is a **reconstruction** of the component's observable API — not an import of Peasy's real code (Peasy keeps that internal; see `../sources.md`).

Each file documents:

- `source:` line (snippet / figma-dev / figma-png / live-site / brand-kit / inference)
- Probable name in Peasy's codebase
- Observable props / API surface
- Variants and states
- Usage rules (when to pick this component vs. a cousin)
- Visual treatment: tokens used, spacing, states
- Accessibility expectations
- Open questions — things we can't resolve without a snippet from Peasy

Prototypes built by `peasy-design` import from these reconstructed files via a placeholder path like `@peasy-pack/components`. Each use carries a `// Peasy mapping:` trace comment naming the probable real component, so Peasy devs porting the prototype know exactly what to swap in.

## Status

**Currently empty.** Next step: first harvest from the three Figma PNGs on disk (`../../../ANB-1293 Energy - New Engine Admin- Electricity Product Specifications/figma/`) plus live-site inspection of peasy.be in the browser pane.

Minimum set the ANB-1293 benchmark needs:

| Component | Primary source | Priority |
| --- | --- | --- |
| `Dropdown.md` | Figma PNG + live-site inspection (supplier picker on peasy.be comparison flows is analogous) | High — supplier + product selectors |
| `TextInput.md` | Figma PNG | High — 15 text fields |
| `TextInputNumeric.md` | Figma PNG | High — `Contractduur`, `Indexeringsperiode` |
| `RadioGroup.md` | Figma PNG — must include locked state per `ANB-1306 AC5` | High |
| `CheckboxGroup.md` | Figma PNG | Medium — `Betaalmethoden` |
| `Button.md` | Figma PNG + live-site (primary / ghost variants are visible on peasy.be) | High |
| `Badge.md` | Figma PNG — green / grey Status pill | High |
| `StickyActionBar.md` | Figma PNG — top + bottom Save, `ANB-1305 AC1` | Medium |
| `PageHeader.md` | Figma PNG — section title under supplier selector | Medium |

High-priority first. A snippet request to Peasy's team (via the channel named in `../../BLOCKERS.md`) is warranted for anything that stays `source: inference` after Figma + live-site harvest.

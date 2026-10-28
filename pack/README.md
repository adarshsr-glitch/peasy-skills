# pack/

The shared knowledge base every skill reads from. The skills are stateless; the pack is the project's memory.

Peasy's frontend code is not shared with KeyValue. The pack is reconstructed from what we can observe — Figma, live site, pasted snippets. See `sources.md` for the trust tiers.

## Subfolders

| Folder | What belongs here | Status |
| --- | --- | --- |
| `tokens/` | Design tokens — colors, typography, spacing, radii, shadows. Each file carries a `source:` line. | Partial (preliminary colors + typography families). Spacing, radii, shadows not yet observed. |
| `components/` | One file per Peasy component (`Button.md`, `Dropdown.md`, …) with observable API, variants, usage rules. Reconstruction, not import. | Empty. First harvest from Figma PNGs + live site is next. |
| `rules/` | One file per ANB epic. Every claim cites its ticket id. | `anb-1293.md` landed. |
| `terminology/` | NL + FR glossary. Every label the UI shows is listed here. | Full for ANB-1293 fields and validation. |
| `patterns/` | Page layouts, forms, loading / empty / error / success state treatments. | `anb-1293-states.md` landed. |
| `examples/` | Known-good outputs the skills pattern-match on. | Empty — fills after first scored benchmark passes. |

See `CHANGELOG.md` for every pack change that affects skill output, and `sources.md` for the sourcing hierarchy.

## Discipline

- Every pack file names its `source:` from the trust tiers in `sources.md`. No ungrounded content.
- Rules are read from Jira and written here with the ticket id on every claim.
- Terminology lands in both NL and FR; both forms are canonical.
- Pack files are reconstructions, honest about it. When a pasted snippet arrives from Peasy, the lower-tier reconstruction is **replaced**, not patched.
- A pack file that cannot be traced to a source is a bug — delete it rather than carry it.

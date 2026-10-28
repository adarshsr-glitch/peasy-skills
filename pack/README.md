# pack/

The shared knowledge base every skill reads from. The skills are stateless; the pack is the project's memory.

## Subfolders

| Folder | What belongs here | Status |
| --- | --- | --- |
| `tokens/` | Design tokens imported directly from Peasy's frontend (`colors`, `spacing`, `typography`, `radii`, `shadows`). | Empty — blocked on frontend repo clone. |
| `components/` | One file per Peasy component (`Button.md`, `Dropdown.md`, …) covering API, variants, usage rules, accessibility. | Empty — blocked on frontend repo clone. |
| `rules/` | One file per ANB epic. Every claim cites its ticket id. | `anb-1293.md` landed; others follow as new features are picked up. |
| `terminology/` | NL + FR glossary. Every label the UI shows is listed here with its translation. | Empty — populated during Phase 1 from Peasy's product. |
| `patterns/` | Page layouts, forms, loading / empty / error / success state treatments. | Empty — blocked on frontend repo clone. |
| `examples/` | Good outputs — enriched briefs, Jira specs, prototype branches — the skills pattern-match on. | Empty — populated as benchmarks pass. |

See `CHANGELOG.md` for every pack change the skills need to know about.

## Discipline

- Tokens and components are **imported, not copied** wherever a package boundary allows. The pack points at Peasy's real source.
- Rules are read from Jira and written here with the ticket id on every claim.
- Terminology lands in both NL and FR; both forms are canonical.
- Any file here that cannot be traced to a source (ticket, frontend code, product screenshot) is a bug.

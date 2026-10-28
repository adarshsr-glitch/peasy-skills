# Pack changelog

Every change to the pack that affects skill output lands here, newest first. The skills read this to know what's new; downstream consumers read it to know what shifted.

## Format

```
## YYYY-MM-DD — short title
- Change 1 (what / where / why)
- Change 2
```

## 2026-10-28 — Phase 1 preliminary harvest

- `tokens/colors.md` added: Peasy palette (indigo, cyan, pink, lavender, cream, ink) extracted from live site via browser. Marked preliminary — reconcile with frontend repo.
- `tokens/typography.md` added: Grold + gfflt families only. Scale, weights, letter-spacing deferred to frontend.
- `terminology/nl-fields.md` added: 17 Dutch field keys, dropdown labels, section titles, actions, status values, metadata, all citing ANB-1293 tickets.
- `terminology/validation.md` added: NL / FR / EN validation copy for empty-field and duplicate-name cases.
- `patterns/anb-1293-states.md` added: progressive-disclosure state matrix for admin "owner → entity → controls" surfaces.
- `components/` README expanded with the minimum set the ANB-1293 benchmark needs. Folder still empty — blocks on frontend repo.
- `examples/` README added, shape documented. No examples yet; populated after first scored benchmark.

## 2026-10-28 — initial pack

- `rules/anb-1293.md` added: Electricity Product Specifications epic, 9 stories, all load-bearing rules cited by ticket.
- `tokens/`, `components/`, `patterns/`, `terminology/`, `examples/` scaffolded but empty — awaiting Peasy frontend repo clone for Phase 1 harvest.

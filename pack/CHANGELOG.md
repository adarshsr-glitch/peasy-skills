# Pack changelog

Every change to the pack that affects skill output lands here, newest first. The skills read this to know what's new; downstream consumers read it to know what shifted.

## Format

```
## YYYY-MM-DD — short title
- Change 1 (what / where / why)
- Change 2
```

## 2026-10-28 — Token layer growth: radii, spacing, semantic colors

- `tokens/radii.md` added: four-step scale (sm 4 / md 8 / lg 16 / pill 999) with per-component mapping.
- `tokens/spacing.md` added: 10-step T-shirt scale on a 4px base, with per-component mapping. Non-sequential steps (7, 9, 11) intentionally skipped — not observed.
- `tokens/colors.md` extended with two new tiers:
  - **Semantic — status**: `--success-*`, `--neutral-*`, `--info-*`, `--danger-*`, (`--warning-*` placeholder). Approximate hex values; several flagged inferred.
  - **Semantic — structural**: `--surface-base`, `--surface-page`, `--surface-raised`, `--border-subtle`, `--border-strong`, `--ink-strong`, `--ink-muted`.
  - Per-component token mapping table added at the bottom.
- `tokens/README.md` updated to reflect the new coverage: colors full, spacing + radii full (with caveats), typography still preliminary, shadows not written.
- Three component files (Button, Dropdown, Badge) still carry `**inference**` markers on tokens that these new files now define. Reconciliation is a separate pass — the next harvest run will pick up the real token names.

## 2026-10-28 — First component harvest (Button, Dropdown, Badge)

- `components/Button.md`: source `figma-png + live-site`. Two button families observed — pill primary on marketing, rounded primary in admin — plus ghost. Full observable API, variants, tokens, open questions.
- `components/Dropdown.md`: source `figma-png`. Admin form dropdown with chevron, label-above, status-colored items per ANB-1306 AC3. Open-state treatment is a priority snippet request.
- `components/Badge.md`: source `figma-png`. Status pill with leading dot: Actief (green) observed, Niet actief (grey) specified by ticket but not visually observed. Six semantic status tokens need `pack/tokens/colors.md` to grow a status tier.
- Surfaced a pattern across all three: `pack/tokens/radii.md` and `pack/tokens/spacing.md` don't exist yet, and `colors.md` has no semantic status tokens. That's the next pack gap.

## 2026-10-28 — Observational pivot

- Confirmed Peasy keeps its frontend code internal; no repo access now or later.
- Pack is explicitly a reconstruction, not a mirror. Added `sources.md` with the six-tier trust ladder (snippet → figma-dev → figma-png → live-site → brand-kit → inference).
- Every pack file will carry a `source:` line.
- `peasy-design` SKILL rewritten: prototypes build in `sandbox/`, import from the pack's reconstructed components, carry `// Peasy mapping:` trace comments.
- Rubric dimension 4 changed from "Component reuse" to "Pattern fidelity" — portability to Peasy's internal stack is what we score.
- `pack/components/README.md` reshaped around observational sourcing with priority order for the 9-component ANB-1293 minimum set.

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

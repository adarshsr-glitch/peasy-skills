# Dry-run findings — 2026-10-28, ANB-1293

What the run told us about the pack, the skills, and what to do next. This file is the actual output of the dry-run; the brief, enriched, spec, and deviations files are intermediate artifacts.

## Headline

**Two of three skills ran clean on a thin pack. The third refused for the right reason.** The pipeline's discipline held — zero invented rules, zero invented components, zero fabricated copy. Half the pipeline's value is deliverable today; the other half is gated on `pack/components/` and token reconciliation, which Phase 1 proper will fix.

## Skill-by-skill

### `peasy-brainstorm` → `enriched.md`

Ran clean. Stamp distribution on the fillable fields:

| Stamp | Count | Fields |
| --- | --- | --- |
| `confident` | 5 | problem, user, vertical, surfaces, Jira epic |
| `inferred` | 2 | change-shape, success-signal |
| `open` | 4 | feel-like-Peasy scope, legacy URL, analytics, keyboard |

Observations:

- Confidence was high because the pack already had `rules/anb-1293.md`. The brainstorm skill correctly resolved most of the "what Jira says" questions by reading the pack rather than marking them `open`.
- The remaining opens are **genuinely out of Jira's scope** — intent questions the ANB tickets don't resolve. That's the right place for human review.
- Zero business rules invented. Every rule the brief implied was traceable to a ticket in the pack.

Confidence shape to track across future runs: the ratio of `open` fields will tell us whether the template is well-tuned. Four opens is tolerable for a brief this vague; if real briefs with better specifics are still producing four opens, that's a template-growth signal.

### `peasy-requirements` → `spec.md`

Ran clean. Produced a Jira-ready document with:

- **9 user stories**, one per ANB child ticket, each cited.
- **~30 acceptance criteria** in Given/When/Then form, each cited by ANB ticket and AC number.
- **22 business rules** in dedicated sections (entity model, field discipline, status, uniqueness, supplier binding, save, create/duplicate shared, multilingual), every one cited.
- **2 validation copy tables** (empty field, duplicate name) lifted verbatim from `pack/terminology/validation.md`.
- **6 edge cases**, 2 of which flagged `[open]` (concurrency, deleted supplier).
- **6 open questions** carried from the brainstorm stage.
- **2 dependencies** named with references.

Zero inventions. Every claim is either cited by ANB id or marked `[open]`. The spec is good enough to paste into Jira **after the 6 opens are resolved**.

Honest limit: without the frontend repo, the spec can't name actual component import paths or token names in the "Technical references" section — those come from the design output, which refused.

### `peasy-design` → `deviations.md`

Refused. **Correct behavior.** The SKILL contract says `pack/components/` empty = hard refuse rather than invent. The refusal report names exactly which 9 components the pack needs for the ANB-1293 benchmark. That list IS the Phase 1 shopping list for the frontend harvest.

## Pack coverage, measured

| Pack layer | Benchmark coverage | Needs frontend repo? |
| --- | --- | --- |
| `pack/rules/` | 100% for ANB-1293 (9/9 stories) | No |
| `pack/terminology/nl-fields.md` | 100% of ANB-1293 NL labels | No for NL. FR translations are gaps. |
| `pack/terminology/validation.md` | 100% of ANB-1293 validation copy | No |
| `pack/patterns/anb-1293-states.md` | 100% of the state matrix | No |
| `pack/tokens/colors.md` | ~70% (palette; status badge colors deferred to Figma) | Reconcile |
| `pack/tokens/typography.md` | ~30% (families only; scale, weights, letter-spacing missing) | Yes |
| `pack/tokens/` (spacing, radii, shadows) | 0% | Yes |
| `pack/components/` | 0% | Yes |
| `pack/examples/` | 0% (fills after first scored benchmark passes) | — |

## What the dry-run proves

- **Rules + terminology + one pattern are enough to carry `peasy-brainstorm` and `peasy-requirements` end-to-end for this benchmark.** The Jira spec in `spec.md` could be reviewed by a BA / FA today.
- **The pipeline's "never invent" discipline is enforceable.** The brainstorm skill marked opens rather than guessing. The requirements skill cited everything or marked `[open]`. The design skill refused rather than fabricating.
- **The refusal path is the signal.** `deviations.md` is a precise, actionable list of what the pack needs next. We no longer need to guess at Phase 1 priorities — the list is in hand.

## What the dry-run didn't test

- **Repeatability.** One run. The repeatability dimension of the rubric needs two runs from the same vague brief to score. Will the brainstorm skill produce the same stamp distribution? Will the spec's AC order drift?
- **Second benchmark.** Phase 4's generalization gate needs a structurally different feature (candidate: product duplication rules as a standalone surface, or a different vertical).
- **Actual visual fidelity.** Needs components, needs a feature branch on Peasy's frontend, needs a side-by-side with the live product.
- **Real PM input.** The vague brief was synthesized here, not written by a Peasy PM. The template may miss fields a real PM would want.

## Priority list going forward

In the order that unblocks the most value per unit of work:

1. **Clone Peasy's frontend repo.** Everything below depends on it.
2. **Harvest the 9 components named in `deviations.md`** into `pack/components/`. This unblocks `peasy-design`.
3. **Reconcile `pack/tokens/`** against the real token file: replace preliminary files, add spacing / radii / shadows / type scale.
4. **First real benchmark run.** Same vague brief, now with components present. Score against the live product.
5. **Phase 4 fix cycle.** Classify every miss as missing-rule / missing-component / wrong-inference / impl-limit. Patch the layer, not the output. Re-score.
6. **Second feature.** Ship one more benchmark end-to-end with only pack additions, no skill rewrites. If that holds, the system has generalized.

## Zero-fabrication audit

Spot-checks on `spec.md`:

- Every `ANB-xxxx` citation points at a ticket in the pack. ✓
- Every validation message matches the exact string in `pack/terminology/validation.md`. ✓
- No field or label appears in `spec.md` that isn't in `pack/terminology/nl-fields.md`. ✓
- The 6 `[open]` items are explicit; no silent inference filled their place. ✓

Pass. This is the discipline the whole system is built around; the dry-run says it holds under stress.

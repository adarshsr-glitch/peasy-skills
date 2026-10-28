# Fidelity rubric

How the pipeline's output is scored against the live Peasy product. Phase 3 cannot close until every dimension clears its threshold on the current benchmark, and Phase 4 cannot close until a second structurally different feature clears the same bar with only pack additions.

Scores are per dimension, 0–100. Thresholds below are starting points. Lock the numbers with the Peasy team before the first scored run — the rubric should be theirs to raise or lower.

## 1 · Visual fidelity

Does the generated UI read as Peasy to a Peasy designer?

Scored on:

- Layout structure matches Figma (grid, spacing scale, section order).
- Typography: Grold for headings, gfflt for body, correct weights and sizes.
- Palette: tokens imported from Peasy's frontend; no literal colors in generated code.
- Component treatment: borders, radii, shadows, hover and focus states.
- Icons and glyphs from Peasy's set, not generic.

Threshold: **≥ 85**. A score below means the designer should treat it as a draft; above, as a prototype to review.

## 2 · Functional fidelity

Do the three flows (edit, create, duplicate) behave as the acceptance criteria require?

Scored on:

- Every AC across ANB-1298, 1303, 1304, 1305, 1306, 1307, 1347, 1358 can be exercised in the prototype and passes.
- State transitions match the surface-states matrix in the benchmark file.
- Mandatory-field validation blocks the right actions.
- `Toon in vergelijking` is locked to `Nee` when Status is `Niet actief`.
- Product name uniqueness is enforced per supplier, case-insensitive, across create / save / duplicate.
- Cancel from the create or duplicate view (and page refresh in those views) returns to the prior state with no save.

Threshold: **100 on each AC, no partial credit**. One AC failing drops the whole dimension to its lowest unmet AC.

## 3 · Rule coverage

Is every load-bearing business rule reflected in both the prototype behavior and the Jira spec?

Scored on:

- Every rule in the benchmark's "Load-bearing business rules" section is cited in the generated Jira spec, by ticket id.
- Every rule shows up in the prototype's behavior (not just in comments).
- Zero invented rules — anything in the generated spec not traceable to an ANB ticket is a hard fail.
- Validation messages match the exact NL / FR / EN copy from the benchmark.

Threshold: **100% rule coverage** and **zero invented rules**. One fabrication fails the whole run.

## 4 · Pattern fidelity

Peasy's real components are not shared with KeyValue, so "component reuse" cannot be scored directly. What we can score is whether the prototype's component API shape matches what Peasy's real code appears to use — closely enough that porting is a line-level translation, not a redesign.

Scored on:

- Each imported component in the prototype has a `// Peasy mapping:` trace comment naming a plausible Peasy component. A Peasy developer reading the comment can identify the target without ambiguity.
- The reconstructed component's props shape is defensible from the source material cited in its `pack/components/<name>.md` file.
- Behavior-bearing props (locked state, loading state, error state) are present in the reconstruction when the brief requires them.
- Deviations log honestly names every component resolved to `source: inference`.
- No prototype imports a component the pack has no file for.

Threshold: **≥ 85**. Ambiguous mappings cost points; invented component surfaces are a hard fail (drops the dimension to 0).

A pasted snippet from Peasy for a given component is a free lift — the component is sourced from `source: snippet` and its mapping confidence goes to maximum. The deviations log should flag which components would benefit most from a snippet request, in priority order.

## 5 · Repeatability

Does the pipeline produce consistent output across runs and across features?

Scored on:

- Running the pipeline twice from the same vague brief produces materially equivalent output (same stories, same rules cited, same component choices).
- The second benchmark feature clears Phases 3 and 4 with only `pack/` additions — no skill rewrites.
- Pack additions for the second feature don't degrade the first benchmark's score when re-run.

Threshold: **two consecutive runs within 5 points** on dimensions 1 and 4; **identical** on dimensions 2 and 3.

## Scoring workflow

1. Build the prototype on a feature branch of Peasy's frontend.
2. Side-by-side the prototype and the live product on the three flows.
3. Score each dimension; log every miss with its cause (missing rule / missing component / wrong inference / implementation limit).
4. Phase 4 patches the layer the cause points at, not the generated output.
5. Re-run the pipeline from the original vague brief. Re-score. Do not hand-edit.

## When the rubric itself is wrong

The rubric is versioned alongside the pack. If a dimension is tracking something that doesn't predict shipping quality (the prototype scores 90 and PMs still rewrite the spec), the rubric is the bug — raise it to the Peasy team, change it with their sign-off, and re-score. Don't game it in the skills.

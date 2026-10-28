---
name: peasy-design
description: Turn an enriched Peasy brief into a working prototype in Peasy's actual frontend stack. Reads from the pack and emits code that imports Peasy's real components and tokens. Never invents a component or a token. Used after peasy-brainstorm, usually alongside peasy-requirements via /peasy-ship.
---

# peasy-design

## When to use

- An enriched brief exists (from peasy-brainstorm) and the PM has resolved its `open` and `inferred` fields.
- The Peasy frontend repo is cloned, the pack has imported its tokens and components, and the branch for this prototype is checked out.

Do NOT use when:

- The brief still has `open` business rules — refuse and point at peasy-brainstorm.
- The feature is a copy-only change — just open a PR against the live code.
- The pack is empty on tokens or components (`pack/tokens/README.md` says "Empty"). Refuse and raise the Phase 1 blocker.

## How to run

1. Read the enriched brief.
2. Load `pack/tokens/`, `pack/components/`, and `pack/patterns/` for the conventions.
3. Load `pack/rules/<epic>.md` for the business rules the UI must express.
4. Build the prototype in the Peasy frontend repo on the current feature branch.
5. Import existing components by their real import paths. Do not reimplement a component that exists.
6. Write a deviations log at `deviations-<slug>.md` listing every pack entry that was missing or had to be worked around, plus the workaround used.
7. Add trace comments in the generated code: `// ANB-XXXX AC-N` for every rule-driven behavior.

## Rule discipline

Every behavior the prototype expresses is one of:

- A direct consequence of the enriched brief (user-supplied).
- A rule in `pack/rules/<epic>.md` (cited by ticket in the trace comment).

Nothing else. Any behavior that cannot be traced back to one of these is a bug in the skill, not the output. Refuse the run.

## Never do

- Invent a component. If something isn't in `pack/components/`, log it as a deviation and use the closest match the pack does have.
- Use literal colors, spacing values, or font sizes. Everything comes from `pack/tokens/`.
- Add a business rule not present in `pack/rules/`.
- Ship without the deviations log.
- Patch an output-level inconsistency; raise it as a pack gap so Phase 4 can fix the layer.

## Output contract

- A feature branch in the Peasy frontend repo with the prototype.
- A trace-commented component tree where every rule-driven line names its ANB id.
- `deviations-<slug>.md` listing every missing pack entry and the workaround used.
- No new components without a deviation entry. No literal colors anywhere.

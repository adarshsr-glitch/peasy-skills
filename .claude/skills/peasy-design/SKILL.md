---
name: peasy-design
description: Turn an enriched Peasy brief into a working prototype in the sandbox. Reads from the pack's reconstructed component library and emits code with placeholder import paths and Peasy-mapping trace comments so Peasy devs can port it to their internal stack. Peasy's real frontend is not shared with KeyValue; the pack is observational. Used after peasy-brainstorm, usually alongside peasy-requirements via /peasy-ship.
---

# peasy-design

## When to use

- An enriched brief exists (from peasy-brainstorm) and the PM has resolved its `open` and `inferred` fields.
- `pack/components/` has reconstructions for the components the brief implies, each with its `source:` line.
- The sandbox stack is set up at `sandbox/` (first run: `npm create vite@latest` or equivalent, pinned to whatever framework the Observable-surface audit inferred).

Do NOT use when:

- The brief still has `open` business rules — refuse and point at peasy-brainstorm.
- The feature is a copy-only change — just send the copy directly, no prototype needed.
- `pack/components/` is missing a component the brief obviously requires AND the pack has no inference available for it. Refuse and name the gap.

## How to run

1. Read the enriched brief.
2. Load `pack/tokens/`, `pack/components/`, and `pack/patterns/` for conventions.
3. Load `pack/rules/<epic>.md` for the business rules the UI must express.
4. Build the prototype in `sandbox/features/<slug>/`. Prototypes are self-contained — one feature per folder, importing from `@peasy-pack/components` (resolved to `../../pack/components/` locally).
5. Every imported component gets a trace comment with its Peasy mapping, e.g. `// Peasy mapping: likely imports as import { Dropdown } from '~/ui/Dropdown'; API shape per pack/components/Dropdown.md`.
6. Every rule-driven behavior gets a citation comment: `// ANB-XXXX AC-N`.
7. Write a deviations log at `deviations-<slug>.md` listing (a) every component that resolved to `source: inference`, (b) every token that was reconstructed vs. snippet-sourced, (c) anything the pack couldn't resolve at all. Each entry carries a severity.

## Rule discipline

Every behavior the prototype expresses is one of:

- A direct consequence of the enriched brief (user-supplied).
- A rule in `pack/rules/<epic>.md` (cited by ticket in the trace comment).

Nothing else. Any behavior that cannot be traced back to one of these is a bug in the skill, not the output. Refuse the run.

## Never do

- Invent a component surface. If something isn't in `pack/components/`, either (a) use the closest match the pack has and log the stretch as a deviation, or (b) refuse. Never ship a prototype that imports a component the pack has no file for.
- Use literal colors, spacing values, or font sizes. Everything comes from `pack/tokens/` — even when the token is `source: inference`.
- Add a business rule not present in `pack/rules/`.
- Omit the `// Peasy mapping:` trace comment on any imported component. The whole point of the sandbox is that Peasy's devs can port from it.
- Ship without the deviations log.
- Patch an output-level inconsistency; raise it as a pack gap so Phase 4 can fix the layer.

## Output contract

- A folder at `sandbox/features/<slug>/` with the prototype — runnable with `npm run dev` from `sandbox/`.
- Trace-commented code: every imported component carries a `// Peasy mapping:` line; every rule-driven behavior carries a `// ANB-XXXX AC-N` line.
- `deviations-<slug>.md` listing (a) components that resolved to `source: inference`, (b) tokens that are reconstructions rather than snippets, (c) pack gaps the prototype worked around. Each entry has a severity (high / medium / low) so Phase 4 knows what to fix first.
- The prototype is **portable, not production.** Peasy's devs translate the imports and may replace entire components with their internal versions. The sandbox is a reference implementation, not a shippable artifact.

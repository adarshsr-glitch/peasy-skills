---
name: peasy-requirements
description: Turn an enriched Peasy brief into a Jira-ready markdown spec. Reads from the pack and emits sections matching Peasy's Jira templates. Every rule carries an ANB citation; invented rules are a hard refusal. Used alongside peasy-design via /peasy-ship.
---

# peasy-requirements

## When to use

- An enriched brief exists and the PM has resolved its `open` and `inferred` fields.
- The pack contains the rules the feature depends on, each cited by ANB ticket.

Do NOT use when:

- The brief still has `open` business rules — refuse and point at peasy-brainstorm.
- No pack rule file exists for the epic the brief references and the brief does not supply rules explicitly. Refuse and raise the Phase 1 blocker.

## How to run

1. Read the enriched brief.
2. Load `pack/rules/<epic>.md` for the authoritative rules.
3. Load `pack/terminology/` for the exact NL / FR / EN labels.
4. Emit a Jira-ready markdown document to `spec-<slug>.md` with these sections, in this order:
   - **Summary** — one paragraph. What this story does and for whom.
   - **Scope** — in-scope / out-of-scope lists.
   - **User stories** — `As a X, I want Y, so that Z`, with child story ids where known.
   - **Acceptance criteria** — Given/When/Then, one per behavior. Each AC carries the ANB citation it comes from.
   - **Business rules** — each cited `ANB-XXXX` or marked `[open]`.
   - **Validation copy** — NL / FR / EN tables, lifted exactly from `pack/rules/`.
   - **Edge cases** — refresh behavior, cancel behavior, empty states, concurrency.
   - **Open questions** — anything the brief marked `open` that hasn't been resolved. If this section is non-empty, it also appears at the top of the file as a warning.
   - **Dependencies** — other epics, systems, or packages this feature touches.

## Rule discipline

Every claim in the generated spec is one of:

- A direct quote from the enriched brief (user-supplied).
- A rule in `pack/rules/<epic>.md` (cite the file and the ANB id).
- A `[open]` placeholder.

Nothing else. A spec containing a rule from none of these sources is a bug in the skill, not the output. Refuse the run.

## Never do

- Invent a validation message. Copy exactly from `pack/rules/` or mark `[open]`.
- Use labels that aren't in `pack/terminology/`.
- Write acceptance criteria that aren't testable.
- Ship a spec with `[open]` items without flagging them in a top-of-file warning.
- Rephrase an ANB ticket's AC — quote the structure (Given/When/Then) and cite it.

## Output contract

A single markdown file at the PM's working location, named `spec-<slug>.md`, following the section order above. Every rule carries a citation. Every `[open]` is listed in the top-of-file warning. The reply names which sections leaned on `[open]` so the PM knows what still needs resolving before this spec is pasted into Jira.

---
name: peasy-brainstorm
description: Turn a two-or-three-line Peasy feature brief into an enriched questionnaire the design and requirements skills can consume. Use at the very start of a new feature, before anyone writes requirements or opens Figma. One-shot — the skill fills a template once and hands the file to the PM to edit. Downstream peasy-design and peasy-requirements refuse to run on a brief that has not passed through this skill.
---

# peasy-brainstorm

## When to use

- A PM or BA has a short feature idea (a Slack message, a line in a meeting, a sentence in a ticket) that cannot yet be built from.
- No one has written down the problem, the user, the surfaces, or the rules yet.
- Before invoking peasy-design or peasy-requirements. Both skills refuse to run on an un-enriched brief.

Do NOT use this skill when:

- The brief is already a filled questionnaire — invoke `/peasy-ship` directly.
- The feature is a one-line copy change or a trivial tweak.
- The user wants an interactive chat; this skill is one-shot by design.

## How to run

1. Read the vague brief the user supplies.
2. Load the Peasy knowledge pack from `../../../pack/`.
3. Copy `template.md` to `brief-<slug>.md` next to the PM's working folder, where `<slug>` is a short kebab-case name derived from the brief.
4. Fill every field with the best-effort value you can defend from the brief + pack.
5. Mark every pre-filled value with a confidence stamp: `confident`, `inferred`, or `open`.
6. Business rules are **always** marked `open` and point at the Jira epic. Never invent a rule.
7. In your reply, name the fields that are `inferred` or `open` so the PM knows exactly what to review.

## Confidence stamps

- `confident` — the value is directly stated in the brief, or trivially derivable from a Peasy convention already in the pack (NL/FR comparison surface, admin-only features, "Toon in vergelijking" default, etc.).
- `inferred` — a reasonable reading of the brief that could be wrong. Must be reviewed.
- `open` — unknown; needs the PM to fill in, or a Jira epic to be read.

Every business rule starts `open`. A rule becomes `confident` only when it is also written in `pack/rules/<epic>.md` with a citation.

## Starter template fields

See `template.md`. Starting set (~10 fields): problem, user, success signal, vertical + supplier, affected surfaces, change shape (new field / changed field / new flow / new rule), Jira epic reference, open rules.

The template is deliberately lean. As patterns emerge across many briefs (an `inferred` field that is wrong half the time, an `open` that recurs), add a field. Don't guess at fields that haven't shown up as real problems yet.

## Never do

- Invent a business rule. If a rule is not in `pack/rules/`, the field is `open`.
- Pick a component or token that is not in `pack/components/` or `pack/tokens/`.
- Rewrite the brief in your own words — enrich it, don't replace it.
- Ask the user interactive questions during the fill. This is one-shot; the PM reviews after.
- Fill a field with a plausible guess as `confident`. If you aren't sure, it's `inferred` or `open`.

## Output contract

A single markdown file at the PM's working location, named `brief-<slug>.md`, following the shape of `template.md`. Every value carries a stamp. The reply names which fields need the PM's review.

# Jira ticket format

The HTML ticket mirrors a Jira epic view. Fill every field; use "TBD" rather than leaving a field out.

## Header fields

| Field | Rule |
|---|---|
| Key | `PEASY-XXX` unless given |
| Type | Epic (stories listed inside) |
| Title | Verb + outcome, max 70 chars. "Let users log in with itsme, Google and Apple" |
| Status | `To groom` |
| Priority | Highest / High / Medium / Low. Default Medium; say why if higher |
| Labels | archetype (`identity`, `provider-onboarding`…), vertical, `nl-fr`, `gdpr` if personal data |
| Components | Web, App, Back-office, Emails (only those touched) |
| Brands | Peasy, plus Hypotheek.winkel, Verzekeringen.be, Aanbieders.be if in scope |
| Reporter | The user, if known; else "Product" |
| Estimate | Sum of story points, flagged as rough |

## Body sections (in this order)

1. **Summary**: 2–3 sentences. Problem, who it's for, what changes.
2. **Context**: why now, Belgian specifics, current behaviour.
3. **Scope**: In scope / Out of scope as two short lists.
4. **Decisions made**: table of question → answer from the brainstorm. This is the audit trail.
5. **User stories**: 3–7. Each one:
   - ID `S1`, `S2`…
   - "As a [user], I want [action], so that [outcome]."
   - Acceptance criteria in Given / When / Then, 2–5 per story. Include at least one error or edge case per story.
   - Story points: 1, 2, 3, 5, 8. Anything above 8: split it.
6. **UX copy (nl-BE)**: key strings in a table with a `FR` column set to `[FR: todo]` unless provided.
7. **Non-functional**: privacy/GDPR, security, accessibility (WCAG 2.2 AA), performance, analytics events.
8. **Dependencies**: teams, providers, contracts, legal review.
9. **Assumptions log** — the deterministic PM checkpoint. Numbered list; each line names the dimension, the call the skill made, and why. Example:
   - `1. Audience — new visitors at account creation. Brief said "visitors" with no segment named; identity archetype's Belgian default.`
   - `2. Surface — redesigned login page. Brief did not fix a surface; identity archetype's default surface.`

   The PM reads the log first. For each line they either accept it (nothing to do) or paste a one-line correction back to the skill:
   - `#2: new entry card on the home page, not a redesigned login page`
   - `#4: drop sister-brand consistency, Peasy only for v1`

   The skill revises the Assumptions log, the ticket's affected sections, and the mockup brief in one pass. Two or three correction cycles is the expected shape; most briefs land in one.

10. **Open questions**: numbered, each with a suggested owner (Product, Legal, Tech, Ops, Design).
11. **Attachments**: mockup artifact link or file, plus inline preview when available.

## Trust tags

Every ticket cell that was not fixed by the brief carries a tag so the PM can scan the uncertainties in one pass:

- `[assumed]` — the skill's own call from a Belgian default in `archetype-pack.md`. Must also appear in the Assumptions log.
- `[open]` — needs an owner. Appears in the Open questions block.
- `[FR: todo]` — Dutch copy present, French translation pending.
- `[Legal text: todo]` — placeholder for Legal review.

Nothing silent. If a cell is confident, no tag; if it is not, exactly one of the four tags above.

## Writing rules

- Plain English, short sentences. Dutch only for UI strings.
- No invented numbers, partners, legal text or commission. Use `€ XX`, `[Partner]`, `[Legal text: todo]`.
- One behaviour per acceptance criterion.
- Name Peasy components when the UI is specified (Button, TextField, OfferCard, SelectorPill…). New UI = "proposed".
- Never use rubric-leak phrases in the ticket or playback — no "mirrors peasy.be", "diff against the live site", "pixel copy", "replica". That framing is internal evaluation.

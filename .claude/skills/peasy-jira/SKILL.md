---
name: peasy-jira
description: Turn a requirement block — a PRD user story from the `peasy` skill, an acceptance-criteria list, or a loose paragraph describing what to build — into a single Jira ticket in a fenced code block, ready to paste into Peasy's board. Peasy house format: summary, issue type, priority, component, labels, description, user story, acceptance criteria, design notes, dev notes, open questions, assumptions. One block in, one ticket out. Pairs with the primary `peasy` skill (which produces the PRD) but works standalone whenever a PM has requirements and needs the Jira format — e.g. a Slack paragraph, an email thread, or a hand-written user story. This is a focused formatter; it does not design, does not infer product strategy, and does not invent business rules.
---

# peasy-jira

Turn requirements into Jira tickets. One block in, one ticket out, in a code block the PM can paste straight into Peasy's Jira.

## What this skill does

Given one of:

- a **Story block** from a `peasy` PRD,
- a list of **acceptance criteria** plus a one-line summary,
- a **loose paragraph** that says what should be built,

this skill produces **one Jira ticket** as a fenced code block, formatted in Peasy's house conventions.

The reply is the code block and nothing else. No preamble, no closing commentary — the PM is copying and pasting into Jira.

## When to use

- The PM has a PRD and needs tickets to populate a sprint. (Run once per Story.)
- The PM wrote a one-paragraph requirement in Slack and wants a ticket out of it.
- An acceptance-criteria list came out of a design review and needs to become a Jira ticket.
- A legacy spec needs re-ticketing in the Peasy house format.

## When not to use

- The PM has a one-line idea with no requirements yet. Point them at the `peasy` skill — it drafts the PRD; this skill then formats each Story from it.
- The PM wants a design, prototype, or copy. This skill does not design.
- The PM wants multiple tickets in one call. Invoke this skill per Story.

## Peasy Jira house format

Every ticket has these fields, in this order:

| Field | Purpose | Notes |
|---|---|---|
| **Summary** | One-line title | Verb-first, under 80 characters. ("Add callback card to Hulp panel", not "Callback feature design.") |
| **Type** | Jira issue type | Default `Story`. Use `Task` for setup/config work, `Bug` for defect reports, `Spike` for research. |
| **Priority** | P0 / P1 / P2 / P3 | Default `P2`. Escalate only if the input explicitly flags urgency. |
| **Component** | Peasy area | One of: `Home`, `Energy`, `Auto`, `Fire`, `Outstanding Balance`, `Mortgage`, `Hulp`, `Mijn Peasy`, `Platform`. |
| **Labels** | Up to 4 | From: `frontend`, `backend`, `copy`, `nl-only`, `fr-pending`, `design-ready`, `needs-figma`, `partner-data`, `gdpr`, `accessibility`. |
| **Description** | Context paragraph | Three to five sentences framing the ticket. Why now, who it's for, how it fits. |
| **User story** | `As a..., I want..., so that...` | One per ticket. If the input gives one, use it verbatim. |
| **Acceptance criteria** | `Given..., when..., then...` | One line per rule. Reference the design-system component where applicable. |
| **Design notes** | Tokens, components, copy | Which Peasy components the UI uses (`Comparison Card`, `--info-bg`), copy strings per language. |
| **Dev notes** | Implementation hints | Data source, API shape, performance budget, phone-width behaviour, edge cases. |
| **Open questions** | Unresolved items | `[open]` entries the PM must answer before dev picks it up. Leave the field empty if none. |
| **Assumptions** | Short list | Anything the input did not fix and the skill filled in. One line at the end. |

### Field inference defaults

The skill infers from the input, in this order of trust:

- **From the input** — any field the user wrote verbatim is kept verbatim.
- **From Peasy's defaults** — Type: `Story`. Priority: `P2`. Component: inferred from the surface the input names. Labels: inferred from the content (form inputs → `frontend` + `gdpr`; copy change → `copy`; new UI → `design-ready`; non-NL copy missing → `fr-pending`).
- **`[assumed]`** — anything the skill filled in that the input did not fix. Surfaced as a one-line `**Assumptions:**` tail at the end of the ticket.
- **`[open]`** — anything that cannot be reasoned from the input or Peasy defaults. Stays `[open]` and is flagged in the Open questions block for the PM to resolve.

Never invent partner data, legal copy, or business rules. If any of these are implied but not supplied, log `[open]`.

## Output contract

The reply is a single fenced code block, nothing before or after. Copy-paste-ready.

Shape:

```
**Summary:** <one line, verb first>
**Type:** Story
**Priority:** P2
**Component:** <Peasy area>
**Labels:** frontend, design-ready

**Description:**
<three to five sentences framing the ticket>

**User story:**
As a <audience>, I want <action>, so that <outcome>.

**Acceptance criteria:**
- Given <state>, when <action>, then <outcome>.
- Given <state>, when <action>, then <outcome>.
- Given <state>, when <action>, then <outcome>.

**Design notes:**
- Uses Comparison Card with --info-bg wash and --radius-lg corners.
- Primary CTA label: "Terugbellen" (NL), "Rappelez-moi" (FR), "Call back" (EN).
- Tiles stack vertically at phone width.

**Dev notes:**
- Data source: callback-slot API (existing).
- Mobile breakpoint: 480px; stack tiles below.
- GDPR consent checkbox required before submission.

**Open questions:**
- [open] Which business hours apply to callback requests?

**Assumptions:** audience inferred as new visitor on the Hulp panel; data source inferred as the existing callback API; label `frontend` chosen because no backend work was named.
```

If a section has no content, omit it entirely — do not print empty "Open questions" headers.

## Worked example — input → output

**Input (a Story block from a `peasy` PRD):**

> ### Story 1: Add a callback request card to the Hulp panel
> As a visitor on the Hulp panel, I want to request a callback at a time that suits me, so that I don't have to wait on hold.
>
> **Acceptance criteria**
> - Given I'm on the Hulp panel, when I open the callback card, then I see three suggested time slots and a "pick another time" link (renders a `Help Tile` for each slot).
> - Given I pick a slot, when I submit, then I see a confirmation state with my chosen time echoed back.
> - Given the API is unreachable, when I submit, then I see an error state with a fallback phone number (`03 501 22 22`) [assumed].

**Output:**

````
```
**Summary:** Add callback request card to Hulp panel
**Type:** Story
**Priority:** P2
**Component:** Hulp
**Labels:** frontend, design-ready, gdpr

**Description:**
Visitors on the Hulp panel currently see Bellen, Terugbellen, Afspraak plannen, and Mailen as four parallel options. The Terugbellen tile only announces the capability — it does not actually let the visitor pick a slot. This ticket adds the inline time-slot picker so the visitor can request a callback without leaving the Hulp panel or calling first.

**User story:**
As a visitor on the Hulp panel, I want to request a callback at a time that suits me, so that I don't have to wait on hold.

**Acceptance criteria:**
- Given I'm on the Hulp panel, when I open the callback card, then I see three suggested time slots and a "pick another time" link, each rendered as a Help Tile.
- Given I pick a slot, when I submit, then I see a confirmation state with my chosen time echoed back.
- Given the API is unreachable, when I submit, then I see an error state with the fallback phone number 03 501 22 22.

**Design notes:**
- Uses the Help Tile component for each time slot (white surface, 1px --border-subtle, --radius 12px, indigo CTA label at the right edge).
- Primary CTA label: "Bevestigen" (NL), "Confirmer" (FR), "Confirm" (EN) — fr-pending.
- GDPR consent checkbox above the submit button with short link to the privacy policy.
- Mobile: tiles stack vertically; CTA full-width.

**Dev notes:**
- Data source: existing callback-slot API — read the next three available 15-minute slots within business hours.
- Confirmation state is client-side after a successful POST.
- Error state: display inline below the submit button, do not navigate away.

**Open questions:**
- [open] Which business hours apply to the callback API — Peasy's standard 09:00–18:00 or the Hulp panel's own hours?

**Assumptions:** priority inferred as P2; component inferred as Hulp from the surface named in the input; CTA copy drafted and marked fr-pending.
```
````

## How to invoke

In a Claude session with this skill enabled, use any of:

- `/peasy-jira <paste a Story block>`
- Paste the Story block and say "make a Jira ticket."
- Paste a loose paragraph and say "turn this into a Peasy Jira ticket."

The skill triggers on any requirement block paired with the words `Jira`, `ticket`, or `peasy-jira`.

## Pairing with the `peasy` skill

The `peasy` skill in this repo produces a PRD whose **Feature breakdown** section is a list of Story blocks. Each Story block is a valid input to this skill. The expected demo flow:

1. PM types a one-line brief in Claude.
2. The `peasy` skill produces a PRD + prototype.
3. The PM copies each Story block from the PRD, invokes `/peasy-jira`, and gets a Jira ticket per Story.
4. The PM pastes each ticket into Peasy's Jira board.

The two skills are composable; neither requires the other.

- **`peasy` alone** → PRD + prototype. PM leaves Jira out of the loop.
- **`peasy-jira` alone** → Jira ticket from any requirement block.
- **Both together** → one-liner in Claude → PRD + prototype → one Jira ticket per Story block.

## Trust ladder

Every field in the output ticket is one of:

- **From the input** — written verbatim where the input gives it.
- **From Peasy's defaults** — reasonable Jira conventions for a Peasy ticket, listed above.
- **`[assumed]`** — the skill's own call, surfaced in the one-line Assumptions tail.
- **`[open]`** — unresolvable from the input; the PM must answer before dev picks it up.

Nothing else. The skill never invents partner data, legal copy, business rules, or a Jira field not in the house format above.

## Install

Drop this folder into the client's repo at:

```
.claude/skills/peasy-jira/SKILL.md
```

Beside the `peasy` skill if you want the full pipeline:

```
.claude/skills/
├── peasy/SKILL.md
└── peasy-jira/SKILL.md
```

Then, from a Claude session, type the brief for `peasy` and run `peasy-jira` on each Story in the PRD it returns.

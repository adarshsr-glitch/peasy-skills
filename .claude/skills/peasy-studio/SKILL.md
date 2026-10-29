---
name: peasy-studio
description: End-to-end orchestrator for Peasy's PM-to-ticket-to-prototype pipeline. Takes a short feature brief, runs it through peasy-brainstorm, then calls peasy-requirements and peasy-design side-by-side to emit a Jira-ready ticket and a Peasy-styled prototype the PM can diff against the live site. Reads from the observational pack (pack/) and the sandbox (sandbox/). Use when a PM wants a one-shot "idea in, review-ready artifacts out" run; use the three stage skills directly when they only want one leg of the pipeline.
---

# peasy-studio

My version of the end-to-end Peasy PM workflow. One run turns a two-line
feature idea into a Jira draft AND a Peasy-styled prototype a reviewer can
diff against the live site.

## What's in this version

- **The pack** (`pack/`) — observational reconstruction of Peasy's design
  system: tokens, 9 components, terminology (NL / FR / EN), ANB-1293 rules,
  patterns. Every artifact carries a `source:` tier
  (snippet / figma-dev / figma-png / live-site / brand-kit / inference).
- **Three stage skills**, each owning one leg of the pipeline:
  - `peasy-brainstorm` — brief → enriched questionnaire with confidence stamps.
  - `peasy-requirements` — enriched brief → Jira-ready `spec-<slug>.md`.
  - `peasy-design` — enriched brief → sandbox prototype with trace comments.
- **The sandbox** (`sandbox/`) — Vite + React + TypeScript app that renders
  a PM dashboard with "Build a feature." It carries four real-site scenarios
  (home comparison picker, energy starter, auto quickform, help panel) plus
  a blank "+ New feature" intake, each ending in a split-pane view: Jira
  draft on the left, live prototype on the right.
- **NL / EN parity** across the sandbox (dashboard, chat, prototypes, Jira
  output) via `src/i18n.tsx`.
- **Benchmark + rubric** (`eval/`) — the ANB-1293 freeze and a five-dimension
  rubric (visual fidelity, functional fidelity, rule coverage, pattern
  fidelity, repeatability) for grading runs.

## When to use

- A PM has a short brief and wants both artifacts (ticket + prototype) in one
  pass without stitching three skills themselves.
- The feature touches a surface the pack already covers, or close to it.
- You want the demo-worthy end-to-end: chat intake, Jira draft, prototype
  preview, side-by-side with the live site.

Do NOT use when:

- The brief is one line of copy or a trivial tweak — overkill.
- The business rules the feature depends on are not in `pack/rules/` and the
  PM cannot provide them. The pipeline refuses rather than inventing them.
- The PM only wants one leg. Call `peasy-brainstorm`, `peasy-requirements`,
  or `peasy-design` directly.

## How to run

1. Read the brief the PM provides (chat, Slack, email, Jira paste — anything).
2. Invoke `peasy-brainstorm` to produce `brief-<slug>.md`. Reply with the list
   of `inferred` / `open` fields the PM must resolve.
3. **Wait for the PM to confirm** the enriched brief is good. Do not fan out
   to stage 2 before that confirmation.
4. On confirmation, invoke `peasy-requirements` and `peasy-design` in parallel.
   Both read the same enriched brief.
5. Return both artifacts and the deviations log in one reply, linked to the
   files on disk.
6. If either stage refuses (missing pack rule, missing component, unresolved
   `open`), surface the refusal and point at the fix. Never ship a partial
   run as "mostly done."

## Trust ladder

Every claim in the output is one of:

- The PM's own words (brief, enriched answers).
- A pack artifact (`pack/rules/<epic>.md`, `pack/components/`, `pack/tokens/`,
  `pack/terminology/`), cited by file + id.
- A `[open]` placeholder.

Nothing else. A claim from none of these is a bug in the skill, not the
output. Refuse the run.

## Prototype variance guardrails

The demo exists so a reviewer can side-by-side diff Studio's prototype
against the real peasy.be surface. For that diff to mean anything, the
prototype must land in the 3–7% visual-variance band:

- **Too close** (<3%) and the demo reads as a pixel copy, not a new design
  direction. Reviewers lose trust.
- **Too far** (>7%) and the diff stops reading as the same feature family.
  Reviewers can't tell whether the pipeline understood the brief.

Prototype choices (background tones, chevron treatments, button alignment,
subtitles) all live in that band. Use pack tokens, never literal hex / px /
font values, so pack updates propagate without re-styling features.

## Honest limits (demo state, 2026-10)

- **No backend.** The chat questions are hard-coded per scenario; the Jira
  markdown is a hand-written template with answer interpolations. A
  production Studio replaces both with a model call that restructures the
  ticket per answer. The dashboard's chat says so.
- **Prototype preview only renders known shapes.** The blank "+ New feature"
  intake drafts a ticket from any brief but shows a placeholder in the
  prototype slot — generating a layout from a free-form brief needs the
  backend. The placeholder states this honestly rather than hiding it.
- **Pack is observational, not sourced.** Everything in `pack/` is
  reconstructed from the live site, Figma PNGs, and the brand kit. When
  Peasy's team shares real tokens / components, swap the pack's values and
  the sandbox should port without touching feature code.
- **Scenarios are frozen at observation time.** If peasy.be changes, the
  prototypes need re-syncing. See `pack/sources.md` for the ritual.
- **The diff-check rubric is internal.** The dashboard does not tell demo
  viewers that each scenario mirrors a live surface — that framing is the
  reviewer's measurement tool, not product copy.

## Never do

- Invent a business rule, a component, a token, or a validation message.
- Rephrase an ANB ticket's acceptance criteria. Quote the Given/When/Then
  and cite it.
- Ship a prototype that imports a component the pack has no file for.
- Use literal colors, spacing values, or font sizes anywhere in the sandbox.
- Fan out to peasy-requirements + peasy-design before the PM has reviewed
  the enriched brief.
- Mark a value `confident` when you aren't. If in doubt, it's `inferred` or
  `open`.
- Leak the diff-check rubric into dashboard copy, chat replies, or output
  labels. "Mirrors peasy.be," "diff against the live site," and similar
  lines belong in eval notes, not the product surface.
- Ask leading, loaded, or compound follow-up questions in the chat intake.
  One decision per question.

## Output contract

Per run:

- `brief-<slug>.md` — enriched brief with confidence stamps.
- `spec-<slug>.md` — Jira-ready ticket, every rule cited.
- `sandbox/features/<slug>/` — runnable prototype folder with trace comments.
- `deviations-<slug>.md` — pack gaps the prototype worked around,
  severity-ranked.

The reply names which `[open]` items in the spec and which `source: inference`
components in the prototype still need the PM's review before Jira paste or
Peasy-dev port.

## Install

Drop this folder into the consumer's repo alongside the three stage skills:

```
.claude/skills/
├── peasy-studio/SKILL.md         (this file)
├── peasy-brainstorm/SKILL.md
├── peasy-requirements/SKILL.md
└── peasy-design/SKILL.md
```

Then from a Claude Code session in a peasy-skills checkout:

```
/peasy-studio <paste your brief here>
```

The skill triggers automatically when a PM's message is a brief plus a
request for both the ticket and the prototype in one pass.

## Repo pointers

- `pack/` — the source of truth for every claim the pipeline makes.
- `sandbox/` — the demo app. `cd sandbox && npm install && npm run dev`
  opens the dashboard at `http://localhost:5173`.
- `eval/benchmarks/anb-1293-electricity.md` — the frozen reference the
  rubric scores runs against.
- `eval/rubric.md` — the five-dimension scoring rubric.
- `BLOCKERS.md` — what the pipeline cannot do yet and what unblocks it.

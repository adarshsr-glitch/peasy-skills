# intake-questions

The five universal PM intake questions this skill asks for every brief, in order.

The scaffold under these questions is the CIRCLES product-management interview
framework (Comprehend situation · Identify customer · Report needs · Cut
through prioritisation · List solutions · Evaluate trade-offs · Summarise
recommendations). The scaffold is **internal only**. Nothing in the ticket,
the playback, the design hand-off brief, the Assumptions log, or any
user-visible reply names CIRCLES, Comprehend, Identify, Report, Cut, List,
Evaluate, Summarise, or any stage letter. If the agent catches itself about
to write any of those words in output, delete the sentence and rewrite.

Each question is designed to pull signal from two or three stages at once,
so the full span is covered without fifteen questions.

## The five questions

Phrase each question in product language. Belgian defaults always listed
first, marked `(Recommended)`. 2–4 options per question. Pull the archetype-
specific option set from `archetype-pack.md` after classifying the brief.

### Q1 — audience + journey stage
*(covers Comprehend situation + Identify customer)*

Primary phrasing: **"Who hits this problem on Peasy today, and in which part of their journey?"**

Variants (rotate to avoid reading as a form):
- "Who is this most for, and when do they run into it?"
- "Which Peasy visitor runs into this, and at what point?"

- Mode: single-select by default; multi-select if two segments are both
  plausible primary audiences in the pack for that archetype.
- Options: `archetype-pack.md` → Q1 for the matched archetype.
- Belgian default: first option, marked `(Recommended)`.

### Q2 — v1 scope + what shadows into later
*(covers Report needs + Cut through prioritisation)*

Primary phrasing: **"What has to work in v1, and what's okay to leave for later?"**

Variants:
- "What's the minimum we'd ship first, and what shadows into v2?"
- "If we had to pick one scope for v1, what is it?"

- Mode: single-select.
- Options: `archetype-pack.md` → Q2.
- The second-ranked option (the next most plausible scope) auto-fills the
  ticket's **Later** bucket, so the PM sees the v2 shadow without being
  asked a sixth question.

### Q3 — surface
*(covers List solutions + feasibility screen)*

Primary phrasing: **"Where does this live on Peasy?"**

Variants:
- "What surface changes, if any?"
- "Where on the site does this show up?"

- Mode: single-select.
- Options (standard pool; `archetype-pack.md` → Q3 marks the Belgian default
  for the matched archetype):
  - Inside an existing flow (modifies a known component)
  - A new card inside an existing surface
  - A new standalone page
  - Back-office only
  - Background change, no UI
- The chosen surface + the design system reference in `peasy-design` tell the
  mockup brief what to draw.

### Q4 — hardest constraint
*(covers Evaluate trade-offs)*

Primary phrasing: **"Hardest constraint v1 must respect?"**

Variants:
- "What has to be right or we don't ship?"
- "Which of these can we not get wrong?"

- Mode: multi-select, max 3.
- Options (standard pool; `archetype-pack.md` → Q4 pre-ticks the Belgian
  defaults for the matched archetype):
  - GDPR consent wording (NL + FR)
  - FSMA / IDD disclosure (insurance / mortgage)
  - Regional accuracy (VREG / CWaPE / BRUGEL / CREG)
  - NL + FR copy parity
  - Mobile-first behaviour
  - Sister-brand consistency (Hypotheek.winkel, Verzekeringen.be, Aanbieders.be)
  - Accessibility (WCAG 2.2 AA)
  - Feature-flag rollout
  - Legal review for ranking / commission disclosure
  - Stale-data protection (hide on feed failure)
  - Idempotent order submission

### Q5 — success metric
*(covers Summarise + the measurement that proves it worked)*

Primary phrasing: **"How will we know v1 worked?"**

Variants:
- "What's the signal that this shipped and did its job?"
- "Which metric moves if this works?"

- Mode: single-select.
- Options: `archetype-pack.md` → Q5.
- The specific target value stays `[open — Product to set]` and lands in the
  Open questions block.

## Mode discipline

- **Full mode** (default) — all five questions.
- **Quick mode** — Q1, Q2, Q5 only. Q3 is inferred from the brief + pack
  default; Q4 is taken as the archetype's pre-ticked constraints. Triggers
  on the words `quick`, `demo`, `short`, `brief`, `defaults` in the brief
  itself (not in the follow-up answers).

## Signal → PRD

By the end of Q5 the agent has enough signal to write:

- **Problem** — brief + Q1 journey stage.
- **Users** — Q1 segment.
- **Scope / Out of scope / Later** — Q2 primary scope and the auto-filled shadow.
- **Solution overview** — Q3 surface + `peasy-design`'s component library.
- **User stories (3–7)** — Q2 primary scope broken out per `ticket-format.md`.
- **Acceptance criteria** — Q3 surface + Q4 constraints per story.
- **Non-functional** — Q4 constraints + the archetype pack's must-covers.
- **Metrics** — Q5.
- **Mockup brief for peasy-design** — Q3 surface + Q1 segment + Q4 constraints.

If any of these cannot be written after Q5, the pack's option set for the
relevant question is wrong and must be fixed — do not add a sixth question.

## How to ask

Use the `AskUserQuestion` tool for every question. The dialog in the demo
screenshots (numbered options, Recommended label, Skip, free-text reply)
is the UI target. If `AskUserQuestion` is not available, ask in plain text
as a numbered list with lettered options and accept shorthand replies
(e.g. `1a, 2b, 3: itsme and Google`).

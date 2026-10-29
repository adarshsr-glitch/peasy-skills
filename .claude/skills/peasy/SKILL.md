---
name: peasy
description: Primary Peasy product skill. Turn a one-line brief (feature idea, PM scribble, Slack line) into a PRD with a feature breakdown and a Peasy-styled HTML prototype. The skill reasons silently through surface, audience, primary action, data source, constraints, and edge cases; asks at most one or two focused back-and-forth questions when a decision is genuinely load-bearing and cannot be inferred; logs every other guess in a numbered Assumptions block the PM accepts or corrects at the end. Carries the full Peasy design system reference (tokens, typography, components, imagery, do's and don'ts). Pairs with the companion `peasy-jira` skill, which turns any user story in the PRD into a Jira ticket in a code block — but this skill is where the product work happens. Use whenever a PM or BA at Peasy wants to go from "we should build X" to a PRD and a working prototype. Belgian comparison-service domain: energy, insurance (auto, fire, outstanding-balance), mortgage, help/contact.
---

# peasy

> comparison made peasy — a trusted Belgian broker, not a lead generator

**Theme:** light (soft cyan surfaces on white, deep indigo ink)

Peasy helps Belgian households compare energy, insurance, and mortgage offers in NL / FR / EN. The product reads as calm, friendly, and local — not a US-startup gradient fest, not a bank's slab of grey. The design system below is observational: reconstructed from the live site, Figma exports, and the brand kit. Every token, component, and copy sample in this skill is a claim about the production surface. When Peasy's team ships internal values that differ, their numbers win; this file is the fallback.

## What this skill does

Given a brief as short as `"a card on the help page that lets a visitor book a callback instead of calling"`, this skill will:

1. **Reason, don't interview.** Think through the six PM dimensions — surface, audience, primary action, data source, constraints, edge cases — using the design system below and what Peasy already is. Default to the most likely answer for a Belgian comparison service with the vertical and surface the brief implies.
2. **Ask at most one or two focused back-and-forth questions** — only when a decision is load-bearing and cannot be inferred with reasonable confidence (e.g. "is this for a new visitor or someone with a saved comparison?"). Everything else lands in the Assumptions log.
3. **Draft a PRD** in Peasy's house format — problem, users, solution overview, a **feature breakdown** of user stories (each independently tickefiable), acceptance criteria per story, copy table (NL / FR / EN), tokens and components used, edge cases, out-of-scope, assumptions.
4. **Produce an HTML prototype** that renders in a browser or an Artifact pane and reads as a Peasy surface at a glance — not pixel-perfect, deliberately in a 3–7% visual variance band from the live site so reviewers can diff.
5. **Hand off to `peasy-jira`.** Each Story block in the feature breakdown is a valid input to the companion `peasy-jira` skill, which produces one Jira ticket in a fenced code block per story. The hand-off is a one-liner at the end of the output, not an interactive prompt.

Both outputs cite the design system by token name. Nothing is invented — but educated inference *is* allowed, as long as it goes into the Assumptions log.

## Trust ladder

Every claim the skill makes is one of three things, and the output tags which:

- **From the brief** — the PM's own words, used verbatim where possible.
- **From this file** — a token, component, copy convention, or rule written below. Cite by name.
- **`[assumed]`** — the skill's own call on a dimension the brief did not fix. Every assumed value lands in the Assumptions log at the end of the output.

The point of the ladder is that the PM can trust the ticket as a draft because the uncertain parts are flagged. A rule or component this file does not carry stays an assumption; the skill does not invent business logic silently, but it also does not stop the pipeline. If a central decision truly cannot be reasoned (e.g., "add a thing to the site" with no verb or noun), the skill produces no artifacts and asks exactly one question. That is the only case where it asks.

---

## Colors

| Name | Value | Role |
|------|-------|------|
| Indigo | `#394295` | Primary brand ink — headlines, nav wordmark, primary CTA background, chevron pills, selected states. The one deep color; carries authority without the heaviness of pure black |
| Cyan | `#66c6e2` | Accent — icon fills, illustration linework, secondary emphasis, decorative strokes. Never used as a page background on its own |
| Info Background | `#d8f0f3` | The signature Peasy card tint — the soft cyan wash behind comparison cards, help panels, and intake prompts. If a visitor remembers one color from the site, this is it |
| Lavender | `#d7d9ea` | Subtle accent tint — alternate card background, divider washes, selected-tile backgrounds. Sits between info-bg and plain white |
| Ink Strong | `#1f2340` | Body headings, strong labels. Never pure black |
| Ink | `#394557` | Body copy at paragraph scale |
| Ink Muted | `#6a7490` | Secondary labels, helper text, placeholder copy |
| Surface | `#ffffff` | Page canvas, modal surface, text-input fields |
| Surface Raised | `#f6f8fb` | Dashboard panels, nested cards within a cyan wash |
| Border Subtle | `#e5e8f1` | Dividers, input borders at rest, dashed placeholders |
| Success | `#1f8a5c` | Validation success, "offer saved" confirmations |
| Warning | `#b56a00` | Price-change alerts, deadline reminders |
| Error | `#b03a3a` | Form errors, missing-field notices |

**Semantic tokens** — expose colors to the prototype as CSS variables. Never use the literal hex in a component rule.

```
--indigo: #394295
--cyan: #66c6e2
--info-bg: #d8f0f3
--lavender: #d7d9ea
--ink-strong: #1f2340
--ink: #394557
--ink-muted: #6a7490
--surface: #ffffff
--surface-raised: #f6f8fb
--border-subtle: #e5e8f1
--success: #1f8a5c
--warning: #b56a00
--error: #b03a3a
```

## Typography

**Grold** — Peasy's display face, used for headings, hero copy, and the wordmark. Grold is proprietary; when it is not available, substitute **Manrope** (Google Fonts, weights 400 / 600 / 700). Never substitute a system serif; the brand is geometric sans end to end.

**Inter** — body copy and UI labels (weights 400 / 500 / 600). Comfortable at 14–18px, legible in Dutch and French where diacritics widen the line.

### Type scale

| Role | Family | Weight | Size | Line Height | Letter Spacing |
|------|--------|--------|------|-------------|----------------|
| caption | Inter | 500 | 12px | 1.4 | 0.02em |
| label | Inter | 600 | 13px | 1.3 | 0.04em uppercase |
| body-sm | Inter | 400 | 14px | 1.5 | normal |
| body | Inter | 400 | 16px | 1.55 | normal |
| body-lg | Inter | 400 | 18px | 1.5 | normal |
| subheading | Grold | 600 | 20px | 1.3 | -0.005em |
| heading-sm | Grold | 700 | 24px | 1.25 | -0.01em |
| heading | Grold | 700 | 32px | 1.2 | -0.015em |
| display-sm | Grold | 700 | 42px | 1.15 | -0.02em |
| display | Grold | 700 | 56px | 1.1 | -0.025em |

Headlines carry weight 700 at every display size. Peasy earns hierarchy through scale, not weight contrast within a single heading.

## Spacing & Layout

**Base unit:** 4px — every size and gap is a multiple.

- **Page max-width:** 1200px, centered, with a 24px side gutter at phone width (`max(16px, env(safe-area-inset-left))`).
- **Section gap:** 48–72px vertical between hero and card blocks.
- **Card padding:** 24px standard, 32px for the hero intake card.
- **Element gap:** 12–20px between a label and its control, 8px between icon and label inside a chip or tile.

### Border radius

- `--radius-sm`: 6px — inputs, small tags
- `--radius`: 12px — buttons, chips, nested cards
- `--radius-lg`: 20px — primary cards, the signature "info-bg" wash blocks
- `--radius-pill`: 9999px — selectors, status pills, chevron badges

### Elevation

Peasy uses two shadow tiers; everything else is flat.

- `--shadow-sm`: `0 1px 2px rgba(31, 35, 64, 0.06)` — resting inputs, nested panels inside a card
- `--shadow`: `0 8px 24px rgba(31, 35, 64, 0.08)` — the primary comparison card hovering on the home page's cyan wash

Never a hard black shadow. The tint is always a translucent `ink-strong`.

## Components

### Primary Button
**Role:** Headline action — `Vergelijk`, `Volgende`, `Verstuur`

Indigo (`--indigo`) background, white text, `--radius` corners, 14px vertical × 20px horizontal padding, Inter 600 at 15px. Hover: ink-strong background. Disabled: 40% opacity. Never two primary buttons in the same card.

### Secondary Button
**Role:** Alternative action — `Vorige`, `Terug naar overzicht`

Transparent background, 1.5px solid `--indigo` border, indigo text, same radius and padding as primary.

### Ghost Link
**Role:** Nav items, "Lees meer" links

No background, indigo text, no underline at rest, underline on hover. Inter 500 at 14–15px.

### Comparison Card
**Role:** The hero container — the home page's "Wat wil je vergelijken?" and every intake prompt

Soft cyan (`--info-bg`) background, no border, 20px radius, 32px padding, `--shadow` elevation. Inside: Grold 32px heading at the top, 16px body below, a vertical list of tiles or a form grid, a primary button at the bottom-right.

### Vertical Tile
**Role:** A row inside the comparison card — `Hypothecaire lening`, `Autoverzekering`, `Energie`

White (`--surface`) background, no border, 12px radius, 16px vertical × 20px horizontal padding. Left: cyan icon in a 32px circle; middle: label at Inter 600 15px; right: an indigo chevron pill (32px, `--radius-pill`, white arrow glyph). Rows are stacked with 8px gap. Hover: tile raises by 2px, chevron pill flashes to ink-strong.

### Text Input
**Role:** `Bouwjaar`, `Merk`, email, telephone

White background, 1px `--border-subtle`, 6px radius, 12px × 14px padding, Inter 400 15px. Focus: 2px indigo ring, border transparent. Error: 1px `--error` border + 13px error message below in `--error` ink.

### Select / Dropdown
**Role:** `Type brandstof`, country, currency

Same shape as text input. Right-side chevron is cyan at 16px. The open menu uses white surface, `--shadow`, 12px radius, 4px internal padding, 8px vertical hit targets per option.

### Help Tile
**Role:** A row in the "Hulp nodig?" panel — `Bellen`, `Terugbellen`, `Afspraak plannen`, `Mailen`

White background, 1px `--border-subtle`, 12px radius, 20px padding. Grid: 40px cyan icon circle, then a two-line text block (title in Inter 600 15px, description in Inter 400 13px `--ink-muted`), then a right-aligned indigo CTA label. One tile per row; never a 2×2 grid — stacked list reads better across languages.

### Status Pill
**Role:** `Actief`, `Verlopen`, `Nieuwste tarief`

`--radius-pill` corners, 2px × 10px padding, Inter 600 11px uppercase with 0.08em tracking. Variants: success tint (`#e3f6ec` bg + `--success` text), warning tint (`#faf0dd` bg + `--warning` text), info tint (`--info-bg` + `--indigo` text).

### Nav Bar
**Role:** Peasy's top site navigation

Transparent white background sitting on page canvas, 72px tall, `--border-subtle` bottom border. Left: Peasy wordmark in Grold 700 `--indigo`. Center-right: ghost links for the verticals (Energie, Verzekeringen, Hypotheek, Hulp). Right edge: primary indigo pill button for `Mijn Peasy` sign-in.

### Mascot / Illustration
**Role:** The friendly figure in the "Hulp nodig?" and empty states

Flat vector illustration — rounded shapes, cyan + lavender palette, no gradients, no 3D. Peasy's visual personality is helpful and local; never stock photography, never a smiling-stranger photo of a call-center agent.

## Terminology

Peasy ships NL, FR, and EN. The dashboard shows NL by default. The skill must preserve this contract in copy tables.

| Concept | NL (default) | FR | EN |
|---|---|---|---|
| Compare | Vergelijken | Comparer | Compare |
| Next | Volgende | Suivant | Next |
| Previous | Vorige | Précédent | Back |
| Submit | Versturen | Envoyer | Send |
| Help | Hulp | Aide | Help |
| Mortgage | Hypothecaire lening | Prêt hypothécaire | Mortgage |
| Car insurance | Autoverzekering | Assurance auto | Car insurance |
| Fire insurance | Brandverzekering | Assurance incendie | Fire insurance |
| Energy | Energie | Énergie | Energy |
| Outstanding balance ins. | Schuldsaldoverzekering | Assurance solde restant dû | Outstanding balance ins. |
| Call back | Terugbellen | Rappelez-moi | Call back |
| Book an appointment | Afspraak plannen | Prendre rendez-vous | Book an appointment |

Phone number for the help panel across the site: `03 501 22 22`.

Any copy string the user asked for must appear in all three languages in the ticket output. If the French form is unknown, mark it `[open — translation pending]`.

---

## Do's and Don'ts

### Do

- Place the hero comparison intake inside a `--info-bg` card with `--shadow` and `--radius-lg`. This is Peasy's single most recognizable composition.
- Use `--indigo` as the only saturated color for primary CTAs. One primary button per card.
- Stack help tiles vertically — never a 2×2 grid, because NL and FR titles wrap at phone width and break the composition.
- Give every text input a focus ring at 2px indigo and a 1px error border at `--error`. Peasy reads as careful; validation states matter.
- Prefer Grold for headings; fall back to Manrope at the same weight. Preserve the geometric sans character.
- Keep page backgrounds pure `--surface` white. The cyan wash belongs *inside* cards, not behind the whole page.
- Deliver copy in NL / FR / EN. Treat French as a first-class language, not an afterthought — Peasy serves Wallonia too.
- Match the live-site composition closely enough that a reviewer can diff screenshots side by side, but allow a 3–7% variance band so the prototype proves a design direction rather than tracing pixels.

### Don't

- Do not use `--cyan` as a page background or large section fill — it is an accent, not a surface.
- Do not introduce a dark theme in the prototype unless the brief explicitly asks for one. Peasy's product is light-first.
- Do not use pure black (`#000000`) for ink. Use `--ink-strong` or `--ink`.
- Do not add gradients to CTAs, cards, or backgrounds. Peasy's palette is flat; the only gradient allowed is inside illustrations.
- Do not use heavy drop shadows. The approved shadows are both low-alpha, close to the surface.
- Do not place two primary buttons in the same card or screen. The second action is the secondary (outlined) button.
- Do not import stock photography of smiling call-center staff. Use the mascot illustration or icon-only tiles.
- Do not invent a business rule, a copy string, or a vertical that is not in this file or in the enriched brief. Mark it `[open]` and surface it to the PM.
- Do not use rubric-leak language in the output ("mirrors peasy.be", "diff against the live site", "pixel copy", "this is a replica"). That framing is for internal evaluation, not the artifact a PM will share.
- Do not open the pipeline with an interview. Reason silently, draft both artifacts, and surface guesses in the Assumptions log at the end — the PM's time is the thing being saved.

---

## Inference protocol — reason silently, ask only when load-bearing

When the brief arrives, the skill works through these six dimensions in its head. Each one is either confidently inferred (goes to the Assumptions log) or load-bearing + unresolvable (goes to a focused clarifying question). The skill asks at most two questions total before drafting; everything else is inferred.

1. **Surface.** Which page or component in Peasy's existing navigation is this most likely on? Defaults: a brief that names a vertical (energy, auto, fire, outstanding balance, mortgage) → that vertical's landing page. A brief about help, contact, call-back, or an advisor → the Hulp panel. A brief about choosing between verticals → the home comparison card. A brief about an authenticated view → `Mijn Peasy`. If two surfaces are plausible and the choice meaningfully changes the design — ask. Otherwise pick the one that reaches more visitors and log it.
2. **Audience.** Default: a new or returning visitor who has not yet started a comparison. Shift only when the brief implies otherwise — post-conversion wording ("after they request a quote"), authenticated wording ("their saved offers"), or advisor-facing wording ("the agent who follows up"). If the shift is a 50/50 call, ask.
3. **Primary action.** Pick the single verb the surface should drive. If the brief names one, use it. If not, infer the smallest action that makes the surface useful: *compare*, *request a callback*, *save*, *continue to vertical X*, *contact an advisor*. One primary action per card. If a second plausible action exists, log it as out-of-scope rather than squeezing it in. Only ask if two actions are equally weighted by the brief and both reshape the UI.
4. **Data source.** Default: an existing Peasy partner catalog for anything that looks up a provider, product, or rate. A static list for anything that enumerates verticals, call-back time slots, or contact methods. Editorial content (headings, help copy) is the skill's own draft marked `[copy — PM to confirm]`. Never silently invent partner data. Rarely ask here — defaults are safe.
5. **Constraints.** Assume phone width always matters — Peasy's traffic is majority mobile. Assume NL default with FR and EN parity. Assume GDPR consent copy applies to any form that collects personal data, with the standard Peasy pattern (checkbox + short link to the privacy policy). Note any that the brief overrides. Never ask — the Peasy defaults are the right starting line.
6. **Edge cases.** For every surface, lock in the obvious four: empty state, loading, error, and "unavailable in your region" where a Peasy vertical has regional availability. Add surface-specific ones (expired callback slot, out-of-hours call-centre, invalid license plate for auto, etc.) when the vertical implies them. Never ask — infer and log.

### How clarifying questions are shaped (when the skill does ask)

When a question is genuinely needed, it is:

- **Compact.** One short sentence, no preamble.
- **Batched.** If two dimensions are load-bearing (e.g. surface + audience), ask one question that resolves both. Never a sequence of six one-at-a-time questions.
- **Focused.** Offers 2–3 named options the PM can answer with a single word. ("Is this on the home comparison card or the Hulp panel?")
- **Final.** After the answer, the skill drafts. No follow-ups, no "and one more thing."

### The one case the skill cannot draft

If the brief has no verb and no noun that maps to a Peasy surface — "do a thing," "improve stuff," "the new feature" — the skill produces no artifacts and asks exactly one open question: *"What should this new surface help the visitor do?"* On receiving a one-sentence answer, it resumes the inference protocol and ships.

---

## Output contract

### 1. The PRD

A single markdown document — the PRD the PM would otherwise sit down to write themselves. Structured so the feature-breakdown stories are each independently ticket-shaped: the PM can lift any Story block below and feed it to `peasy-jira` to get a formatted Jira ticket back.

```
# <feature name>

## Problem
Two to four sentences on the visitor friction or Peasy business goal this surface addresses.
Grounded in the brief where present; inferred otherwise and marked [assumed].

## Users
Who this is for — the specific Peasy visitor segment, in one line.
(e.g. "A visitor on peasy.be/energie who has not yet picked a vertical.")

## Solution overview
One paragraph on how the surface answers the problem — the surface it lives on,
the primary action it drives, and the main composition from the design system.

## Feature breakdown

Each Story below is independently tickefiable. Feed any one to `peasy-jira`
to get a Jira ticket in a code block.

### Story 1: <short verb-first title>
As a <audience>, I want <action>, so that <outcome>.

**Acceptance criteria**
- Given <state>, when <action>, then <outcome>.
- ...
Each criterion cites the design-system component used
(e.g. "renders a Comparison Card with the --info-bg wash").
Criteria the brief did not specify end with [assumed].

### Story 2: ...
### Story 3: ...

## Copy
| Key | NL | FR | EN |
|---|---|---|---|
| heading | … | … | … |
| cta | … | … | … |

Unseen French strings are [open — translation pending]. English is best-effort.

## Design system usage
Named tokens and components from this skill
(--indigo, --info-bg, Comparison Card, Vertical Tile, Help Tile, Primary Button, ...).

## Edge cases
- Empty state: ...
- Loading: ...
- Error: ...
- Regional unavailability: ... (where the vertical has it)
- Surface-specific: ...

## Out of scope
Bulleted list of what this PRD does NOT cover — including plausible second actions
the skill chose not to pack into this feature.

## Assumptions log
Numbered list of every call the skill made that the brief did not fix.
Each entry is one line: "<dimension> — <what was assumed> — <why>."
```

No invented rules. Any criterion that cannot be reasoned from the brief, this file, or a reasonable Peasy default is `[open]` instead of `[assumed]`, and the PM must resolve it before dev picks up the stories.

### 2. The HTML prototype

A single self-contained HTML file (or an Artifact if the client's Claude surface supports it) that:

- Declares every color from this file as a CSS custom property on `:root`.
- Uses Manrope for display and Inter for body via Google Fonts.
- Renders the surface at desktop and phone widths without horizontal scroll.
- Carries `/* Peasy mapping: */` comments beside each component rule, naming which component in this file it realizes.
- Shows the surface in NL by default, with a small language toggle (NL / FR / EN) in the top-right if the brief implies multi-language.
- Does not include analytics, tracking scripts, or external images beyond the Google Fonts stylesheet.
- Falls in the 3–7% visual variance band from the live site — recognizably Peasy, deliberately not a trace.

If the brief describes a surface shape this file does not carry a component for, the prototype renders an honest placeholder card that says what is missing and logs the gap as an assumption. Never invent a component silently.

### 3. Hand-off to `peasy-jira`

After the PRD and prototype, close with a one-line hand-off:

> To turn any Story block above into a Jira ticket, invoke `peasy-jira` with that block as input.

That is the entire pointer. No prompt, no next-step wizard — the PM takes it from there.

### 4. The PM's turn

The PM reads the Assumptions log first. For each line, they either accept it (nothing to do) or paste a one-line correction back to the skill ("#2: this is for returning users, not new ones"; "#5: no French needed for v1"). The skill revises both artifacts and the log in one pass. Two or three correction cycles is the expected shape of the collaboration; most briefs land in one.

---

## Honest limits

- This skill is observational. Every value above is reconstructed from the public site, Figma PNGs, and the brand kit. When Peasy ships internal tokens, replace the values in the Colors and Typography sections and the prototype will absorb the change without rewriting features.
- There is no live backend behind the prototype. Forms validate client-side, submit buttons produce a success state, and no data leaves the page.
- Translations beyond NL are best-effort for new copy. The ticket must mark unseen FR strings as `[open — translation pending]`.
- Surfaces outside the five canonical verticals (energy, auto, fire, outstanding balance, mortgage) and the help panel may need the brief to supply additional context the skill does not already know.

## Install

Drop this folder into the client's repo at:

```
.claude/skills/peasy/SKILL.md
```

Then, from a Claude session (Claude Code CLI, Claude Desktop with skills enabled, or any Claude surface that reads `.claude/skills/`):

```
/peasy <paste the brief here>
```

Or simply describe the feature in plain language in a session where this skill is enabled; the skill triggers on briefs that mention a Peasy surface, a comparison vertical, or the help panel.

## Companion skill: `peasy-jira`

This repo ships a second skill, `peasy-jira`, in `.claude/skills/peasy-jira/`. It takes any requirement block — a Story from the PRD above, an acceptance criterion list, or a loose paragraph — and emits one Jira ticket in a fenced code block, formatted in Peasy's house conventions (summary, type, priority, component, labels, description, user story, acceptance criteria, design notes, dev notes, open questions, assumptions).

The two skills are composable:

- **`peasy` alone** → PRD + prototype. The PM leaves Jira out of the loop.
- **`peasy-jira` alone** → Jira ticket from any requirement block the PM already has.
- **Both together** → one-liner in Claude → PRD + prototype → PM lifts each Story block → one Jira ticket per Story in a code block → paste into the board.

Install both for the full PM pipeline, or either on its own.

## Companion files (optional)

For teams that want more depth, add alongside:

- `pack/sources.md` — the ritual for re-syncing when peasy.be changes.
- `pack/rules/<epic>.md` — business-rule freezes (e.g., ANB-1293 for energy intake). Each rule carries a citation; the skill reads these and refuses to invent rules not written here.
- `eval/benchmarks/<feature>.md` — frozen reference briefs for grading new runs.

These are nice-to-haves, not required. The SKILL.md above runs on its own.

---
name: peasy
description: Turn a vague Peasy product brief (feature idea, PM scribble, Slack line) into a Jira-ready ticket and a Peasy-styled HTML prototype that adheres to the Peasy design system. Carries the full design-system reference (tokens, typography, components, imagery, do's and don'ts) plus the intake, requirements, and prototype contracts in one skill. Use whenever a PM or BA at Peasy wants to go from "we should build X" to "here is the ticket and here is a working prototype" in one pass. Belgian comparison-service domain: energy, insurance (auto, fire, outstanding-balance), mortgage, help/contact.
---

# peasy

> comparison made peasy — a trusted Belgian broker, not a lead generator

**Theme:** light (soft cyan surfaces on white, deep indigo ink)

Peasy helps Belgian households compare energy, insurance, and mortgage offers in NL / FR / EN. The product reads as calm, friendly, and local — not a US-startup gradient fest, not a bank's slab of grey. The design system below is observational: reconstructed from the live site, Figma exports, and the brand kit. Every token, component, and copy sample in this skill is a claim about the production surface. When Peasy's team ships internal values that differ, their numbers win; this file is the fallback.

## What this skill does

Given a brief as short as `"a card on the help page that lets a visitor book a callback instead of calling"`, this skill will:

1. **Intake** — ask up to six single-focus, non-leading follow-ups (surface, user job, primary action, data source, constraints, edge cases). It does not cap at a fixed number; it stops when the open questions are closed.
2. **Draft a Jira-ready ticket** in Peasy's house format — summary, context, user story, acceptance criteria (Given/When/Then), copy table (NL / FR / EN), rule citations, out-of-scope, open questions.
3. **Produce an HTML prototype** that renders in a browser or an Artifact pane and reads as a Peasy surface at a glance — not pixel-perfect, deliberately in a 3–7% visual variance band from the live site so reviewers can diff.

Both outputs cite the design system by token name. Nothing is invented.

## Trust ladder

Every claim the skill makes is one of:

- The user's own words (the brief, the enriched answers).
- A fact from this file (tokens, components, copy conventions below).
- A `[open]` placeholder the PM must resolve.

Nothing else. If a question needs a rule or a component this file does not carry, the skill names the gap and refuses rather than inventing it.

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
- Do not ask leading, loaded, or compound follow-up questions. One decision per question, phrased neutrally.

---

## Intake protocol

When the user sends a brief, respond with a single acknowledgement line and then ask follow-ups one at a time, each as a single-focus question. Stop asking when the open answers are closed; do not pad to a fixed count.

Canonical question families — adapt the wording to the brief:

1. **Surface** — where in the Peasy site does this live? (home, a vertical landing page, the help panel, a modal, an email)
2. **Audience** — new visitor comparing offers, returning user with a saved comparison, help-seeker, or someone post-conversion?
3. **Primary action** — what one thing should the visitor do on this surface?
4. **Data source** — are we pulling from an existing partner catalog, a static list, or does the brief imply new content that needs editorial sign-off?
5. **Constraints** — does the surface need to work at phone width? Does GDPR / consent copy need to appear?
6. **Edge cases** — empty state, loading, error, unavailable in Wallonia, etc.

Never ask "would you like me to…" compound questions. Never offer three framings in the same question. If a question has multiple sub-decisions, split it.

After the final answer, do not ask for permission to draft. Produce both artifacts.

---

## Output contract

### 1. The Jira-ready ticket

A single markdown document, structured like Peasy's internal tickets:

```
## Summary
One sentence naming the surface, the audience, and the primary action.

## Context
Two to four sentences on why this is being built now — motivation from the brief, not invented.

## User story
As a <audience>, I want <action>, so that <outcome>.

## Acceptance criteria
Given <state>, when <action>, then <outcome>. One criterion per rule.
Cite the design-system component used.

## Copy
| Key | NL | FR | EN |
|---|---|---|---|
| heading | … | … | … |
| cta | … | … | … |

## Design tokens used
Named list from --indigo, --info-bg, etc.

## Out of scope
Bulleted list of what this ticket does NOT cover.

## Open questions
Bulleted list of every [open] the PM still needs to resolve.
```

No invented rules. Any criterion that cannot be grounded in the brief or this file is `[open]`.

### 2. The HTML prototype

A single self-contained HTML file (or an Artifact if the client's Claude surface supports it) that:

- Declares every color from this file as a CSS custom property on `:root`.
- Uses Manrope for display and Inter for body via Google Fonts.
- Renders the surface at desktop and phone widths without horizontal scroll.
- Carries `/* Peasy mapping: */` comments beside each component rule, naming which component in this file it realizes.
- Shows the surface in NL by default, with a small language toggle (NL / FR / EN) in the top-right if the brief implies multi-language.
- Does not include analytics, tracking scripts, or external images beyond the Google Fonts stylesheet.
- Falls in the 3–7% visual variance band from the live site — recognizably Peasy, deliberately not a trace.

If the brief describes a surface shape this file does not carry a component for, the prototype renders an honest placeholder card that says what is missing and asks the PM to extend the design system. Never invent a component.

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

## Companion files (optional)

The skill is self-contained in this file. For teams that want more depth, add alongside:

- `pack/sources.md` — the ritual for re-syncing when peasy.be changes.
- `pack/rules/<epic>.md` — business-rule freezes (e.g., ANB-1293 for energy intake). Each rule carries a citation; the skill reads these and refuses to invent rules not written here.
- `eval/benchmarks/<feature>.md` — frozen reference briefs for grading new runs.

These are nice-to-haves, not required. The SKILL.md above runs on its own.

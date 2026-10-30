---
name: peasy
description: Primary Peasy PM skill. Turn a one-line feature idea (SSO, add an energy supplier, redesign the home CTA, rewrite a help page, add dark mode, anything a PM at Peasy would brief) into a Jira-ready HTML ticket plus an optional Peasy-styled mockup from the sibling `peasy-design` skill. Asks five universal product questions — audience + journey stage, v1 scope, surface, hardest constraint, success metric — each with Belgian-tuned options and a sensible default marked `(Recommended)`. Classifies the brief against six archetypes (identity & login, provider onboarding, comparison & results, switch & hand-over, content / copy, catch-all) so the options match the archetype. Pairs with `peasy-jira` to port any Story block from the ticket into a standalone Jira ticket in a code block. Belgian comparison-service domain: energy, insurance (auto, fire, outstanding-balance, credit-life), mortgage, telecom (via Aanbieders.be), help / contact.
---

# peasy

Turn a one-line Peasy feature idea into a groomable HTML ticket plus an optional mockup. The value is in the questions: five universal ones, each tuned to the archetype of the brief, each with Belgian defaults the PM can accept with a click.

## Workflow

Copy this checklist and tick it off as you go.

```
- [ ] 0. Read Peasy context (references/peasy-context.md)
- [ ] 1. Classify the brief, pick an archetype, load its pack
- [ ] 2. Decide full mode or quick mode
- [ ] 3. Ask Q1–Q5 (or Q1, Q2, Q5 in quick mode)
- [ ] 4. Play back the brief and get confirmation
- [ ] 5. Offer a mockup; invoke peasy-design on yes
- [ ] 6. Write the HTML ticket and attach the mockup
- [ ] 7. Hand over
```

### 0. Read Peasy context

Load `references/peasy-context.md`. It carries the facts the skill treats as pre-known: brands, legal entities, verticals and their flows, login state, regulators, retention, partner examples, itsme attributes, known site gaps. **Never re-ask any of these.** Don't recite them to the PM either.

### 1. Classify the brief and pick an archetype

Match the brief to one archetype in `references/archetype-pack.md`:

| Archetype | Typical briefs |
|---|---|
| A. Identity & login | SSO, itsme, Google / Apple sign-in, account linking, 2FA |
| B. Provider onboarding | New energy supplier, insurer, bank, telecom partner |
| C. Comparison & results | New filter, result card, ranking change, new vertical |
| D. Switch & hand-over | Contract switching, document upload, e-signature, confirmation flow |
| E. Content / copy | Copy rewrite, FAQ, legal / privacy page, FR cleanup, email copy |
| F. Catch-all | Anything else — home CTA tweak, dark mode toggle, ops signature image, etc. |

Pick by signal phrases (listed per archetype in the pack). If two fit, pick the primary and borrow Q4 constraints from the second.

The pack supplies Q1–Q5 options and Belgian defaults for the matched archetype. For F (Catch-all), the agent infers Q1–Q2 options from the brief and uses the standard pool for Q3–Q4–Q5.

### 2. Mode

- **Full** (default) — Q1–Q5.
- **Quick** — Q1 + Q2 + Q5 only. Q3 inferred from the brief + pack default; Q4 taken as the archetype's pre-ticked constraints. Triggers on `quick`, `demo`, `short`, `brief`, `use defaults` in the brief itself.

If the brief is not about Peasy, say so in one line and offer to help without this skill.

### 3. Ask Q1–Q5

The five universal questions live in `references/intake-questions.md`. Phrase each as the file states (vary the exact wording with the listed variants so it doesn't read as a form), surface options from the archetype pack, and run every question through `AskUserQuestion` with the Belgian default first marked `(Recommended)`.

- Q1 — audience + journey stage.
- Q2 — v1 scope + what shadows into "Later".
- Q3 — surface (where it lives on Peasy).
- Q4 — hardest constraints (multi-select, max 3).
- Q5 — success metric.

**Hard discipline on the scaffold.** The questions sit on top of a well-known PM interview framework. The framework name, its stages, and any stage letter must never appear in the ticket, the playback, the mockup brief, the Assumptions log, or any reply. The PM should never know a framework is underneath. See `intake-questions.md` for the full rule.

Never ask something `peasy-context.md` already answers. Never ask a sixth question — if a cell can't be written after Q5, the pack's option set is wrong and must be fixed.

### 4. Play back the brief

Under 10 lines: problem, users, v1 scope, out of scope / later, key decisions. Ask the PM to confirm or correct. Don't continue until confirmed; if corrected, update and play back again.

### 5. Offer a mockup

One question: **"Generate a mockup for this ticket?"**
Options: *Yes, key screens (Recommended)* · *Yes, one screen only* · *No, ticket only*. In quick mode, recommend "one screen only".

On yes, invoke the `peasy-design` skill with this brief shape:

```
Design brief from peasy
Feature: <title>
Surface: <Q3 answer>
Audience: <Q1 answer>
Screens: <ordered list, max 3; 1 in quick mode>
Per screen: purpose, primary action, key content, states to show
Constraints to respect: <Q4 answers>
Language: nl-BE (French parked for drafts)
Data: dummy only, label as "Voorbeelddata", prices as "€ XX"
Output: Design artifact URL or standalone HTML file
```

Follow peasy-design's rules. Let the PM review and request changes. Record the result as one of:
- **Artifact URL** (a Design artifact on claude.ai), or
- **Local HTML file** path.

If `peasy-design` is not available, say so in one line, add "Mockup" to Open questions (owner: Design), and continue.

### 6. Write the HTML ticket

Read `references/ticket-format.md`. Copy `assets/ticket-template.html` to `<kebab-title>-ticket.html` and replace its example content. Keep the structure, CSS, section order, and sidebar meta block.

Fill sections from the brainstorm, the archetype pack's must-covers (Non-functional block), and the trust-tag rules in `ticket-format.md`. Every uncertain cell carries exactly one of `[assumed]`, `[open]`, `[FR: todo]`, `[Legal text: todo]` — nothing silent.

Attachments section, by mockup type:
- **Artifact URL** → link only. Delete the `<iframe>`; claude.ai pages can't be embedded.
- **Local HTML file** → link to it by filename and keep the `<iframe>` with that relative `src`. Publish the mockup file next to the ticket so the preview works.
- **No mockup** → delete the iframe; write "No mockup yet" and keep the open question.

Quality references on disk — read them before generating so the output lands at the right level:
- `assets/examples/sso-itsme/sso-itsme-ticket.html` + `login-sso-mockup.html` — identity archetype.
- `assets/examples/energy-partner/energy-partner-ticket.html` + `energy-partner-mockup.html` — provider onboarding archetype.

Ticket key: `PEASY-XXX` unless the PM gives one. Publish via the Artifact tool if available; otherwise send as a file.

### 7. Hand over

Reply in 3–5 lines: ticket link, mockup link (if any), the 2–3 most important open questions, and one line reminding the PM they can port any Story block through `peasy-jira` to get a standalone Jira ticket in a code block. Don't repeat the ticket body.

## Rules

- Never invent partner deals, commission percentages, prices, conversion rates, FSMA numbers, or legal text. Use placeholders and list them as open questions.
- Partner names in `peasy-context.md` are examples from the public site, not confirmed integrations.
- User stories in English unless the PM writes in Dutch; UI strings in Dutch with `[FR: todo]` markers.
- One epic with 3–7 stories. Bigger: suggest a split and say how.
- Label every assumption in the Assumptions log with the dimension and why.
- Changes after hand-over ("split S3", "add the app"): edit the same ticket file and republish to the same link.
- The CIRCLES scaffold under Q1–Q5 is internal. Never named, never printed, never referenced in any user-visible output.
- Rubric-leak phrases ("mirrors peasy.be", "diff against the live site", "pixel copy", "replica") never appear in PM-facing output.

## References

- `references/peasy-context.md` — company, brands, verticals, login, legal, privacy, sources. Step 0.
- `references/archetype-pack.md` — six archetypes × five universal questions with Belgian-tuned options and defaults. Step 1.
- `references/intake-questions.md` — the five universal questions with their internal scaffold and phrasing variants. Step 3.
- `references/ticket-format.md` — Jira fields, story and AC format, Assumptions log framing, trust tags. Step 6.
- `assets/ticket-template.html` — the HTML ticket to copy. Step 6.
- `assets/examples/sso-itsme/` — identity-archetype quality reference (ticket + mockup).
- `assets/examples/energy-partner/` — provider-onboarding-archetype quality reference (ticket + mockup).

## Companion skills

- `peasy-design` — generates the HTML mockup. Called in step 5. Carries the Peasy design-system reference.
- `peasy-jira` — turns any Story block from the ticket into a standalone Jira ticket in a fenced code block. Called by the PM after the ticket is in hand.

# archetype-pack

Belgian-tuned option set per archetype for each of the five universal questions
in `intake-questions.md`. The skill reads this pack after classifying a brief,
pulls the matching Q1–Q5 options, and passes them to `AskUserQuestion`.

**Trust ladder for every option listed here**: either from `peasy-context.md`
(cite the fact), or a Belgian default marked ★ (Recommended). Never invent
numbers, partners, FSMA numbers, commissions, or legal text — placeholders only.

If a brief does not match any archetype's signal phrases, use **F — Catch-all**;
the agent then infers Q1 and Q2 options from the brief itself and uses the
standard pool for Q3/Q4/Q5.

---

## A — Identity & login

**Signal phrases**: sign in · log in · login · SSO · itsme · Google · Apple · account · 2FA · password · forgot password · authentication · auth

**Pre-answered facts** (from `peasy-context.md` — never ask):
- Current login is email + password with Forgot Password. No social, no itsme.
- itsme has 8M+ users and eIDAS High. Exact attribute scope depends on contract — always `[open]` for Tech + Legal.
- Controller is Verzekeringen NV; intra-group sharing with Hypotheekwinkel BV, e-Contract BV, Horizon Holdco.
- No National Register Number stored unless legally required.

**Q1 — Who hits this problem, and when?**
- New visitor at account creation ★
- Returning user signing in
- Multi-brand user wanting one login across Peasy + Hypotheek.winkel + Verzekeringen.be
- Lead captured by advisor (back-office)

**Q2 — v1 scope**
- itsme + email/password fallback ★
- itsme + Google + Apple + email fallback
- itsme only (no email fallback)
- itsme + account linking across sister brands

**Q3 — Surface** (default marked ★):
- A redesigned login page ★
- A new entry card on the home page's hero
- A modal overlay over the current login
- Back-office only (ops tool)
- Background change (SSO config, no UI)

**Q4 — Constraints** (pre-ticked ★):
- GDPR consent wording (NL + FR) ★
- NL + FR copy parity ★
- Sister-brand consistency (if Q2 crosses brands) ★
- Accessibility (WCAG 2.2 AA)
- FSMA / IDD disclosure (only if the SSO feeds insurance / mortgage flows)

**Q5 — Success metric**
- Share of new sign-ups via itsme ★
- Reduced password-reset volume
- Reduced form abandonment on insurance / mortgage flows
- Faster time to first comparison

**Must-covers for Non-functional** (ticket's NFR block):
- GDPR consent wording for itsme attributes (name, address, DOB) in NL + FR.
- Session length and logout behaviour, in v1 scope.
- Error states: provider down, user cancels, email already in use.
- National Register Number NOT stored unless the legal basis requires it.

---

## B — Provider onboarding

**Signal phrases**: add a supplier · new provider · new insurer · new bank · new energy · new telecom · onboard · partner · supplier · leverancier

**Pre-answered facts**:
- Energy flow baseline: postcode, solar panels, single/dual meter, electricity + gas usage, current supplier, green preference. 35-day legal notice; meter stays.
- Auto insurance flow: build year → brand → fuel → model → cover (BA / mini-omnium / omnium) → contact → results. ~9 car insurers.
- Mortgage: ~20 FSMA lenders. Appointment-driven; 1–2 week approval.
- Energy regulators by region: VREG (Flanders), CWaPE (Wallonia), BRUGEL (Brussels), CREG (federal).
- Energy and telecom also live on sister brand Aanbieders.be (e-Contract BV).

**Q1 — Who hits this problem, and when?**
- Household comparing on peasy.be/{vertical} ★
- Repeat visitor during the yearly re-check
- Ops managing supplier onboarding (back-office)
- Advisor-driven comparison (phone or appointment)

**Q2 — v1 scope**
- Tariffs synced nightly, offer visible in results, switch via API ★
- Tariffs synced only; manual switch hand-over
- Visible but ranking locked at bottom until validated
- Flanders-first, then roll out to Wallonia / Brussels

**Q3 — Surface**
- Within the existing comparison results ★
- A new card above the results (sponsored, must be disclosed)
- Back-office supplier manager only
- Both consumer-facing results + back-office manager
- Background (API integration only, no UI)

**Q4 — Constraints** (pre-ticked ★):
- Regional accuracy (VREG / CWaPE / BRUGEL / CREG) ★
- Stale-data protection (hide supplier if feed fails) ★
- Neutral ranking (no commission bias) ★
- GDPR for customer data passed to the supplier
- FSMA / IDD disclosure (insurance / mortgage verticals)
- NL + FR copy parity
- Idempotent order submission

**Q5 — Success metric**
- Switches completed per month ★
- Supplier tariff accuracy vs. the live partner data
- Reduced ops support tickets per switch
- Share of comparisons that convert

**Must-covers for Non-functional**:
- Tariff data validation rules and stale-data behaviour.
- Legal disclaimer per vertical (FSMA/IDD for insurance/mortgage; regional energy transparency).
- Provider logo usage rights.
- Idempotent order submit (same Peasy reference → one order at provider).
- Analytics: `supplier_sync_success`, `supplier_sync_failed`, `supplier_hidden_stale`, `offer_selected`, `switch_confirmed`, `switch_order_accepted`, `switch_order_failed`.

---

## C — Comparison & results

**Signal phrases**: filter · sort · ranking · result card · new vertical · add comparison · comparison page · offers · results list · badge

**Pre-answered facts**:
- Current verticals: mortgage, auto / fire / credit-life / funeral insurance, energy, telecom (via Aanbieders.be).
- Ranking must be neutral and explained. No commission disclosure on the site today — any ranking factor change triggers Legal review.
- No current A/B test infrastructure named on peasy.be.

**Q1 — Who hits this problem, and when?**
- Household comparing on peasy.be/{vertical} ★
- Returning user resuming a saved comparison
- Household who clicked a vertical but didn't complete the flow
- Household converted elsewhere, now re-checking yearly

**Q2 — v1 scope**
- One new filter plus one default sort change ★
- A new result-card layout
- A new vertical card on the home picker
- A new ranking factor (requires legal review)

**Q3 — Surface**
- Inside the existing comparison flow ★
- A new card on the results page
- A standalone comparison vertical landing
- Background (ranking algorithm change, no UI)

**Q4 — Constraints** (pre-ticked ★):
- Neutral ranking + ranking explanation on the page ★
- NL + FR copy parity ★
- GDPR for stored comparisons
- FSMA / IDD disclosure (if insurance / mortgage verticals)
- Mobile-first behaviour
- Accessibility (WCAG 2.2 AA)
- Legal review for any new ranking factor

**Q5 — Success metric**
- Completion rate through the flow ★
- Conversion to switch
- Average session length on the results page
- Share of visitors who save a comparison

**Must-covers for Non-functional**:
- Ranking logic transparency (what the sort is based on, visible on the page).
- Empty-state copy for no-results (per vertical).
- Legal review of any new ranking factor or badge.
- Analytics events for filter and sort usage.

---

## D — Switch & hand-over

**Signal phrases**: switch · sign the contract · upload document · e-signature · confirmation · order · handover · overstap · bevestigen

**Pre-answered facts**:
- Energy: 35-day legal notice. Meter stays the same.
- Insurance: online sign-up today for direct insurers (Yuzzu, Belfius Direct, Ethias).
- Mortgage: appointment required.
- Peasy sends customer data to supplier only to carry out the switch the customer asked for (Verzekeringen NV controller; supplier a separate controller).

**Q1 — Who hits this problem, and when?**
- Household completing a switch via peasy.be ★
- Household picking the switch via phone with advisor
- Ops processing a failed switch (back-office)
- Household wanting to cancel a pending switch

**Q2 — v1 scope**
- Peasy sends order via provider API ★
- Peasy sends a pre-filled lead; provider contacts the user
- Peasy e-signs on behalf; provider receives signed doc
- User redirected to provider site to finish

**Q3 — Surface**
- Inside the existing switch flow ★
- A new confirmation screen
- A new provider-side iframe
- Back-office for manual rescue flow
- Background (API integration only)

**Q4 — Constraints** (pre-ticked ★):
- GDPR for data passed to provider ★
- Legal review of consent wording ★
- Idempotent order submission ★
- FSMA / IDD disclosure (if insurance / mortgage)
- NL + FR copy parity
- Accessibility (WCAG 2.2 AA)
- Stale-data protection (price re-check at confirm)

**Q5 — Success metric**
- Switches completed per month ★
- Average time from quote to confirmation
- Rate of order-API failures and recoveries
- Reduced customer-service tickets per switch

**Must-covers for Non-functional**:
- Idempotency on retry (same Peasy reference, one order at the provider).
- Fallback flow on provider-API failure (retry, callback request).
- Confirmation email + reference ID.
- Document retention per vertical (per existing policy).
- Price re-check at confirm; if the price changed, confirm again.

---

## E — Content / copy

**Signal phrases**: copy · wording · text · label · button text · nl · fr · translation · legal copy · disclaimer · FAQ · help text · tooltip

**Pre-answered facts**:
- NL at peasy.be/, FR at /fr/ incomplete with Dutch leftovers and placeholder `#` links.
- FR label vocabulary partial; FR energy section is thin.
- Legal review required for FSMA/IDD, GDPR, ranking, and commission-adjacent copy.

**Q1 — Who hits this problem, and when?**
- Any peasy.be visitor reading the surface ★
- A visitor inside a specific vertical flow
- A visitor who already converted (confirmation / email)
- Ops reading internal back-office copy

**Q2 — v1 scope**
- Rewrite one existing string ★
- Add one new string
- Rewrite a block of strings on one surface
- Replace all strings in one language (FR cleanup)

**Q3 — Surface**
- Inside an existing component (no layout change) ★
- A new content block in an existing surface
- A new standalone content page (FAQ / policy / legal)
- Email / notification copy
- Legal / privacy page

**Q4 — Constraints** (pre-ticked ★):
- NL + FR copy parity ★
- Legal review (if FSMA / IDD / GDPR copy) ★
- Accessibility (reading grade, link clarity)
- Mobile-first behaviour
- Analytics (if the copy drives a funnel)

**Q5 — Success metric**
- Share of visitors completing the surface's action ★
- Reduced support tickets citing confusing copy
- NL / FR parity delta (strings missing per language)
- Legal sign-off recorded

**Must-covers for Non-functional**:
- NL first; FR required for v1 unless the brief fixes it to NL only.
- Legal review for compliance-adjacent copy (FSMA / IDD / GDPR / ranking).
- A/B-test setup if comparing variants (flag `[open]` if the infrastructure isn't live).

---

## F — Catch-all

Use when no other archetype's signal phrases match.

**Pre-answered facts**: everything in `peasy-context.md`.

**Q1 — Who hits this problem, and when?**
Options inferred from the brief. If no signal, use:
- A peasy.be visitor on the surface the brief names ★
- A returning user
- Ops
- Advisor

**Q2 — v1 scope**
Agent writes four plausible scopes from the brief, puts the Belgian default
first marked ★. No invented numbers or partners.

**Q3 — Surface** (standard pool):
- Inside an existing flow ★ (default unless the brief names a new page)
- A new card inside an existing surface
- A new standalone page
- Back-office only
- Background change, no UI

**Q4 — Constraints** (pre-ticked ★):
- NL + FR copy parity ★
- Mobile-first behaviour ★
- Accessibility (WCAG 2.2 AA)
- GDPR (if any personal data)
- FSMA / IDD (if insurance / mortgage adjacent)
- Sister-brand consistency (if the brand isn't fixed)

**Q5 — Success metric**
Agent picks the one metric that best measures the brief; if none fits,
`[open — Product to set]` ★.

**Must-covers for Non-functional**:
- GDPR check for any personal data.
- FSMA / IDD check if insurance / mortgage adjacent.
- Sister-brand check if the brief doesn't fix a single brand.
- Belgian regulator check if a vertical is in play.

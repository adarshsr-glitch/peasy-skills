# peasy-skills

The Peasy AI Product-Building System. Three Claude skills and one shared knowledge pack that take a two-or-three-line feature brief and produce a review-ready Jira spec and a Peasy-consistent prototype.

## What's here

```
.claude/skills/
├── peasy-brainstorm/   one-shot questionnaire that enriches a vague brief
├── peasy-design/       enriched brief + pack  → prototype in Peasy's real stack
└── peasy-requirements/ enriched brief + pack  → Jira-ready markdown

pack/
├── tokens/             imported from Peasy's frontend
├── components/         one file per component, usage rules + API
├── rules/              one file per ANB epic, every claim cited
├── terminology/        NL + FR glossary
├── patterns/           page layouts, forms, loading/empty/error/success
├── examples/           good outputs the skills pattern-match on
└── CHANGELOG.md

eval/
├── benchmarks/         Electricity (ANB-1293) first, Duplication second
└── rubric/             the five-dimension scoring rubric
```

## Phases

The build is sequenced in five phases, each with an explicit gate. The current plan lives at `~/.claude/plans/see-a-thing-that-cozy-lerdorf.md`.

- **Phase 0** — pre-flight: benchmark freeze, stack audit, fidelity threshold.
- **Phase 1** — knowledge pack skeleton.
- **Phase 2** — three skills, lean versions.
- **Phase 3** — benchmark run against the live Electricity feature.
- **Phase 4** — close the loop: fix the layer, not the output.
- **Phase 5** — pilot and adoption.

## Benchmark

ANB-1293 — Energy / New Engine Admin / Electricity Product Specifications. Source material: `../ANB-1293 Energy - New Engine Admin- Electricity Product Specifications/`.

## Prerequisites

- Read access to Peasy's frontend repository (location to be set).
- Jira read access for epic ANB-1293 and the related stories.
- Figma read access to the Electricity screens.

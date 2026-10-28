# eval/runs/

One folder per pipeline run against a benchmark. Named `<date>-<benchmark>-<label>/`.

Each run contains:

- `vague.md` — the input brief the PM gave the system.
- `enriched.md` — `peasy-brainstorm` output.
- `spec.md` — `peasy-requirements` output.
- `deviations.md` — `peasy-design` output (prototype deviations, or a refusal report).
- `findings.md` — the meta-level analysis: what the run surfaced, where the pack held, where it broke.

Runs are append-only. Nothing in a run folder is edited after it's committed — the record is the whole point. A later run with a thicker pack lives in its own folder.

## Index

| Run | Benchmark | Outcome | Notes |
| --- | --- | --- | --- |
| `2026-10-28-anb-1293-dry-run/` | ANB-1293 Electricity Specifications | 2/3 skills clean, design refused (empty components). Spec is review-ready. | First-ever pipeline run; thin pack. |

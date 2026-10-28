# Sources — trust tiers

Peasy's frontend code is not shared. The pack is reconstructed from what we can observe. Every pack file (tokens, components, patterns, terminology) carries a `source:` line pointing at its highest-trust source from the ladder below.

## Trust tiers (highest to lowest)

### 1 — Pasted snippet from Peasy

A Peasy engineer pastes an actual code excerpt in response to a specific question (`"please share the Dropdown props type"`). This is the ground truth. Any pack file whose `source: snippet` is live and current overrides every lower tier for the same subject.

### 2 — Figma dev mode

Figma's dev mode exposes the design tokens, variants, and auto-layout rules Peasy's designers maintain. Not Peasy's code, but Peasy's canonical design intent. Reliable for tokens, spacing, radii; less reliable for component API shape (dev mode shows the design, not the signature).

### 3 — Figma visual export (PNG)

Static exports of Figma frames. We have three on disk for ANB-1293 (`figma/*.png` in the benchmark folder). Reliable for visual treatment and composition; unreliable for exact token values and interaction states. The lowest reliable visual tier.

### 4 — Live site browser inspection

Opening peasy.be in a browser and reading the DOM, computed CSS, and visible component treatments. Reliable for consumer-facing surfaces; not representative of the admin, which the public cannot see.

### 5 — Public brand kit / external extraction

The `../peasy.be-brand-kit.md` file extracted by David Zagury's Design System Extractor. The site served it a 403, so several values are inferred (primary color, for example). Use as corroboration, never as the sole source.

### 6 — Educated inference from Peasy conventions

When all tiers above are silent, the design skill may infer from Peasy's voice and tone (plain-spoken, playful, reassuring per the brand kit) and from analogous patterns elsewhere in the product. Inferences carry `source: inference` plus a `rationale:` line. They are the first thing the deviations log flags.

## Rules

- A pack file's `source:` is always the **highest** tier any part of its content touches. If 90% of the file comes from Figma PNGs and 10% from a pasted snippet, the file's source is "snippet" and the snippet-sourced section is annotated inline.
- Upgrading a source (snippet lands for something previously inferred) is a Phase 4 fix: rewrite the pack file, note the upgrade in `pack/CHANGELOG.md`, re-run the affected benchmark.
- Downgrading never happens — once we have a snippet, we don't un-have it.
- When a snippet contradicts a lower tier, the snippet wins and the lower-tier value is deleted from the pack. We don't carry conflicting values hoping to average them.

## When to escalate

The design skill will try the ladder top-down. When it reaches "inference" and still cannot resolve a specific question (what props does `Dropdown` take? what's the border-radius on primary buttons?), it:

1. Logs the question in the deviations file for the current run.
2. Marks the resulting component or token as `source: inference` with the rationale.
3. Does not block the run — proceeds with the inference.

The accumulated inferences across runs become the shopping list for the next pasted-snippet request to Peasy.

# Blockers

Things the project cannot advance past without an external action. Updated after confirming Peasy keeps its frontend code internal — no repo access, now or later.

## Observational sourcing is the mode

The pack is reconstructed from what we can observe. There is no "waiting for the frontend repo." See `pack/sources.md` for the trust tiers; each pack file carries a `source:` line pointing at its highest-trust source.

## Current blockers

### Figma access level

**Status:** We have 3 PNG exports of the ANB-1293 screens on disk. Figma dev mode would give us tokens, auto-layout specs, and component node ids directly — far better than visually re-measuring from PNGs.

**Unblock by:** Peasy adds Adarsh to the Peasy Design Figma file with at least view-plus-dev-mode access. Not critical for Phase 1 — PNGs are enough for a first pass — but important before scored benchmarking in Phase 3.

### Pasted-snippet channel

**Status:** No named Peasy contact confirmed. When the design skill cannot resolve a component's probable API from Figma + live site, it needs a human on the Peasy side to paste the real component's signature. Without this, every ambiguous component becomes an `[open]` indefinitely.

**Unblock by:** A named Peasy engineer (Steve, from `ANB-1293 People`?) agrees to a ~5-minute SLA on "please paste your `Dropdown` props type" requests. One Slack channel or email thread, nothing formal.

### Figma dev mode token export

**Status:** Related to the Figma access blocker above. If dev mode is granted, `pack/tokens/` can be reconciled against Figma's stored tokens rather than hex-picking from the live site. This closes the "preliminary tokens" caveat in `pack/tokens/colors.md`.

**Unblock by:** Figma dev mode.

### Phase 3 sandbox hosting

**Status:** Prototypes will live in `peasy-skills/sandbox/`. The exact stack (Vite + React is the current default guess) depends on what the live site + any pasted snippets reveal about Peasy's real stack.

**Unblock by:** Running the Observable-surface audit in Phase 0 — browser-inspect peasy.be, note the framework signatures, lock the sandbox stack.

## No longer blocking

- ~~Peasy frontend repo not cloned locally~~ — resolved by committing to observational sourcing. The pack ships as a reconstruction; Peasy devs reconcile when porting.

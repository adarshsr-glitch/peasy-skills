# Blockers

Things the project cannot advance past without an external action.

## Phase 1 — knowledge pack skeleton

**Peasy frontend repo not cloned locally.** The pack imports tokens and components directly from Peasy's real frontend; nothing in `pack/tokens/`, `pack/components/`, or `pack/patterns/` can be populated until the repo is on disk and read access is confirmed.

Blocks:

- Phase 0 stack audit (framework, component library name, token file path, build tool).
- Phase 1 token import.
- Phase 1 component harvest.
- Phase 3 prototype build (needs a branch on the real frontend).

Unblock by: cloning the repo somewhere on this machine and pointing the session at it.

## Phase 1 — knowledge pack skeleton

**Jira read access not confirmed in-session.** The epic doc on disk covers ANB-1293, but future features will come straight from Jira. The pipeline needs either an authenticated Jira path or an export-to-disk ritual.

Not blocking the first benchmark — the ANB-1293 material is already extracted into `eval/benchmarks/anb-1293-electricity.md`.

## Phase 1 — knowledge pack skeleton

**Figma read access not confirmed in-session.** The three PNG exports in the ANB-1293 folder cover the main views, but the Specifications page's component option values, radio sets, and checkboxes live in Figma, not in Jira text.

Needed when the design skill is built in Phase 2.

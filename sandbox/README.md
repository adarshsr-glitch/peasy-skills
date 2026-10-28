# sandbox/

A Vite + React + TypeScript shell for building prototypes that read from the pack.

Not production. Nothing here ships to Peasy. The sandbox exists so the design skill has a target to emit code into, and so prototypes can be reviewed in a browser before Peasy's team ports them to their internal frontend.

## Run

```bash
cd sandbox
npm install
npm run dev
```

Opens at http://localhost:5173.

## What's here

- `src/tokens.css` — Peasy design tokens exported from `pack/tokens/` as CSS custom properties.
- `src/components/` — 9 reconstructed components matching the pack's observable APIs. Each imports its CSS Module and carries a `// Peasy mapping:` trace comment naming the probable real component in Peasy's codebase.
- `src/features/anb-1293-electricity/` — the ANB-1293 Electricity Specifications edit view, built on the components above.
  - `EditView.tsx` — the page, with `// ANB-xxxx AC-N` trace comments on rule-driven behavior.
  - `fixtures.ts` — static mock data (ENGIE + ENGIE Basic Online) mirroring the Figma mockup.
  - `deviations.md` — the design skill's deviations log for this run.

## Porting discipline

When Peasy's team ports a feature from here into their internal frontend:

1. Replace `src/tokens.css` with Peasy's real token source.
2. Swap component imports from `./components/*` to Peasy's real paths — the `// Peasy mapping:` comments name the probable targets.
3. Delete `TextInputNumeric.tsx` and use `<TextInput inputMode="numeric" />` (or whatever prop Peasy's `TextInput` takes) directly — this file exists for pack parity only.
4. Reconcile the dropdown. The sandbox uses a native `<select>`; the real Peasy Dropdown is custom (status-colored items per `ANB-1306 AC3`).
5. Read `deviations.md` for everything else.

# pack/components/

One file per Peasy component. Each file is a **reconstruction** of the component's observable API — not an import of Peasy's real code (Peasy keeps that internal; see `../sources.md`).

Each file documents:

- `source:` line (snippet / figma-dev / figma-png / live-site / brand-kit / inference)
- Probable name in Peasy's codebase
- Observable props / API surface
- Variants and states
- Usage rules (when to pick this component vs. a cousin)
- Visual treatment: tokens used, spacing, states
- Accessibility expectations
- Open questions — things we can't resolve without a snippet from Peasy

Prototypes built by `peasy-design` import from these reconstructed files via a placeholder path like `@peasy-pack/components`. Each use carries a `// Peasy mapping:` trace comment naming the probable real component, so Peasy devs porting the prototype know exactly what to swap in.

## Status

All 9 components for the ANB-1293 minimum set have landed. Each file carries a `source:` line and a `peasy_mapping:` hypothesis in its frontmatter.

| File | Source | Notes |
| --- | --- | --- |
| `Button.md` | `figma-png + live-site` | Two button families: admin rounded + marketing pill |
| `Dropdown.md` | `figma-png` | Open-state treatment inferred — priority snippet request |
| `Badge.md` | `figma-png` | `Niet actief` (grey) not visually observed, spec'd by `ANB-1306 AC2` |
| `TextInput.md` | `figma-png` | Focused / error states inferred |
| `TextInputNumeric.md` | `figma-png` | May be a prop on `TextInput` rather than a separate component — snippet request |
| `RadioGroup.md` | `figma-png` | Locked state (`ANB-1306 AC5`) inferred — important for ANB-1293 |
| `CheckboxGroup.md` | `figma-png` | Required-field semantics ("at least one") inferred |
| `StickyActionBar.md` | `figma-png + inference` | May not be a component at all — could be a layout pattern |
| `PageHeader.md` | `figma-png` | Three flow variants (edit / create / duplicate); whether it's one component or three is open |

Priority snippet-request list, highest-value first:

1. **Button** state treatments (hover, focus, active, disabled, loading) — five inferences, all production essentials.
2. **Dropdown** open-state visual (including status-colored items).
3. **RadioGroup** `locked` prop shape — needed for `Toon in vergelijking` behavior.
4. **StickyActionBar** vs. **PageHeader** boundary — one snippet collapses or confirms both.
5. **TextInputNumeric** — one prop on TextInput or a separate component?

Everything else (CheckboxGroup indeterminate, Badge dot-as-prop, PageHeader variants) can wait until a feature actually touches them.

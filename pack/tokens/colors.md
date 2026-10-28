---
name: Colors
source: live-site + figma-png + inference
---

# Colors

Three tiers: **palette** (brand colors), **semantic** (success / neutral / warning / danger / info — tones that map to state, not brand), and **structural** (surface / border — tones that map to layout). Palette is confirmed in-browser; semantic and structural are reconstructed from Figma PNG observation and standard conventions. Figma dev mode and pasted snippets would upgrade several of these from inference to observation.

## Palette

Confirmed in-browser against the live site:

| Token | Hex | Use |
| --- | --- | --- |
| `--indigo` | `#394295` | Primary brand. Headings, primary buttons, strong accents. |
| `--cyan` | `#66C6E2` | Secondary accent. Playful highlights, section markers. |
| `--pink` | `#F2A4C7` | Tertiary accent. Occasional decorative pops. |
| `--lavender` | `#D7D9EA` | Supporting surface tint. Cards, soft dividers. |
| `--cream` | `#FBF9F4` | Page background. Warm neutral. |
| `--ink` | `#000000` | Body text. |

External brand-kit extractor (`../../../peasy.be-brand-kit.md`) returned a different primary (`#888EBF`) because the live site served it a 403. The browser-extracted indigo above is the real one.

## Semantic — status

Each status pair is `fg` (text + dot) and `bg` (pill background). Values are approximate — hex-picked from Figma PNG observation, not from a source token file.

| Token | Hex | Where observed |
| --- | --- | --- |
| `--success-fg` | `#1F8A4A` | Badge text + dot for `Actief` (ANB-1306 AC2) |
| `--success-bg` | `#DAF4E6` | Badge background for `Actief` |
| `--neutral-fg` | `#6B7280` | Badge text + dot for `Niet actief` — **inferred**; the colored sample isn't in the PNGs (ANB-1306 AC2 spec says "light grey") |
| `--neutral-bg` | `#F0F1F4` | Badge background for `Niet actief` — **inferred** |
| `--info-fg` | `#0E7490` | Metadata chip text (`Product ID: 683 | Supplier ID: 5`) — **inferred** |
| `--info-bg` | `#D8F0F3` | Metadata chip background — observed in Figma |
| `--warning-fg` | — | Not observed on ANB-1293 screens. Add when a feature needs it. |
| `--warning-bg` | — | Same. |
| `--danger-fg` | `#B91C1C` | Not observed on ANB-1293 screens; **inferred** standard for destructive and error states |
| `--danger-bg` | `#FEE2E2` | **Inferred** |

Validation-error states should use `--danger-fg` and `--danger-bg`. The required-field validation messages (`Dit veld is verplicht.`) are copy, not color — but they render in the danger tier.

## Semantic — structural

Surface and border tones used for layout, not state.

| Token | Hex | Where observed |
| --- | --- | --- |
| `--surface-base` | `#FFFFFF` | Dropdown background, input background |
| `--surface-page` | `#FBF9F4` | Page background (`--cream` from the palette) |
| `--surface-raised` | `#F7F7F2` | Edit card background — slightly cooler than page — **inferred** |
| `--border-subtle` | `#E5E7EB` | Dropdown border, input border — **inferred** |
| `--border-strong` | `#394295` | Ghost button border — same value as `--indigo` |
| `--ink-strong` | `#000000` | Primary body text |
| `--ink-muted` | `#6B7280` | Metadata labels, less-emphasized copy — **inferred** |

`--surface-page` and `--ink-strong` are also in the palette tier; they appear here under semantic names so component code reads intent, not raw brand values.

## Mapping to components

| Component | Property | Token |
| --- | --- | --- |
| Button primary bg | background | `--indigo` |
| Button primary text | color | `--surface-base` |
| Button ghost bg | background | `--surface-base` |
| Button ghost text | color | `--indigo` |
| Button ghost border | border-color | `--border-strong` (`--indigo`) |
| Dropdown bg | background | `--surface-base` |
| Dropdown border | border-color | `--border-subtle` |
| Dropdown text | color | `--ink-strong` |
| Dropdown label | color | `--ink-strong` |
| Badge success bg | background | `--success-bg` |
| Badge success text + dot | color | `--success-fg` |
| Badge neutral bg | background | `--neutral-bg` |
| Badge neutral text + dot | color | `--neutral-fg` |
| Metadata chip bg | background | `--info-bg` |
| Metadata chip text | color | `--info-fg` |
| Page background | background | `--surface-page` |
| Edit card background | background | `--surface-raised` |

## Open questions

- Exact hex values for every token flagged `**inferred**`. Figma dev mode would give them in one pass.
- Is Peasy's token file CSS custom properties, a JS object, Tailwind config, or something else? Determines how the design skill emits generated code.
- Dark-mode tokens — none observed. The admin reads as light-only; marketing is also light-only on peasy.be.
- Does the real system have a `--ink-inverse` for text-on-indigo, or does it just use `--surface-base`?

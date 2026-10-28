# Colors

> **Preliminary.** These values are extracted from the live site (peasy.be) and from an external brand-kit scrape, not from Peasy's frontend source code. Replace with imports from the real token file as soon as the frontend repo is cloned (`BLOCKERS.md` tracks this).

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

External brand-kit extractor (`../../../peasy.be-brand-kit.md`) returned a different primary (`#888EBF`) because the live site served it a 403. The browser-extracted indigo above is the real one — the one that reaches users.

## Status colors (ANB-1293)

For the Status badge on the Specifications page:

| Status | Color family |
| --- | --- |
| `Actief` | Green |
| `Niet actief` | Light grey |

Specific hex values live in Figma (node `5589-15528`). Not yet imported.

## Open questions

- Where does Peasy declare its tokens in the frontend repo — CSS custom properties, a JS object, a Tailwind config? Determines the import pattern the design skill uses.
- Is there a semantic layer (`--color-text`, `--color-surface`) above the palette layer? Preliminary rules use the raw hex; the real file should use semantic names.
- Do dark-mode tokens exist? The admin screen in Figma reads as light-only.

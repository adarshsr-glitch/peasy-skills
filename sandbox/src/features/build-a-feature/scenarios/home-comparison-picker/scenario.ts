import type { Scenario } from '../types';
import { Prototype } from './Prototype';

export const homeComparisonPicker: Scenario = {
  id: 'home-comparison-picker',
  label: {
    nl: 'Home · Verticale vergelijkingskiezer',
    en: 'Home · Vertical comparison picker',
  },
  shortLabel: { nl: 'Home kiezer', en: 'Home picker' },
  peasyUrl: 'https://peasy.be/',
  description: {
    nl: '"Wat wil je vergelijken?" kaart op peasy.be/ met 5 verticals.',
    en: '"Wat wil je vergelijken?" card on peasy.be/ with 5 verticals.',
  },
  vagueBrief: {
    nl: 'We moeten bezoekers op de homepage laten kiezen wat ze willen vergelijken — hypotheken, autoverzekeringen, brandverzekeringen, energie, schuldsaldoverzekeringen. Eén kaart, vijf rijen, elke rij leidt naar de juiste vertical.',
    en: "We need to let visitors on the homepage pick what they want to compare — mortgages, car insurance, fire insurance, energy, outstanding-balance insurance. One card, five rows, each takes them to the right vertical.",
  },
  questions: [
    {
      id: 'surface',
      prompt: {
        nl: 'Waar op de site moet deze kaart verschijnen?',
        en: 'Where across the site should this card appear?',
      },
      suggestions: {
        nl: ['Alleen op de homepage', 'Homepage + vertical landingspagina\'s', 'Elke pagina in de footer'],
        en: ['Homepage only', 'Homepage + vertical landing pages', 'Every page in the footer'],
      },
    },
    {
      id: 'default-vertical',
      prompt: {
        nl: 'Welke vertical moet eventueel visueel worden benadrukt?',
        en: 'Which vertical, if any, should be visually prioritized?',
      },
      suggestions: {
        nl: ['Hypothecaire lening', 'Geen — behandel ze allemaal gelijk', 'Degene met de beste huidige promo'],
        en: ['Hypothecaire lening', 'None — treat all equally', 'Whichever has the best current promo'],
      },
    },
    {
      id: 'tracking',
      prompt: {
        nl: 'Welk klik-tracking event moet afgaan als een bezoeker op een rij tikt?',
        en: 'What click-tracking event should fire when a visitor taps a row?',
      },
      suggestions: {
        nl: ['vertical_card_click met vertical naam', 'GA4 custom event', 'Geen tracking nodig voor nu'],
        en: ['vertical_card_click with vertical name', 'GA4 custom event', 'No tracking needed for now'],
      },
    },
    {
      id: 'content-source',
      prompt: {
        nl: 'Waar moeten de labels, iconen en doelroutes vandaan komen?',
        en: 'Where should the labels, icons, and target routes be sourced from?',
      },
      suggestions: {
        nl: ['Hardcoded in het component', 'CMS-beheerd contentblok', 'Gedeelde config JSON'],
        en: ['Hardcoded in the component', 'CMS-managed content block', 'Shared config JSON'],
      },
    },
    {
      id: 'mobile',
      prompt: {
        nl: 'Hoe moet de kaart zich gedragen op telefoonbreedte?',
        en: 'How should the card behave at phone width?',
      },
      suggestions: {
        nl: ['Rijen verticaal stapelen', 'Horizontale scroll carousel', 'Samenvouwen tot een dropdown'],
        en: ['Stack rows vertically', 'Horizontal scroll carousel', 'Collapse into a dropdown'],
      },
    },
  ],
  Prototype,
  generateMarkdown(answers) {
    const surface = answers.surface ?? '[open]';
    const defaultVertical = answers['default-vertical'] ?? '[open]';
    const tracking = answers.tracking ?? '[open]';
    const contentSource = answers['content-source'] ?? '[open]';
    const mobile = answers.mobile ?? '[open]';
    return [
      '# Home · Vertical comparison picker',
      '',
      '> ⚠️ Enriched from a brief; review `[open]` items before closing.',
      '',
      '## Summary',
      '',
      'A single card on the homepage lets visitors pick one of five Peasy verticals to start a comparison: Hypothecaire lening, Autoverzekering, Brandverzekering, Energie, Schuldsaldoverzekering. Each row shows an icon + label and routes to that vertical\'s landing page.',
      '',
      '## Scope',
      '',
      '### In scope',
      '',
      '- One card, five rows, cyan-tinted surface matching peasy.be/.',
      `- Surface placement: ${surface}.`,
      '- Each row is a tap target; routes to the vertical page.',
      '- Icon + label + right-arrow treatment per row.',
      '',
      '### Out of scope',
      '',
      '- Deep-linking into comparison flows (that\'s the vertical landing page\'s job).',
      '- Personalization based on prior visits.',
      '',
      '## User stories',
      '',
      '- As a **visitor**, I want to see all five Peasy verticals in one place so that I can start comparing without reading the whole homepage.',
      '- As a **PM**, I want the vertical list to be configurable so that promos and new verticals can be added without redeploying.',
      '',
      '## Acceptance criteria',
      '',
      '```gherkin',
      'Given a visitor is on the homepage',
      'When the "Wat wil je vergelijken?" card is rendered',
      'Then exactly five vertical rows are visible in the documented order',
      '  And each row shows an icon, a Dutch label, and a right-pointing chevron',
      '  And clicking a row navigates to that vertical\'s page',
      '```',
      '',
      '## Business rules',
      '',
      '- Default highlighted vertical: ' + defaultVertical,
      '- Vertical order (observable on peasy.be):',
      '  1. Hypothecaire lening → `/hypotheek/`',
      '  2. Autoverzekering → `/autoverzekering/`',
      '  3. Brandverzekering → `/brandverzekering/`',
      '  4. Energie → `/energie/`',
      '  5. Schuldsaldoverzekering → `/schuldsaldoverzekering/`',
      '',
      '## Analytics',
      '',
      `- ${tracking}`,
      '',
      '## Content & copy',
      '',
      `- Content source: ${contentSource}`,
      '- Labels (NL): "Hypothecaire lening", "Autoverzekering", "Brandverzekering", "Energie", "Schuldsaldoverzekering".',
      '',
      '## Visual spec',
      '',
      '- Card background: lavender surface (`--lavender`) with a thin cyan accent strip at the top edge.',
      '- Row surface: `--surface-base` with subtle shadow; hover lifts by 1px and reveals a chevron slide.',
      '- Icon treatment: circular container with cyan accent, indigo stroke icons.',
      '- Section heading: "Wat wil je vergelijken?" in Grold display font with a short subtitle beneath.',
      `- Phone-width behavior: ${mobile}`,
      '',
      '## Open questions',
      '',
      '- `[open]` — Confirm vertical ordering stays constant across campaigns.',
      '- `[open]` — Dark-mode treatment (peasy.be is light-only; verify.)',
      '',
      '## Dependencies',
      '',
      '- The five vertical landing pages (`/hypotheek/`, `/autoverzekering/`, `/brandverzekering/`, `/energie/`, `/schuldsaldoverzekering/`) already exist.',
      '',
      '---',
      '',
      '_Generated by Peasy Studio. Review every `[open]` before pasting into Jira._',
    ].join('\n');
  },
};

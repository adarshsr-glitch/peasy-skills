import type { Scenario } from '../types';
import { Prototype } from './Prototype';

export const helpPanel: Scenario = {
  id: 'help-panel',
  label: {
    nl: 'Help · "Hulp nodig?" contactpaneel',
    en: 'Help · "Hulp nodig?" contact panel',
  },
  shortLabel: { nl: 'Helppaneel', en: 'Help panel' },
  peasyUrl: 'https://peasy.be/',
  description: {
    nl: 'Mascotte + vier contacttegels (Bellen / Terugbellen / Afspraak / Mailen).',
    en: 'Mascot + four contact tiles (Bellen / Terugbellen / Afspraak / Mailen).',
  },
  vagueBrief: {
    nl: "Het 'Hulp nodig?'-paneel dat we overal op de site tonen. Mascotte links, vier contactopties rechts (bellen, terugbellen, afspraak boeken, mailen). Vier tegels in totaal.",
    en: "The 'Hulp nodig?' panel we show across the site. Mascot on the left, four contact options on the right (call, callback, book appointment, email). Four tiles total.",
  },
  questions: [
    {
      id: 'surfaces',
      prompt: {
        nl: 'Op welke pagina\'s moet dit paneel zichtbaar zijn?',
        en: 'Which surfaces should display this panel?',
      },
      suggestions: {
        nl: ['Footer van elke pagina', 'Alleen homepage + verticale pagina\'s', 'Alleen op vergelijkingsresultatenpagina\'s'],
        en: ['Every page footer', 'Homepage + vertical pages only', 'Only comparison result pages'],
      },
    },
    {
      id: 'routing',
      prompt: {
        nl: 'Wat moet elke tegel doen als erop getikt wordt?',
        en: 'What should each tile route to or trigger when tapped?',
      },
      suggestions: {
        nl: ['Open inline modaal per actie', 'Navigeer naar /contact met anker', 'Gebruik native tel:/mailto: links'],
        en: ['Open inline modal per action', 'Navigate to /contact with anchor', 'Trigger native tel:/mailto: links'],
      },
    },
    {
      id: 'phone',
      prompt: {
        nl: 'Welk telefoonnummer moet op de Bellen-tegel staan?',
        en: 'What phone number should appear on the Bellen tile?',
      },
      suggestions: {
        nl: ['03 501 22 22', 'Regionaal nummer op basis van bezoeker', 'Generiek 0800-nummer'],
        en: ['03 501 22 22', 'Regional number based on visitor', 'Generic 0800 number'],
      },
    },
    {
      id: 'mobile',
      prompt: {
        nl: 'Hoe moet het paneel zich aanpassen op telefoonbreedte?',
        en: 'How should the panel adapt at phone width?',
      },
      suggestions: {
        nl: ['Tegels in 2×2 raster stapelen', 'Enkele kolom, mascotte verborgen', 'Horizontale scroll van tegels'],
        en: ['Stack tiles 2×2 grid', 'Single column, mascot hidden', 'Horizontal scroll of tiles'],
      },
    },
  ],
  Prototype,
  generateMarkdown(answers) {
    const surfaces = answers.surfaces ?? '[open]';
    const routing = answers.routing ?? '[open]';
    const phone = answers.phone ?? '03 501 22 22';
    const mobile = answers.mobile ?? '[open]';
    return [
      '# Help · "Hulp nodig?" contact panel',
      '',
      '> ⚠️ Enriched from a brief; review `[open]` items before closing.',
      '',
      '## Summary',
      '',
      'A section on peasy.be surfaces the Peasy mascot alongside four contact options: `Bellen`, `Terugbellen`, `Afspraak plannen voor je hypotheek`, `Mailen`. Each option renders as a tile with icon + label + description + CTA.',
      '',
      '## Scope',
      '',
      '### In scope',
      '',
      '- Mascot illustration on the left.',
      '- Section heading "Hulp nodig?" + sub-heading "Ik sta voor je klaar!".',
      '- Four contact tiles with icons, Dutch labels, short descriptions, and primary CTAs.',
      '',
      '### Out of scope',
      '',
      '- The callback-request form (separate ticket).',
      '- Appointment booking (external calendar app).',
      '',
      '## User stories',
      '',
      '- As a **visitor stuck in a comparison flow**, I want obvious contact options so I can get a human instead of giving up.',
      '',
      '## Acceptance criteria',
      '',
      '```gherkin',
      'Given the visitor is on a surface that shows the help panel',
      'When the panel is rendered',
      'Then four contact tiles are visible: Bellen, Terugbellen, Afspraak plannen, Mailen',
      '  And each tile has its own icon, label, description, and CTA button',
      '  And the Bellen tile shows the phone number as its description',
      '```',
      '',
      '## Business rules',
      '',
      `- Shown on surfaces: ${surfaces}`,
      `- Tile routing: ${routing}`,
      `- Phone number shown on Bellen tile: ${phone}`,
      `- Phone-width adaptation: ${mobile}`,
      '',
      '## Visual spec',
      '',
      '- Two-column layout on desktop: mascot left (~35%), tiles right (~65%).',
      '- Section eyebrow and heading in Grold.',
      '- Each tile: light surface, soft shadow, indigo icon circle, title + muted description + indigo CTA button.',
      '',
      '## Open questions',
      '',
      '- `[open]` — Mascot variant: do different pages use different poses, or is there a single canonical pose?',
      '',
      '## Dependencies',
      '',
      '- Mascot asset.',
      '- Callback request form, appointment booking integration, contact form (all separate tickets).',
      '',
      '---',
      '',
      '_Generated by Peasy Studio. Review every `[open]` before pasting into Jira._',
    ].join('\n');
  },
};

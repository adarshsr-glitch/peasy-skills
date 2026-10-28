import type { Scenario } from '../types';
import { Prototype } from './Prototype';

export const energyStarter: Scenario = {
  id: 'energy-starter',
  label: {
    nl: 'Energie · Elektriciteit / Gas / Beide starter',
    en: 'Energy · Electricity / Gas / Both starter',
  },
  shortLabel: { nl: 'Energie starter', en: 'Energy starter' },
  peasyUrl: 'https://peasy.be/energie/',
  description: {
    nl: 'Drie-optie kaart van peasy.be/energie/ om de vergelijkingsflow te starten.',
    en: 'Three-option card from peasy.be/energie/ to kick off the comparison flow.',
  },
  vagueBrief: {
    nl: "Op de Energie-pagina hebben we een snelle kaart nodig waar de gebruiker kiest of ze elektriciteit, gas of beide vergelijken — en dan op 'Volgende' klikt om door te gaan naar de echte vergelijkingsflow.",
    en: "On the Energy page, we need a quick card where the user picks whether they're comparing electricity, gas, or both — then hits 'Volgende' to continue into the real comparison flow.",
  },
  questions: [
    {
      id: 'default-selection',
      prompt: {
        nl: 'Welke optie moet eventueel voorgeselecteerd zijn wanneer de kaart laadt?',
        en: 'Which option, if any, should be preselected when the card loads?',
      },
      suggestions: {
        nl: ['Elektriciteit en gas', 'Geen standaard — verplicht een keuze', 'Elektriciteit'],
        en: ['Elektriciteit en gas', 'No default — force a choice', 'Elektriciteit'],
      },
    },
    {
      id: 'next-flow',
      prompt: {
        nl: "Waar moet 'Volgende' naartoe leiden voor elke geselecteerde optie?",
        en: "What should 'Volgende' route to for each selected option?",
      },
      suggestions: {
        nl: ['Hetzelfde stappenformulier, gefilterd', 'Apart traject per optie', 'Eén flow — optie als parameter'],
        en: ['Same stepped form, filtered', 'Separate flow per option', 'One flow — option passed as param'],
      },
    },
    {
      id: 'edge-cases',
      prompt: {
        nl: 'Hoe moet de flow omgaan met bezoekers die alleen een van de twee gebruiken?',
        en: 'How should the flow handle visitors who only consume one of the two?',
      },
      suggestions: {
        nl: ['Verberg de velden van de andere optie', 'Toon alle velden, markeer als optioneel', 'Vraag opnieuw halverwege om te bevestigen'],
        en: ['Hide the other option\'s fields', 'Show all fields, mark optional', 'Ask again mid-flow to confirm'],
      },
    },
    {
      id: 'copy',
      prompt: {
        nl: 'Beperkingen voor de tekst of iconografie op de tegels — Nederlandse en Franse labels, specifieke terminologie?',
        en: 'Any constraints on the tile copy or iconography — Dutch and French labels, specific terminology?',
      },
      suggestions: {
        nl: ['Alleen Nederlands voor nu', 'Nederlands + Frans naast elkaar', 'Volg bestaande peasy.be terminologie'],
        en: ['Dutch only for now', 'Dutch + French side-by-side', 'Follow existing peasy.be terminology'],
      },
    },
  ],
  Prototype,
  generateMarkdown(answers) {
    const def = answers['default-selection'] ?? '[open]';
    const next = answers['next-flow'] ?? '[open]';
    const edge = answers['edge-cases'] ?? '[open]';
    const copy = answers.copy ?? '[open]';
    return [
      '# Energy · Electricity / Gas / Both starter',
      '',
      '> ⚠️ Enriched from a brief; review `[open]` items before closing.',
      '',
      '## Summary',
      '',
      'A compact card on `peasy.be/energie/` lets the visitor pick what they\'re comparing — electricity only, gas only, or both — then press "Volgende" to proceed into the full comparison flow.',
      '',
      '## Scope',
      '',
      '### In scope',
      '',
      '- Three selectable option tiles: `Elektriciteit`, `Gas`, `Elektriciteit en gas`.',
      '- "Volgende" primary button, enabled once an option is picked (or always enabled if a default is set).',
      '- Lightning / flame iconography on the energy tiles.',
      '',
      '### Out of scope',
      '',
      '- The downstream comparison flow (separate ticket).',
      '- Capturing household details — happens later in the flow.',
      '',
      '## User stories',
      '',
      '- As a **visitor comparing energy**, I want to say up front whether I\'m comparing electricity, gas, or both, so I don\'t waste time on the wrong fields later.',
      '',
      '## Acceptance criteria',
      '',
      '```gherkin',
      'Given the visitor lands on /energie/',
      'When the starter card is rendered',
      'Then three option tiles are visible: Elektriciteit, Gas, Elektriciteit en gas',
      '  And exactly one is selectable at a time',
      '  And the "Volgende" button advances to the comparison flow',
      '```',
      '',
      '## Business rules',
      '',
      `- Default selection: ${def}`,
      `- Routing after "Volgende": ${next}`,
      `- Edge cases: ${edge}`,
      `- Copy and iconography constraints: ${copy}`,
      '',
      '## Visual spec',
      '',
      '- Section heading: "Wat wil je vergelijken?" (Grold).',
      '- Three option tiles, equal width in a row, with a lightning-glyph circle on the left.',
      '- Selected tile: indigo border + light-indigo tint.',
      '- Unselected: white, subtle grey border.',
      '- "Volgende" primary button, pill-shaped, indigo bg, right-aligned.',
      '',
      '## Open questions',
      '',
      '- `[open]` — Behavior if the visitor arrives via a vertical-specific CTA (should the matching tile pre-select?).',
      '',
      '## Dependencies',
      '',
      '- `/energie/` landing page already exists.',
      '',
      '---',
      '',
      '_Generated by Peasy Studio. Review every `[open]` before pasting into Jira._',
    ].join('\n');
  },
};

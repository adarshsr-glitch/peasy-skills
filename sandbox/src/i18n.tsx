import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'nl' | 'en';

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const Ctx = createContext<LangCtx>({
  lang: 'nl',
  setLang: () => {},
  t: (k) => k,
});

const dict: Record<string, Record<Lang, string>> = {
  // --- Navigation ---
  'nav.dashboard':       { nl: 'Dashboard',          en: 'Dashboard' },
  'nav.build':           { nl: 'Bouw een feature',   en: 'Build a feature' },
  'nav.history':         { nl: 'Geschiedenis',        en: 'History' },
  'nav.settings':        { nl: 'Instellingen',        en: 'Settings' },
  'nav.soon':            { nl: 'binnenkort',           en: 'soon' },

  // --- Dashboard home ---
  'home.title':          { nl: 'Wat ship je vandaag?',                             en: 'What are you shipping today?' },
  'home.lede':           { nl: 'Peasy Studio maakt van een idee van twee regels een Jira-ticket en een werkend prototype dat eruitziet zoals Peasy nu al is. Kies een feature om de pipeline te zien draaien.',
                           en: 'Peasy Studio turns a two-line idea into a Jira ticket and a working prototype that matches how Peasy already looks. Pick a feature to see the pipeline run.' },
  'home.cta':            { nl: 'Bouw een feature →',  en: 'Build a feature →' },
  'home.stat.features':  { nl: 'Features in demo',    en: 'Features in demo' },
  'home.stat.components':{ nl: 'Pack componenten',     en: 'Pack components' },
  'home.stat.tokens':    { nl: 'Tokens gedefinieerd',  en: 'Tokens defined' },

  // --- Coming soon ---
  'coming-soon':         { nl: 'Nog niet beschikbaar. Alleen "Bouw een feature" is actief in deze demo.',
                           en: 'Not wired up yet. Only "Build a feature" is live in this demo.' },

  // --- Build a feature ---
  'build.eyebrow':       { nl: 'Bouw een feature',                                   en: 'Build a feature' },
  'build.title':         { nl: 'Van een briefing naar een ticket en prototype',        en: 'Turn a brief into a ticket and a prototype' },
  'build.lede':          { nl: 'Open een tab, beschrijf de feature in een regel of twee, en Studio vraagt wat het nodig heeft voordat het een Jira-ticket en een werkend prototype opstelt dat je kunt delen met design en engineering.',
                           en: 'Open a tab, describe the feature in a line or two, and Studio asks what it needs before drafting a Jira ticket and a working prototype you can share with design and engineering.' },
  'build.ticket-ready':  { nl: 'Ticket klaar',        en: 'Ticket ready' },
  'build.in-progress':   { nl: 'Bezig',                en: 'In progress' },
  'build.empty.title':   { nl: 'Open een tab hierboven om te beginnen',               en: 'Open a tab above to begin' },
  'build.empty.desc':    { nl: 'Elke tab opent een korte brainstorm. Beschrijf de feature, beantwoord een paar vervolgvragen en bekijk het ticket en prototype naast elkaar.',
                           en: 'Each tab opens a short brainstorm. Describe the feature, answer a few follow-ups, then review the ticket and prototype side by side.' },

  // --- Scenario tab ---
  'tab.start-over':      { nl: 'Opnieuw beginnen',    en: 'Start over' },

  // --- Scenario chat ---
  'chat.greeting':       { nl: 'Bedankt — een paar vervolgvragen zodat het ticket en prototype precies worden zoals je wilt.',
                           en: 'Thanks — a few follow-ups so the ticket and prototype come out the way you want.' },
  'chat.intro':          { nl: 'Beschrijf de feature die je wilt bouwen. Voor deze demo is de prompt al ingevuld — druk op Enter om te versturen, of pas het eerst aan.',
                           en: "Describe the feature you'd like to build. For this demo the prompt is prefilled — press Enter to send, or edit it first." },
  'chat.intro-blank':    { nl: 'Begin met het beschrijven van de feature die je wilt bouwen. Daarna stel ik een paar vervolgvragen om de scope aan te scherpen.',
                           en: 'Start by describing the feature you want to build. I\'ll ask a few follow-ups to tighten the scope.' },
  'chat.describe':       { nl: 'Beschrijf de feature', en: 'Describe the feature' },
  'chat.question-of':    { nl: 'Vraag {n} van {total}', en: 'Question {n} of {total}' },
  'chat.all-answered':   { nl: 'Alles beantwoord',     en: 'All answered' },
  'chat.send':           { nl: 'Verstuur',              en: 'Send' },
  'chat.finish':         { nl: 'Afronden & ticket opstellen', en: 'Finish & draft ticket' },
  'chat.placeholder':    { nl: 'Typ je antwoord… Enter om te versturen, Shift+Enter voor een nieuwe regel.',
                           en: 'Type your reply… Enter to send, Shift+Enter for a newline.' },

  // --- Scenario output ---
  'output.jira-eyebrow': { nl: 'Jira concept',        en: 'Jira draft' },
  'output.jira-title':   { nl: 'Ticket inhoud',       en: 'Ticket body' },
  'output.copy':         { nl: 'Kopieer markdown',    en: 'Copy markdown' },
  'output.copied':       { nl: 'Gekopieerd ✓',        en: 'Copied ✓' },
  'output.proto-eyebrow':{ nl: 'Prototype',            en: 'Prototype' },
  'output.proto-title':  { nl: 'Live preview',         en: 'Live preview' },

  // --- Prototype: auto quickform ---
  'auto.heading':        { nl: 'Vind je autoverzekering',                                    en: 'Find your car insurance' },
  'auto.subheading':     { nl: 'Vul drie velden in en we vergelijken de aanbieders voor je.', en: "Fill in three fields and we'll compare providers for you." },
  'auto.year':           { nl: 'Bouwjaar',             en: 'Year of make' },
  'auto.brand':          { nl: 'Merk',                  en: 'Brand' },
  'auto.fuel':           { nl: 'Type brandstof',        en: 'Fuel type' },
  'auto.choose':         { nl: 'Maak je keuze',         en: 'Choose' },
  'auto.helper':         { nl: 'Alle velden zijn vereist. Je gegevens worden niet opgeslagen.', en: 'All fields are required. Your data is not stored.' },
  'auto.submit':         { nl: 'Vergelijk',             en: 'Compare' },
  'auto.fuel.benzine':   { nl: 'Benzine',               en: 'Petrol' },
  'auto.fuel.diesel':    { nl: 'Diesel',                 en: 'Diesel' },
  'auto.fuel.hybride':   { nl: 'Hybride',               en: 'Hybrid' },
  'auto.fuel.elektrisch':{ nl: 'Elektrisch',             en: 'Electric' },
  'auto.fuel.lpg':       { nl: 'LPG',                    en: 'LPG' },
  'auto.fuel.cng':       { nl: 'CNG',                    en: 'CNG' },

  // --- Prototype: energy starter ---
  'energy.heading':      { nl: 'Wat wil je vergelijken?',        en: 'What do you want to compare?' },
  'energy.subheading':   { nl: 'Kies elektriciteit, gas of beide.', en: 'Choose electricity, gas, or both.' },
  'energy.electricity':  { nl: 'Elektriciteit',                   en: 'Electricity' },
  'energy.gas':          { nl: 'Gas',                              en: 'Gas' },
  'energy.both':         { nl: 'Elektriciteit en gas',             en: 'Electricity and gas' },
  'energy.next':         { nl: 'Volgende',                         en: 'Next' },

  // --- Prototype: home comparison picker ---
  'picker.heading':      { nl: 'Wat wil je vergelijken?',         en: 'What do you want to compare?' },
  'picker.subheading':   { nl: 'Kies een vertical om te starten.', en: 'Choose a vertical to get started.' },
  'picker.mortgage':     { nl: 'Hypothecaire lening',              en: 'Mortgage loan' },
  'picker.auto':         { nl: 'Autoverzekering',                  en: 'Car insurance' },
  'picker.fire':         { nl: 'Brandverzekering',                 en: 'Fire insurance' },
  'picker.energy':       { nl: 'Energie',                           en: 'Energy' },
  'picker.life':         { nl: 'Schuldsaldoverzekering',           en: 'Outstanding balance insurance' },

  // --- Prototype: blank new feature ---
  'blank.badge':         { nl: 'Prototype',                      en: 'Prototype' },
  'blank.heading':       { nl: 'Backend nodig voor dit stuk',    en: 'Backend needed for this part' },
  'blank.body':          { nl: 'Studio kan uit elke briefing een ticket schetsen, maar het prototype-voorbeeld bindt aan een vorm (home picker, auto-formulier, …). Zonder backend die vanaf nul een layout kan genereren, toont dit vak een eerlijke placeholder — in productie zou het uit de build-pipeline komen.',
                           en: 'Studio can draft a ticket from any brief, but the prototype preview binds to a known shape (home picker, auto form, …). Without a backend to generate a layout from scratch, this slot renders an honest placeholder — in production it would come from the build pipeline.' },

  // --- Prototype: help panel ---
  'help.eyebrow':        { nl: 'Hulp nodig?',                     en: 'Need help?' },
  'help.heading':        { nl: 'Ik sta voor je klaar!',            en: "I'm here for you!" },
  'help.call.title':     { nl: 'Bellen',                           en: 'Call' },
  'help.call.desc':      { nl: '03 501 22 22',                     en: '03 501 22 22' },
  'help.call.cta':       { nl: 'Bellen',                           en: 'Call now' },
  'help.cb.title':       { nl: 'Terugbellen',                      en: 'Call back' },
  'help.cb.desc':        { nl: 'Wij bellen je op wanneer het jou uitkomt', en: "We'll call you when it suits you" },
  'help.cb.cta':         { nl: 'Terugbellen',                      en: 'Request call' },
  'help.apt.title':      { nl: 'Afspraak plannen',                 en: 'Plan appointment' },
  'help.apt.desc':       { nl: 'Boek een gesprek in de agenda van een expert.', en: "Book a conversation in an expert's calendar." },
  'help.apt.cta':        { nl: 'Plannen',                           en: 'Book' },
  'help.mail.title':     { nl: 'Mailen',                            en: 'Email' },
  'help.mail.desc':      { nl: 'Vul ons contactformulier in',       en: 'Fill in our contact form' },
  'help.mail.cta':       { nl: 'Mailen',                            en: 'Send email' },
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('nl');

  function t(key: string, vars?: Record<string, string | number>): string {
    const entry = dict[key];
    let text = entry ? entry[lang] : key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

import type { ComponentType } from 'react';

export type Bilingual = { nl: string; en: string };
export type BilingualList = { nl: readonly string[]; en: readonly string[] };

export type ScenarioQuestion = {
  id: string;
  prompt: Bilingual;
  suggestions?: BilingualList;
};

export type ScenarioAnswers = Record<string, string>;

export type Scenario = {
  id: string;
  label: Bilingual;
  shortLabel: Bilingual;
  peasyUrl: string;
  description: Bilingual;
  vagueBrief: Bilingual;
  questions: ReadonlyArray<ScenarioQuestion>;
  generateMarkdown: (answers: ScenarioAnswers) => string;
  Prototype: ComponentType;
};

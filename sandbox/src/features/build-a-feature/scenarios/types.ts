import type { ComponentType } from 'react';

export type ScenarioQuestion = {
  id: string;
  prompt: string;
};

export type ScenarioAnswers = Record<string, string>;

export type Scenario = {
  id: string;
  label: string;
  shortLabel: string;
  peasyUrl: string;
  description: string;
  vagueBrief: string;
  questions: ReadonlyArray<ScenarioQuestion>;
  generateMarkdown: (answers: ScenarioAnswers) => string;
  Prototype: ComponentType;
};

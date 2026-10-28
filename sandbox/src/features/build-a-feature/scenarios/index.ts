import { autoQuickform } from './auto-quickform/scenario';
import { blankNewFeature } from './blank-new-feature/scenario';
import { energyStarter } from './energy-starter/scenario';
import { helpPanel } from './help-panel/scenario';
import { homeComparisonPicker } from './home-comparison-picker/scenario';
import type { Scenario } from './types';

export const scenarios: ReadonlyArray<Scenario> = [
  homeComparisonPicker,
  energyStarter,
  autoQuickform,
  helpPanel,
  blankNewFeature,
];

export function findScenario(id: string | null | undefined): Scenario | undefined {
  if (!id) return undefined;
  return scenarios.find((s) => s.id === id);
}

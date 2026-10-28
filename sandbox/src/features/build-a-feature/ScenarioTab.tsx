import { ScenarioChat } from './ScenarioChat';
import { ScenarioOutput } from './ScenarioOutput';
import type { Scenario } from './scenarios/types';
import styles from './ScenarioTab.module.css';

type TabState = {
  cursor: number;
  answers: Record<string, string>;
  draft: string;
  done: boolean;
};

type ScenarioTabProps = {
  scenario: Scenario;
  state: TabState;
  onUpdate: (next: Partial<TabState>) => void;
  onReset: () => void;
};

export function ScenarioTab({ scenario, state, onUpdate, onReset }: ScenarioTabProps) {
  return (
    <div className={styles.tab}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{scenario.label}</h2>
          <p className={styles.meta}>
            Mirrors{' '}
            <a href={scenario.peasyUrl} target="_blank" rel="noreferrer" className={styles.link}>
              {scenario.peasyUrl.replace(/^https?:\/\//, '')}
            </a>
          </p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.resetBtn} onClick={onReset}>
            Start over
          </button>
        </div>
      </div>

      {state.done ? (
        <ScenarioOutput scenario={scenario} answers={state.answers} />
      ) : (
        <ScenarioChat scenario={scenario} state={state} onUpdate={onUpdate} />
      )}
    </div>
  );
}

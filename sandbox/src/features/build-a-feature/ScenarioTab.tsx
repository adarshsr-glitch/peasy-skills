import { useLang } from '../../i18n';
import { ScenarioChat } from './ScenarioChat';
import { ScenarioOutput } from './ScenarioOutput';
import type { Scenario } from './scenarios/types';
import styles from './ScenarioTab.module.css';

type TabState = {
  briefSent: boolean;
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
  const { lang, t } = useLang();
  return (
    <div className={styles.tab}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{scenario.label[lang]}</h2>
          <p className={styles.meta}>{scenario.description[lang]}</p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.resetBtn} onClick={onReset}>
            {t('tab.start-over')}
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

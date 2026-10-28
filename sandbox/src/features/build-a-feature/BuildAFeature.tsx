import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n';
import { scenarios, findScenario } from './scenarios';
import type { Scenario } from './scenarios/types';
import { ScenarioTab } from './ScenarioTab';
import styles from './BuildAFeature.module.css';

type BuildAFeatureProps = {
  activeScenarioId: string | null;
  onSelect: (id: string) => void;
};

type TabState = {
  briefSent: boolean;
  cursor: number;
  answers: Record<string, string>;
  draft: string;
  done: boolean;
};

const freshTab = (brief = ''): TabState => ({
  briefSent: false,
  cursor: 0,
  answers: {},
  draft: brief,
  done: false,
});

export function BuildAFeature({ activeScenarioId, onSelect }: BuildAFeatureProps) {
  const { lang, t } = useLang();
  const [tabStates, setTabStates] = useState<Record<string, TabState>>({});
  const openedRef = useRef<Set<string>>(new Set());

  const active = findScenario(activeScenarioId);

  useEffect(() => {
    if (active && !openedRef.current.has(active.id)) {
      openedRef.current.add(active.id);
      setTabStates((prev) => ({ ...prev, [active.id]: freshTab(active.vagueBrief[lang]) }));
    }
  }, [active, lang]);

  function updateTab(id: string, next: Partial<TabState>) {
    setTabStates((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? freshTab()), ...next },
    }));
  }

  function resetTab(id: string) {
    const scenario = findScenario(id);
    setTabStates((prev) => ({
      ...prev,
      [id]: freshTab(scenario?.vagueBrief[lang] ?? ''),
    }));
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>{t('build.eyebrow')}</span>
          <h1 className={styles.title}>{t('build.title')}</h1>
          <p className={styles.lede}>{t('build.lede')}</p>
        </div>
      </header>

      <nav className={styles.tabs} role="tablist">
        {scenarios.map((s) => {
          const state = tabStates[s.id];
          const touched = openedRef.current.has(s.id);
          const isActive = active?.id === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => onSelect(s.id)}
            >
              <span className={styles.tabLabel}>{s.shortLabel[lang]}</span>
              {state?.done ? (
                <span className={styles.tabBadge}>{t('build.ticket-ready')}</span>
              ) : touched && state && state.cursor > 0 ? (
                <span className={styles.tabBadgeMuted}>{t('build.in-progress')}</span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <section className={styles.content}>
        {active ? (
          <ScenarioTab
            key={active.id}
            scenario={active as Scenario}
            state={tabStates[active.id] ?? freshTab()}
            onUpdate={(next) => updateTab(active.id, next)}
            onReset={() => resetTab(active.id)}
          />
        ) : (
          <ScenarioEmpty onSelect={onSelect} />
        )}
      </section>
    </div>
  );
}

function ScenarioEmpty({ onSelect: _onSelect }: { onSelect: (id: string) => void }) {
  const { t } = useLang();
  return (
    <div className={styles.empty}>
      <h2>{t('build.empty.title')}</h2>
      <p>{t('build.empty.desc')}</p>
    </div>
  );
}

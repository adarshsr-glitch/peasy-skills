import { useEffect, useRef, useState } from 'react';
import { scenarios, findScenario } from './scenarios';
import type { Scenario } from './scenarios/types';
import { ScenarioTab } from './ScenarioTab';
import styles from './BuildAFeature.module.css';

type BuildAFeatureProps = {
  activeScenarioId: string | null;
  onSelect: (id: string) => void;
};

// Each tab's state is kept in a Map so switching between tabs preserves
// chat progress and output.
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
  const [tabStates, setTabStates] = useState<Record<string, TabState>>({});
  const openedRef = useRef<Set<string>>(new Set());

  const active = findScenario(activeScenarioId);

  useEffect(() => {
    if (active && !openedRef.current.has(active.id)) {
      openedRef.current.add(active.id);
      setTabStates((prev) => ({ ...prev, [active.id]: freshTab(active.vagueBrief) }));
    }
  }, [active]);

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
      [id]: freshTab(scenario?.vagueBrief ?? ''),
    }));
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Build a feature</span>
          <h1 className={styles.title}>Turn a brief into a ticket and a prototype</h1>
          <p className={styles.lede}>
            Open a tab, describe the feature in a line or two, and Studio asks what it needs before drafting a Jira ticket and a working prototype you can share with design and engineering.
          </p>
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
              <span className={styles.tabLabel}>{s.shortLabel}</span>
              {state?.done ? (
                <span className={styles.tabBadge}>Ticket ready</span>
              ) : touched && state && state.cursor > 0 ? (
                <span className={styles.tabBadgeMuted}>In progress</span>
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
  return (
    <div className={styles.empty}>
      <h2>Open a tab above to begin</h2>
      <p>
        Each tab opens a short brainstorm. Describe the feature, answer a few
        follow-ups, then review the ticket and prototype side by side.
      </p>
    </div>
  );
}

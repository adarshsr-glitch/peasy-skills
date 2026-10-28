import { useState } from 'react';
import { Button } from '../../components/Button';
import type { Scenario } from './scenarios/types';
import styles from './ScenarioOutput.module.css';

type ScenarioOutputProps = {
  scenario: Scenario;
  answers: Record<string, string>;
};

export function ScenarioOutput({ scenario, answers }: ScenarioOutputProps) {
  const [copied, setCopied] = useState(false);
  const markdown = scenario.generateMarkdown(answers);
  const Prototype = scenario.Prototype;

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard refused — leave content selectable in the pre.
    }
  }

  return (
    <div className={styles.output}>
      <div className={styles.panels}>
        <section className={styles.jiraPanel}>
          <header className={styles.panelHeader}>
            <div>
              <span className={styles.panelEyebrow}>Jira draft</span>
              <h3 className={styles.panelTitle}>Ticket body</h3>
            </div>
            <Button variant="primary" onClick={copy}>
              {copied ? 'Copied ✓' : 'Copy markdown'}
            </Button>
          </header>
          <pre className={styles.markdown}>{markdown}</pre>
        </section>

        <section className={styles.previewPanel}>
          <header className={styles.panelHeader}>
            <div>
              <span className={styles.panelEyebrow}>Prototype</span>
              <h3 className={styles.panelTitle}>Peasy-styled replica</h3>
            </div>
            <a
              href={scenario.peasyUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.openLive}
            >
              Open live for diff ↗
            </a>
          </header>
          <div className={styles.previewFrame}>
            <Prototype />
          </div>
        </section>
      </div>
    </div>
  );
}

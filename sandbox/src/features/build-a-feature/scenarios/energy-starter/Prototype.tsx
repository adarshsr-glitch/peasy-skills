import { useState } from 'react';
import styles from './Prototype.module.css';

// Peasy mapping: appears on peasy.be/energie/ above the fold. Uses a radio-
// group semantic but renders as three equal-width tiles with iconography.
// Pack components reused: tokens; option-tile composition is scenario-local.

type OptionId = 'electricity' | 'gas' | 'both';

const options: ReadonlyArray<{ id: OptionId; label: string; icon: () => JSX.Element }> = [
  { id: 'electricity', label: 'Elektriciteit', icon: BoltIcon },
  { id: 'gas', label: 'Gas', icon: FlameIcon },
  { id: 'both', label: 'Elektriciteit en gas', icon: BoltFlameIcon },
];

export function Prototype() {
  const [selected, setSelected] = useState<OptionId | null>(null);
  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Wat wil je vergelijken?</h2>
        <div className={styles.options} role="radiogroup">
          {options.map((o) => {
            const active = selected === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`${styles.option} ${active ? styles.optionActive : ''}`}
                onClick={() => setSelected(o.id)}
              >
                <span className={styles.optionIcon}><o.icon /></span>
                <span className={styles.optionLabel}>{o.label}</span>
              </button>
            );
          })}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.next}
            disabled={!selected}
          >
            Volgende
          </button>
        </div>
      </div>
    </div>
  );
}

function BoltIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 2-5 1 2 2 3 2 5 0-3-2-5 0-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M8 14a4 4 0 0 0 8 0c0 4-2 7-4 7s-4-3-4-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

function BoltFlameIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 2L4 10h5l-2 6 7-8h-5l2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M15 10c1 1 3 3 3 6a3 3 0 1 1-6 0c0-2 1-3 2-4 .5 1 1 1.5 1 3 0-2-1-3 0-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

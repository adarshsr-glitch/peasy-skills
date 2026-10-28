import { useState } from 'react';
import { useLang } from '../../../../i18n';
import styles from './Prototype.module.css';

type OptionId = 'electricity' | 'gas' | 'both';

export function Prototype() {
  const { t } = useLang();
  const [selected, setSelected] = useState<OptionId | null>(null);

  const options: ReadonlyArray<{ id: OptionId; label: string; icon: () => JSX.Element }> = [
    { id: 'electricity', label: t('energy.electricity'), icon: BoltIcon },
    { id: 'gas', label: t('energy.gas'), icon: FlameIcon },
    { id: 'both', label: t('energy.both'), icon: BoltFlameIcon },
  ];

  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>{t('energy.heading')}</h2>
          <p className={styles.subheading}>{t('energy.subheading')}</p>
        </div>
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
                {active && (
                  <span className={styles.checkBadge} aria-hidden="true">
                    <CheckIcon />
                  </span>
                )}
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
            {t('energy.next')}
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

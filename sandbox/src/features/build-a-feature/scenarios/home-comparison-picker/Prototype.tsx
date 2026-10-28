import styles from './Prototype.module.css';

// Peasy mapping: this card renders on peasy.be/ as the primary comparison
// entry point. Composition: Peasy indigo heading in Grold, cyan-tinted card,
// five rows each with an icon circle + label + right-arrow button.
// Pack components reused: visual tokens only; the row composition is
// scenario-specific and lives here.

type Vertical = {
  id: string;
  label: string;
  href: string;
  Icon: () => JSX.Element;
};

const verticals: ReadonlyArray<Vertical> = [
  { id: 'mortgage', label: 'Hypothecaire lening', href: 'https://peasy.be/hypotheek/', Icon: HouseIcon },
  { id: 'auto', label: 'Autoverzekering', href: 'https://peasy.be/autoverzekering/', Icon: CarIcon },
  { id: 'fire', label: 'Brandverzekering', href: 'https://peasy.be/brandverzekering/', Icon: HouseFireIcon },
  { id: 'energy', label: 'Energie', href: 'https://peasy.be/energie/', Icon: PlugIcon },
  { id: 'life', label: 'Schuldsaldoverzekering', href: 'https://peasy.be/schuldsaldoverzekering/', Icon: ShieldIcon },
];

export function Prototype() {
  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>Wat wil je vergelijken?</h2>
          <p className={styles.subheading}>Kies een vertical om te starten.</p>
        </div>
        <ul className={styles.list}>
          {verticals.map((v) => (
            <li key={v.id}>
              <a href={v.href} target="_blank" rel="noreferrer" className={styles.row}>
                <span className={styles.iconCircle} aria-hidden="true">
                  <v.Icon />
                </span>
                <span className={styles.label}>{v.label}</span>
                <span className={styles.chevron} aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HouseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 14l1.6-4.5A2 2 0 0 1 6.5 8h11a2 2 0 0 1 1.9 1.5L21 14v4h-2v-1H5v1H3v-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="15.5" r="1.2" fill="currentColor" />
      <circle cx="17" cy="15.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function HouseFireIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1h-6v-7l-3 3 1-5-3 3V20H5a1 1 0 0 1-1-1v-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 1 1-10 0V7zM12 16v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

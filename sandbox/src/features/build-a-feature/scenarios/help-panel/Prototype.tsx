import styles from './Prototype.module.css';

// Peasy mapping: the 'Hulp nodig?' section visible on peasy.be/ (bottom
// mid-page). Mascot + four contact tiles. Mascot illustration is a
// stylized stand-in; swap for Peasy's real asset on port.

const tiles = [
  {
    id: 'bellen',
    icon: PhoneIcon,
    title: 'Bellen',
    description: '03 501 22 22',
    cta: 'Bellen',
    href: 'tel:+3235012222',
  },
  {
    id: 'terugbellen',
    icon: CallbackIcon,
    title: 'Terugbellen',
    description: 'Wij bellen je op wanneer het jou uitkomt',
    cta: 'Terugbellen',
    href: '#',
  },
  {
    id: 'afspraak',
    icon: CalendarIcon,
    title: 'Afspraak plannen',
    description: 'Boek een gesprek in de agenda van een expert.',
    cta: 'Plannen',
    href: '#',
  },
  {
    id: 'mailen',
    icon: MailIcon,
    title: 'Mailen',
    description: 'Vul ons contactformulier in',
    cta: 'Mailen',
    href: '#',
  },
] as const;

export function Prototype() {
  return (
    <div className={styles.frame}>
      <div className={styles.panel}>
        <aside className={styles.mascotCol}>
          <PeasyMascot />
          <span className={styles.eyebrow}>Hulp nodig?</span>
          <h2 className={styles.heading}>Ik sta voor je klaar!</h2>
        </aside>
        <div className={styles.tiles}>
          {tiles.map((t) => (
            <article key={t.id} className={styles.tile}>
              <span className={styles.tileIcon}><t.icon /></span>
              <div className={styles.tileBody}>
                <h3 className={styles.tileTitle}>{t.title}</h3>
                <p className={styles.tileDesc}>{t.description}</p>
              </div>
              <a href={t.href} className={styles.tileCta}>{t.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function PeasyMascot() {
  // Stylized stand-in for the Peasy mascot. The real asset is a hairy blue
  // creature with a smile; this is a placeholder blob with the same spirit.
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className={styles.mascot} aria-hidden="true">
      <ellipse cx="80" cy="120" rx="56" ry="14" fill="#394295" opacity="0.1" />
      <path
        d="M80 20c-28 0-52 18-52 48 0 24 20 44 52 48 32-4 52-24 52-48 0-30-24-48-52-48z"
        fill="#394295"
      />
      <path d="M38 56c-6 2-8 10-6 14M122 56c6 2 8 10 6 14" stroke="#394295" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="82" r="12" fill="#ffffff" />
      <circle cx="100" cy="82" r="12" fill="#ffffff" />
      <circle cx="62" cy="84" r="5" fill="#394295" />
      <circle cx="102" cy="84" r="5" fill="#394295" />
      <circle cx="63" cy="83" r="1.6" fill="#ffffff" />
      <circle cx="103" cy="83" r="1.6" fill="#ffffff" />
      <path d="M60 102c6 6 34 6 40 0" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Hairy edges */}
      <g stroke="#394295" strokeWidth="3" strokeLinecap="round">
        <path d="M30 36l-6-6M28 50l-8-2M30 70l-8 2M34 86l-8 4M44 102l-6 6M58 112l-4 8" />
        <path d="M130 36l6-6M132 50l8-2M130 70l8 2M126 86l8 4M116 102l6 6M102 112l4 8" />
        <path d="M70 20l-2-8M80 18l0-10M90 20l2-8" />
      </g>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 5c0-1 1-2 2-2h2.5l2 5-2 1c1 3 3 5 6 6l1-2 5 2V18c0 1-1 2-2 2-9 0-16-7-16-15z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

function CallbackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 5c0-1 1-2 2-2h2.5l2 5-2 1c1 3 3 5 6 6l1-2 5 2V18c0 1-1 2-2 2-9 0-16-7-16-15z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 3l6 6M21 3v6h-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

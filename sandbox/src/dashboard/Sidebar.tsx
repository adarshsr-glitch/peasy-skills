import { useLang } from '../i18n';
import styles from './Sidebar.module.css';

type NavItemId = 'home' | 'build' | 'history' | 'settings';

type SidebarProps = {
  active: NavItemId;
  onNavigate: (id: NavItemId) => void;
};

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const { t } = useLang();

  const items: ReadonlyArray<{ id: NavItemId; label: string; icon: React.ReactNode; enabled: boolean }> = [
    { id: 'home', label: t('nav.dashboard'), icon: <HomeIcon />, enabled: true },
    { id: 'build', label: t('nav.build'), icon: <SparkleIcon />, enabled: true },
    { id: 'history', label: t('nav.history'), icon: <ClockIcon />, enabled: false },
    { id: 'settings', label: t('nav.settings'), icon: <GearIcon />, enabled: false },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.wordmark}>Peasy</span>
        <span className={styles.product}>Studio</span>
      </div>
      <nav className={styles.nav}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.item} ${active === item.id ? styles.active : ''} ${!item.enabled ? styles.disabled : ''}`}
            onClick={() => item.enabled && onNavigate(item.id)}
            disabled={!item.enabled}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {!item.enabled && <span className={styles.soon}>{t('nav.soon')}</span>}
          </button>
        ))}
      </nav>
      <div className={styles.foot}>
        <div className={styles.avatar}>A</div>
        <div className={styles.footText}>
          <strong>Adarsh</strong>
          <span>PM · KeyValue</span>
        </div>
      </div>
    </aside>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 9l7-6 7 6v8a1 1 0 0 1-1 1h-3v-5h-6v5H4a1 1 0 0 1-1-1V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.5 4.5l2.8 2.8M12.7 12.7l2.8 2.8M4.5 15.5l2.8-2.8M12.7 7.3l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

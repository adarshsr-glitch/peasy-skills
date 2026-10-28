import { useEffect, useState } from 'react';
import { useLang, type Lang } from '../i18n';
import { Sidebar } from './Sidebar';
import { BuildAFeature } from '../features/build-a-feature/BuildAFeature';
import { scenarios } from '../features/build-a-feature/scenarios';
import styles from './DashboardShell.module.css';

type NavId = 'home' | 'build' | 'history' | 'settings';

type Route = {
  nav: NavId;
  scenarioId: string | null;
};

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('build')) {
    const parts = hash.split('/');
    const scenarioId = parts[1] ?? null;
    return { nav: 'build', scenarioId };
  }
  if (hash === 'history') return { nav: 'history', scenarioId: null };
  if (hash === 'settings') return { nav: 'settings', scenarioId: null };
  return { nav: 'home', scenarioId: null };
}

function routeToHash(route: Route): string {
  if (route.nav === 'home') return '';
  if (route.nav === 'build') {
    return route.scenarioId ? `build/${route.scenarioId}` : 'build';
  }
  return route.nav;
}

export function DashboardShell() {
  const [route, setRoute] = useState<Route>(parseHash);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const target = routeToHash(route);
    if (window.location.hash.replace(/^#/, '') !== target) {
      window.location.hash = target;
    }
  }, [route]);

  function goTo(nav: NavId) {
    setRoute({ nav, scenarioId: null });
  }

  function openScenario(id: string) {
    setRoute({ nav: 'build', scenarioId: id });
  }

  function toggleLang() {
    setLang(lang === 'nl' ? 'en' : 'nl');
  }

  return (
    <div className={styles.shell}>
      <Sidebar active={route.nav} onNavigate={goTo} />
      <main className={styles.main}>
        <div className={styles.langToggle}>
          <LangSwitch lang={lang} onToggle={toggleLang} />
        </div>
        {route.nav === 'home' && (
          <DashboardHome onBuildFeature={() => goTo('build')} />
        )}
        {route.nav === 'build' && (
          <BuildAFeature activeScenarioId={route.scenarioId} onSelect={openScenario} />
        )}
        {route.nav === 'history' && <ComingSoon label={t('nav.history')} />}
        {route.nav === 'settings' && <ComingSoon label={t('nav.settings')} />}
      </main>
    </div>
  );
}

function LangSwitch({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button type="button" className={styles.langBtn} onClick={onToggle} aria-label="Switch language">
      <span className={lang === 'nl' ? styles.langActive : styles.langInactive}>NL</span>
      <span className={styles.langDivider}>/</span>
      <span className={lang === 'en' ? styles.langActive : styles.langInactive}>EN</span>
    </button>
  );
}

function DashboardHome({ onBuildFeature }: { onBuildFeature: () => void }) {
  const { t } = useLang();
  return (
    <div className={styles.home}>
      <div className={styles.homeHero}>
        <span className={styles.eyebrow}>Peasy Studio</span>
        <h1 className={styles.homeTitle}>{t('home.title')}</h1>
        <p className={styles.homeLede}>{t('home.lede')}</p>
        <button type="button" className={styles.cta} onClick={onBuildFeature}>
          {t('home.cta')}
        </button>
      </div>
      <div className={styles.homeStats}>
        <StatCard label={t('home.stat.features')} value={String(scenarios.length)} />
        <StatCard label={t('home.stat.components')} value="9" />
        <StatCard label={t('home.stat.tokens')} value="20+" />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  const { t } = useLang();
  return (
    <div className={styles.comingSoon}>
      <h2>{label}</h2>
      <p>{t('coming-soon')}</p>
    </div>
  );
}

import { useEffect, useState } from 'react';
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

  return (
    <div className={styles.shell}>
      <Sidebar active={route.nav} onNavigate={goTo} />
      <main className={styles.main}>
        {route.nav === 'home' && (
          <DashboardHome onBuildFeature={() => goTo('build')} />
        )}
        {route.nav === 'build' && (
          <BuildAFeature activeScenarioId={route.scenarioId} onSelect={openScenario} />
        )}
        {route.nav === 'history' && <ComingSoon label="History" />}
        {route.nav === 'settings' && <ComingSoon label="Settings" />}
      </main>
    </div>
  );
}

function DashboardHome({ onBuildFeature }: { onBuildFeature: () => void }) {
  return (
    <div className={styles.home}>
      <div className={styles.homeHero}>
        <span className={styles.eyebrow}>Peasy Studio</span>
        <h1 className={styles.homeTitle}>What are you shipping today?</h1>
        <p className={styles.homeLede}>
          Peasy Studio turns a two-line idea into a Jira ticket and a working prototype that matches how Peasy already looks. Pick a feature to see the pipeline run.
        </p>
        <button type="button" className={styles.cta} onClick={onBuildFeature}>
          Build a feature →
        </button>
      </div>
      <div className={styles.homeStats}>
        <StatCard label="Features in demo" value={String(scenarios.length)} />
        <StatCard label="Pack components" value="9" />
        <StatCard label="Tokens defined" value="20+" />
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
  return (
    <div className={styles.comingSoon}>
      <h2>{label}</h2>
      <p>Not wired up yet. Only "Build a feature" is live in this demo.</p>
    </div>
  );
}

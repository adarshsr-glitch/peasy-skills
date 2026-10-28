import { useEffect, useState } from 'react';
import { BrainstormPage } from './features/brainstorm/BrainstormPage';
import { SpecificationsPage } from './features/anb-1293-electricity/SpecificationsPage';

type Route = 'brainstorm' | 'spec';

function readRouteFromHash(): Route {
  return window.location.hash === '#spec' ? 'spec' : 'brainstorm';
}

export function App() {
  const [route, setRoute] = useState<Route>(readRouteFromHash);

  useEffect(() => {
    const onHash = () => setRoute(readRouteFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const target = route === 'spec' ? '#spec' : '';
    if (window.location.hash !== target) {
      window.location.hash = target;
    }
  }, [route]);

  if (route === 'spec') {
    return <SpecificationsPage onBack={() => setRoute('brainstorm')} />;
  }
  return <BrainstormPage onViewPrototype={() => setRoute('spec')} />;
}

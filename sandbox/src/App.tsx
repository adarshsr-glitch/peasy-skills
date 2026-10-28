import { LangProvider } from './i18n';
import { DashboardShell } from './dashboard/DashboardShell';

export function App() {
  return (
    <LangProvider>
      <DashboardShell />
    </LangProvider>
  );
}

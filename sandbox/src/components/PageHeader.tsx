import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

// Peasy mapping: likely `<PageHeader title="…" />` or `<EditCardHeader />`.
// Three flow variants (edit / create / duplicate) implied by ANB-1303 AC2,
// ANB-1347 AC2, ANB-1306 AC1. Sandbox implements the edit flow.

type PageHeaderProps = {
  title: string;
  badge?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ title, badge, meta, actions }: PageHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{title}</h2>
          {badge}
        </div>
        {actions}
      </div>
      {meta && <div className={styles.meta}>{meta}</div>}
    </div>
  );
}

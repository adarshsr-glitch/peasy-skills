import type { ReactNode } from 'react';
import styles from './Badge.module.css';

// Peasy mapping: `<Badge tone="success">` likely, OR `<StatusBadge status="actief">`
// — unknown whether Peasy ships a generic Badge with `tone` or a domain StatusBadge
// with an enum. Snippet request priority: medium.
// Props shape per pack/components/Badge.md.

type BadgeProps = {
  tone?: 'success' | 'neutral' | 'info' | 'danger';
  dot?: boolean;
  children: ReactNode;
};

export function Badge({ tone = 'neutral', dot = true, children }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`}>
      {dot && <span className={styles.dot} />}
      <span>{children}</span>
    </span>
  );
}

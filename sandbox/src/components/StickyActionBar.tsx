import type { ReactNode } from 'react';
import styles from './StickyActionBar.module.css';

// Peasy mapping: UNCLEAR. This may be a layout pattern (two <Button>
// instances placed at top and bottom of the edit card) rather than a
// dedicated component. See pack/components/StickyActionBar.md and
// deviations.md.

type StickyActionBarProps = {
  position?: 'top' | 'bottom';
  children: ReactNode;
};

export function StickyActionBar({ position = 'top', children }: StickyActionBarProps) {
  return (
    <div className={`${styles.bar} ${styles[position]}`}>{children}</div>
  );
}

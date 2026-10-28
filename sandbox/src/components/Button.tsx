import type { ReactNode } from 'react';
import styles from './Button.module.css';

// Peasy mapping: `import { Button } from '~/ui/Button'` — likely.
// Props shape per pack/components/Button.md. State treatments
// (hover/focus/active/disabled/loading) are inferred — snippet request.

type ButtonProps = {
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  disabled,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  const className = [styles.button, styles[variant], styles[size]].join(' ');
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
    </button>
  );
}

import type { ReactNode } from 'react';
import styles from './ChatBubble.module.css';

// Sandbox-only. Not in the pack — a brainstorming surface isn't part of
// the ANB-1293 benchmark. If this pattern lands in Peasy's admin, harvest
// it into pack/patterns/ then.

type ChatBubbleProps = {
  from: 'ai' | 'user';
  children: ReactNode;
};

export function ChatBubble({ from, children }: ChatBubbleProps) {
  return (
    <div className={`${styles.row} ${styles[from]}`}>
      <div className={styles.bubble}>{children}</div>
    </div>
  );
}

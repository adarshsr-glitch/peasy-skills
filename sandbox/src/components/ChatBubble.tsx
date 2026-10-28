import type { ReactNode } from 'react';
import styles from './ChatBubble.module.css';

type ChatBubbleProps = {
  from: 'ai' | 'user';
  children: ReactNode;
  suggestions?: readonly string[];
  onSuggestionClick?: (text: string) => void;
};

export function ChatBubble({ from, children, suggestions, onSuggestionClick }: ChatBubbleProps) {
  const hasSuggestions = from === 'ai' && suggestions && suggestions.length > 0;

  return (
    <div className={`${styles.row} ${styles[from]}`}>
      <div className={styles.column}>
        <div className={styles.bubble}>{children}</div>
        {hasSuggestions && (
          <div className={styles.suggestions}>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className={styles.pill}
                onClick={() => onSuggestionClick?.(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

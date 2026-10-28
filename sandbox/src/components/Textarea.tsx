import styles from './Textarea.module.css';

// Peasy mapping: likely `<Textarea label="…" />` — multi-line sibling of TextInput.
// Not harvested into pack/components/ yet; add when a feature actually requires it.

type TextareaProps = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  onEnter?: () => void;
};

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  disabled,
  rows = 4,
  onEnter,
}: TextareaProps) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && onEnter) {
            e.preventDefault();
            onEnter();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
      />
      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : helperText ? (
        <p className={styles.helper}>{helperText}</p>
      ) : null}
    </div>
  );
}

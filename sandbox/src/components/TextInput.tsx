import styles from './TextInput.module.css';

// Peasy mapping: likely `<TextInput label="…" />` or `<Input label="…" />`.
// Props shape per pack/components/TextInput.md. Focus / error states
// inferred — snippet request priority: low (most dev systems have these).

type TextInputProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  inputMode?: 'text' | 'numeric';
};

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  disabled,
  required,
  inputMode = 'text',
}: TextInputProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}
        {required && <span aria-hidden="true" />}
      </label>
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        inputMode={inputMode}
        aria-invalid={!!error || undefined}
      />
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : helperText ? (
        <p className={styles.helper}>{helperText}</p>
      ) : null}
    </div>
  );
}

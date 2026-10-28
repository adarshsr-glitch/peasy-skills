import styles from './RadioGroup.module.css';

// Peasy mapping: `<RadioGroup />` or `<Radio.Group />`.
// Locked state (ANB-1306 AC5) is implemented as a prop here — Peasy's real
// shape may differ. Snippet request priority: high.

type RadioOption<T extends string> = { value: T; label: string };

type RadioGroupProps<T extends string> = {
  label: string;
  value: T | null;
  options: ReadonlyArray<RadioOption<T>>;
  onChange: (next: T) => void;
  locked?: boolean;
  disabled?: boolean;
  name: string;
};

export function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  locked,
  disabled,
  name,
}: RadioGroupProps<T>) {
  const effectiveDisabled = disabled || locked;
  return (
    <div className={styles.wrapper}>
      <span className={styles.groupLabel}>{label}</span>
      <div className={styles.options}>
        {options.map((opt) => {
          const checked = value === opt.value;
          const dim = locked && !checked;
          return (
            <label
              key={opt.value}
              className={`${styles.option} ${dim ? styles.dim : ''} ${effectiveDisabled ? styles.disabled : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => !effectiveDisabled && onChange(opt.value)}
                disabled={effectiveDisabled}
                className={styles.radio}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

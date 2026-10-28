import styles from './CheckboxGroup.module.css';

// Peasy mapping: `<CheckboxGroup />` or `<Checkbox.Group />`.
// Props shape per pack/components/CheckboxGroup.md.

type CheckboxOption<T extends string> = { value: T; label: string };

type CheckboxGroupProps<T extends string> = {
  label: string;
  value: ReadonlyArray<T>;
  options: ReadonlyArray<CheckboxOption<T>>;
  onChange: (next: T[]) => void;
  disabled?: boolean;
};

export function CheckboxGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: CheckboxGroupProps<T>) {
  const toggle = (opt: T) => {
    if (disabled) return;
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div className={styles.wrapper}>
      <span className={styles.groupLabel}>{label}</span>
      <div className={styles.options}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`${styles.option} ${disabled ? styles.disabled : ''}`}
          >
            <input
              type="checkbox"
              checked={value.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              disabled={disabled}
              className={styles.checkbox}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

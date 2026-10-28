import styles from './Dropdown.module.css';
import { ChevronDownIcon } from './icons';

// Peasy mapping: likely `<Select label="…" />` or `<Dropdown label="…" />`.
// Open-state treatment is inferred — the sandbox uses a native <select>
// as a stand-in. The real Peasy Dropdown is custom (status-colored items
// per ANB-1306 AC3). See deviations.md.

type DropdownOption<T extends string> = {
  value: T;
  label: string;
  status?: 'actief' | 'niet-actief';
};

type DropdownProps<T extends string> = {
  label: string;
  value: T | null;
  options: ReadonlyArray<DropdownOption<T>>;
  onChange: (next: T) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  placeholder,
  disabled,
}: DropdownProps<T>) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.control}>
        <select
          className={styles.select}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value as T)}
          disabled={disabled}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron}><ChevronDownIcon /></span>
      </div>
    </div>
  );
}

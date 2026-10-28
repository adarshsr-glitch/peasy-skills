import { TextInput } from './TextInput';

// Peasy mapping: almost certainly a prop on <TextInput> (`inputMode="numeric"`
// or similar), NOT a separate component. Reconstructed here for parity with
// pack/components/TextInputNumeric.md — on port, delete this file and pass
// the inputMode prop on <TextInput> directly.

type TextInputNumericProps = {
  label: string;
  value: number | '';
  onChange: (next: number | '') => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

export function TextInputNumeric({ value, onChange, ...rest }: TextInputNumericProps) {
  const str = value === '' ? '' : String(value);
  const handle = (next: string) => {
    if (next === '') return onChange('');
    const cleaned = next.replace(/[^\d]/g, '');
    if (cleaned === '') return onChange('');
    const num = Number(cleaned);
    if (!Number.isNaN(num)) onChange(num);
  };
  return <TextInput {...rest} value={str} onChange={handle} inputMode="numeric" />;
}

import { useState } from 'react';
import styles from './Prototype.module.css';

// Peasy mapping: appears on peasy.be/autoverzekering/ above the fold.
// Reuses pack TextInput + Dropdown shapes, but the three-across layout is
// scenario-specific.

const brands = ['Renault', 'Volkswagen', 'Peugeot', 'BMW', 'Toyota', 'Ford', 'Audi', 'Opel', 'Mercedes-Benz', 'Citroën'] as const;
const fuels = ['Benzine', 'Diesel', 'Hybride', 'Elektrisch', 'LPG', 'CNG'] as const;

export function Prototype() {
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [fuel, setFuel] = useState('');
  const canSubmit = year.trim() !== '' && brand !== '' && fuel !== '';

  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>Vind je autoverzekering</h2>
          <p className={styles.subheading}>Vul drie velden in en we vergelijken de aanbieders voor je.</p>
        </div>
        <div className={styles.row}>
          <Field label="Bouwjaar" required>
            <input
              type="text"
              inputMode="numeric"
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
              placeholder="2018"
              className={styles.input}
            />
          </Field>
          <Field label="Merk" required>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={styles.select}
            >
              <option value="">Maak je keuze</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </Field>
          <Field label="Type brandstof" required>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className={styles.select}
            >
              <option value="">Maak je keuze</option>
              {fuels.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Field>
        </div>
        <p className={styles.helper}>
          Alle velden zijn vereist. Je gegevens worden niet opgeslagen.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.submit} disabled={!canSubmit}>
            Vergelijk
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.req}>*</span>}
      </span>
      {children}
    </label>
  );
}

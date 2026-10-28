import { useState } from 'react';
import { useLang } from '../../../../i18n';
import styles from './Prototype.module.css';

const brands = ['Renault', 'Volkswagen', 'Peugeot', 'BMW', 'Toyota', 'Ford', 'Audi', 'Opel', 'Mercedes-Benz', 'Citroën'] as const;

const fuelKeys = ['benzine', 'diesel', 'hybride', 'elektrisch', 'lpg', 'cng'] as const;

export function Prototype() {
  const { t } = useLang();
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [fuel, setFuel] = useState('');
  const canSubmit = year.trim() !== '' && brand !== '' && fuel !== '';

  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>{t('auto.heading')}</h2>
          <p className={styles.subheading}>{t('auto.subheading')}</p>
        </div>
        <div className={styles.row}>
          <Field label={t('auto.year')} required>
            <input
              type="text"
              inputMode="numeric"
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
              placeholder="2018"
              className={styles.input}
            />
          </Field>
          <Field label={t('auto.brand')} required>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={styles.select}
            >
              <option value="">{t('auto.choose')}</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </Field>
          <Field label={t('auto.fuel')} required>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className={styles.select}
            >
              <option value="">{t('auto.choose')}</option>
              {fuelKeys.map((f) => (
                <option key={f} value={f}>{t(`auto.fuel.${f}`)}</option>
              ))}
            </select>
          </Field>
        </div>
        <p className={styles.helper}>{t('auto.helper')}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.submit} disabled={!canSubmit}>
            {t('auto.submit')}
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

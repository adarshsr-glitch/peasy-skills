import { useLang } from '../../../../i18n';
import styles from './Prototype.module.css';

export function Prototype() {
  const { t } = useLang();
  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        <span className={styles.badge}>{t('blank.badge')}</span>
        <h3 className={styles.heading}>{t('blank.heading')}</h3>
        <p className={styles.body}>{t('blank.body')}</p>
      </div>
    </div>
  );
}

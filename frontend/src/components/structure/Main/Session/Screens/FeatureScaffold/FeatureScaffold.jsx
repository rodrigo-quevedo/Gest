import { useTranslation } from 'react-i18next';
import styles from './FeatureScaffold.module.css';

function FeatureScaffold({ titleKey, descriptionKey }) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{t(titleKey)}</h1>
      {descriptionKey ? <p className={styles.lead}>{t(descriptionKey)}</p> : null}
      <div className={styles.panel}>
        <p>{t('session.scaffold.body')}</p>
      </div>
    </div>
  );
}

export default FeatureScaffold;

import styles from './LangSwitchButton.module.css'
import { CircleFlag } from 'react-circle-flags'
import { useTranslation } from 'react-i18next'

export default function LangSwitchButton({ language, setLanguage, edgeAlign = 'end' }) {
    const { t } = useTranslation()

    const wrapClass =
        edgeAlign === 'start'
            ? `${styles.languageSegmentWrap} ${styles.languageSegmentWrapStart}`
            : styles.languageSegmentWrap

    return (
        <div className={wrapClass}>
        <div
            className={styles.languageSegment}
            role="group"
            aria-label={t('header.languageSelectAria')}
        >
            <button
                type="button"
                className={
                    language === 'en'
                        ? `${styles.languageSegmentBtn} ${styles.languageSegmentBtnActive}`
                        : styles.languageSegmentBtn
                }
                aria-pressed={language === 'en'}
                onClick={() => setLanguage('en')}
                lang="en"
            >
                <span className={styles.languageSegmentBtnInner}>
                    <CircleFlag
                        countryCode="us"
                        height={18}
                        width={18}
                        className={styles.languageFlag}
                        alt=""
                        aria-hidden
                    />
                    {t('header.language.en')}
                </span>
            </button>
            <button
                type="button"
                className={
                    language === 'es'
                        ? `${styles.languageSegmentBtn} ${styles.languageSegmentBtnActive}`
                        : styles.languageSegmentBtn
                }
                aria-pressed={language === 'es'}
                onClick={() => setLanguage('es')}
                lang="es"
            >
                <span className={styles.languageSegmentBtnInner}>
                    <CircleFlag
                        countryCode="es"
                        height={18}
                        width={18}
                        className={styles.languageFlag}
                        alt=""
                        aria-hidden
                    />
                    {t('header.language.es')}
                </span>
            </button>
        </div>
    </div>
    )
}
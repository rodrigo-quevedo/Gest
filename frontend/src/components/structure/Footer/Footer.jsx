import styles from './Footer.module.css'

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

function Footer (){
    const { t } = useTranslation()
    return (
        <footer className={styles.footer}>
            <div className={styles.infoContainer}>
                <span className={styles.groupTitle}>{t('footer.versionHistory')}</span>
                <div className={styles.versionRow}>
                    <span className={`${styles.versionBadge} ${styles.current}`}>v2</span>
                    <span className={styles.dateText}>
                        <span className={styles.dateLabel}>{t('footer.versionInitialLabel')}</span> {t('footer.v2DateInitial')}
                        <span className={styles.separator}>•</span>
                        <span className={styles.dateLabel}>{t('footer.versionUpdatedLabel')}</span> {t('footer.v2DateUpdated')}
                    </span>
                </div>
                <div className={styles.versionRow}>
                    <span className={`${styles.versionBadge} ${styles.legacy}`}>v1</span>
                    <span className={styles.dateText}>
                        <span className={styles.dateLabel}>{t('footer.versionInitialLabel')}</span> {t('footer.v1DateInitial')} 
                        <span className={styles.separator}>•</span>
                        <span className={styles.dateLabel}>{t('footer.versionUpdatedLabel')}</span> {t('footer.v1DateUpdated')}
                    </span>
                </div>
            </div>

            <div className={styles.devContainer}>
                <p className={styles.devName}>Rodrigo Martín Quevedo</p>
                <span className={styles.devRole}>{t('footer.devRole')}</span>
            </div>

            <nav className={styles.socialNav}>
                <a href="https://github.com/rodrigo-quevedo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaGithub className={styles.icon} /> 
                    <span>{t('footer.projects')}</span>
                </a>
                <a href="https://www.linkedin.com/in/martinquevedo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaLinkedin className={styles.icon}/> 
                    <span>LinkedIn</span>
                </a>
            </nav>
        </footer>
    )
}

export default Footer;
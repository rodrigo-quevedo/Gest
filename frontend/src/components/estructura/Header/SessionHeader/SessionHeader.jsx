import styles from './SessionHeader.module.css'
import { useTranslation } from 'react-i18next'

function SessionHeader ({setPopupCerrarSesion}) {
    const { t } = useTranslation()

    return (
        <nav className={styles.navContainer}>
            <button 
                className={styles.headerNavButton}
                onClick={()=>setPopupCerrarSesion(true)}
            >
                {t('authentication.logout')}
            </button>
        </nav>
    )
}

export default SessionHeader
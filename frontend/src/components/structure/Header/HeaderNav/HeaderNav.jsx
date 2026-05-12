import styles from './HeaderNav.module.css'

import LangSwitchButton from '../../../reusable/LangSwitchButton/LangSwitchButton'
import { useTranslation } from 'react-i18next'
import { AUTHENTICATION_SCREENS } from '../../../../config/config'

function HeaderNav({
    isAuth,
    authenticationScreen,
    setAuthenticationScreen,
    setPopupCerrarSesion,
    language,
    setLanguage,
}) {
    const { t } = useTranslation()

    return (
        <div className={styles.headerNav}>
            <LangSwitchButton
                language={language}
                setLanguage={setLanguage}
                edgeAlign="start"
            />
            <nav className={styles.headerNavActions} aria-label={t('header.navAriaLabel')}>
                {isAuth ? (
                    <button
                        type="button"
                        className={`${styles.headerNavButton} ${styles.headerNavButtonSolid}`}
                        onClick={() => setPopupCerrarSesion(true)}
                    >
                        {t('authentication.logout')}
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className={
                                authenticationScreen === AUTHENTICATION_SCREENS.LOGIN
                                    ? `${styles.headerNavButton} ${styles.buttonSeleccionado}`
                                    : styles.headerNavButton
                            }
                            onClick={() => setAuthenticationScreen(AUTHENTICATION_SCREENS.LOGIN)}
                        >
                            {t('authentication.login')}
                        </button>
                        <button
                            type="button"
                            className={
                                authenticationScreen === AUTHENTICATION_SCREENS.REGISTRARSE
                                    ? `${styles.headerNavButton} ${styles.buttonSeleccionado}`
                                    : styles.headerNavButton
                            }
                            onClick={() => setAuthenticationScreen(AUTHENTICATION_SCREENS.REGISTRARSE)}
                        >
                            {t('authentication.register')}
                        </button>
                    </>
                )}
            </nav>
        </div>
    )
}

export default HeaderNav

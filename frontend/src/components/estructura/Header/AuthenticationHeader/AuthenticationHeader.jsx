import styles from './AuthenticationHeader.module.css'

import { useTranslation } from 'react-i18next'
import {AUTHENTICATION_SCREENS} from '../../../../config/config'

function AuthenticationHeader ({authenticationScreen, setAuthenticationScreen}) {
    const { t } = useTranslation()

    return (
        <nav className={styles.navContainer}>
            
            <button 
                className = {
                    authenticationScreen === AUTHENTICATION_SCREENS.LOGIN ?   
                        `${styles.headerNavButton} ${styles.buttonSeleccionado}` 
                        : 
                        styles.headerNavButton 
                }

                onClick={ ()=> {setAuthenticationScreen(AUTHENTICATION_SCREENS.LOGIN)} }
            >
                {t('authentication.login')}
            </button>
            
            <button 
                className = {
                    authenticationScreen === AUTHENTICATION_SCREENS.REGISTRARSE ?   
                        `${styles.headerNavButton} ${styles.buttonSeleccionado}` 
                        : 
                        styles.headerNavButton
                }

                onClick={ ()=> {setAuthenticationScreen(AUTHENTICATION_SCREENS.REGISTRARSE)} }
            >
                {t('authentication.register')}
            </button>


           
        </nav>
    )
}

export default AuthenticationHeader
import styles from './AuthenticationHeader.module.css'

import {AUTHENTICATION_SCREENS} from '../../../../config/config'

function AuthenticationHeader ({authenticationScreen, setAuthenticationScreen}) {
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
                Ingresar
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
                Registrarse
            </button>


           
        </nav>
    )
}

export default AuthenticationHeader
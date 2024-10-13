import styles from './LoginHeader.module.css'

import {AUTHENTICATION_SCREENS} from '../../../config/config'

function LoginHeader ({loginScreen, setLoginScreen}) {
    return (
        <nav className={styles.navContainer}>
            
            <button 
                className = {
                    loginScreen === AUTHENTICATION_SCREENS.LOGIN ?   
                        `${styles.headerNavButton} ${styles.buttonSeleccionado}` 
                        : 
                        styles.headerNavButton 
                }

                onClick={ ()=> {setLoginScreen(AUTHENTICATION_SCREENS.LOGIN)} }
            >
                Ingresar
            </button>
            
            <button 
                className = {
                    loginScreen === AUTHENTICATION_SCREENS.REGISTRARSE ?   
                        `${styles.headerNavButton} ${styles.buttonSeleccionado}` 
                        : 
                        styles.headerNavButton
                }

                onClick={ ()=> {setLoginScreen(AUTHENTICATION_SCREENS.REGISTRARSE)} }
            >
                Registrarse
            </button>


           
        </nav>
    )
}

export default LoginHeader
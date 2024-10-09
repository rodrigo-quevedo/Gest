import styles from './LoginHeader.module.css'

import {LOGIN_SCREENS} from '../../../config/config'

function LoginHeader ({loginScreen, setLoginScreen}) {
    return (
        <nav className={styles.navContainer}>
            
            <button 
                className = {
                    loginScreen === LOGIN_SCREENS.LOGIN ?   
                        `${styles.headerNavButton} ${styles.buttonSeleccionado}` 
                        : 
                        styles.headerNavButton 
                }

                onClick={ ()=> {setLoginScreen(LOGIN_SCREENS.LOGIN)} }
            >
                Ingresar
            </button>
            
            <button 
                className = {
                    loginScreen === LOGIN_SCREENS.REGISTRARSE ?   
                        `${styles.headerNavButton} ${styles.buttonSeleccionado}` 
                        : 
                        styles.headerNavButton
                }

                onClick={ ()=> {setLoginScreen(LOGIN_SCREENS.REGISTRARSE)} }
            >
                Registrarse
            </button>


           
        </nav>
    )
}

export default LoginHeader
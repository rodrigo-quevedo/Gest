import styles from './Header.module.css'

import website_icon from '../../../../media/website_icon.png'

import AuthenticationHeader from '../AuthenticationHeader/AuthenticationHeader'
import SessionHeader from '../SessionHeader/SessionHeader'

function Header({isAuth, authenticationScreen, setAuthenticationScreen, setPopupCerrarSesion}) {

    return (
        <header className={styles.headerContainer}>

            {/* Website logo + title */}
            <div className={styles.websiteBanner}>
                <img 
                    src={website_icon} 
                    alt="Gest - Administrador de Inventario"
                />
                <div className={styles.separator}></div>
                <h1>Administrador de Inventario</h1>
            </div>


            {/* Aca se elige entre mostrar [Login/Registrarse] o [Perfil/Cerrar sesión] */}
            {isAuth ? 

                <SessionHeader
                    setPopupCerrarSesion={setPopupCerrarSesion}
                /> 

            : 

                <AuthenticationHeader
                    authenticationScreen={authenticationScreen}
                    setAuthenticationScreen={setAuthenticationScreen}
                />

            }

        </header>
    )

}

export default Header
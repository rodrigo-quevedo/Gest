import styles from './Header.module.css'

import website_icon from '../../../media/website_icon.png'

import AuthenticationHeader from '../AuthenticationHeader/AuthenticationHeader'
import SessionHeader from '../SessionHeader/SessionHeader'

function Header({isAuth, authenticationScreen, setAuthenticationScreen, setPopupCerrarSesion}) {

    return (
        <header className={styles.headerContainer}>

            {/* Website logo + title */}
            <div className={styles.websiteBanner}>
                <img 
                    src={website_icon} 
                    alt="Gest - Gestor de inventario"/
                >
                <h1>Gestor de inventario</h1>
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
import styles from './Header.module.css'

import website_icon from '../../../media/website_icon.png'

import LoginHeader from '../LoginHeader/LoginHeader'
import SessionHeader from '../SessionHeader/SessionHeader'

function Header({isAuth, loginScreen, setLoginScreen, setPopupCerrarSesion}) {

    return (
        <header className={styles.headerContainer}>

            {/* Website logo + title */}
            <div className={styles.websiteBanner}>
                <img src={website_icon} alt="Gest - Gestor de inventario"/>
                <h1>Gestor de inventario</h1>
            </div>


            {/* Aca se elige entre mostrar [Login/Registrarse] o [Perfil/Cerrar sesión] */}
            {isAuth ? 
                <SessionHeader
                setPopupCerrarSesion={setPopupCerrarSesion}
                /> 
                : 
                <LoginHeader
                    loginScreen={loginScreen}
                    setLoginScreen={setLoginScreen}
                />
            }

        </header>
    )

}

export default Header
import styles from './Header.module.css'

import website_icon from '../../media/website_icon.png'

function Header({isAuth, setIsAuth}) {

    return (
        <header className={styles.header}>
            <div className={styles.websiteBanner}>
                <img src={website_icon} alt="Gest - Gestor de inventario"/>
                <h1>Gestor de inventario</h1>
            </div>

            {/* Aca se puede elegir entre mostrar [Login/Registrarse] o mostrar [Perfil/Cerrar sesión] */}
            <nav className={styles.navbar}>
                <button 
                className={menuLogin === MENUS_LOGIN[0]? `${styles.headerButton} ${styles.seleccionado}` : styles.headerButton}
                onClick={()=> {setMenuLogin(MENUS_LOGIN[0])}}>Ingresar</button>
                <button 
                className={menuLogin === MENUS_LOGIN[1]? `${styles.headerButton} ${styles.seleccionado}` : styles.headerButton}
                onClick={()=> {setMenuLogin(MENUS_LOGIN[1])}}>Registrarse</button>
            </nav>
        </header>
    )

}

export default Header
import styles from './SessionHeader.module.css'

function SessionHeader () {
    return (
        <nav className={styles.navContainer}>

            {/* "Perfil" no tiene mucho sentido, la app hace todo lo necesario sin usar esto. */}
            {/* <button className={styles.headerNavButton}>
                Perfil
            </button> */}

            <button 
                className={styles.headerNavButton}>
                Cerrar sesión
            </button>

        </nav>
    )
}

export default SessionHeader
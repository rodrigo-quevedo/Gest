import styles from './SessionHeader.module.css'

function SessionHeader ({setPopupCerrarSesion}) {
    return (
        <nav className={styles.navContainer}>
            <button 
                className={styles.headerNavButton}
                onClick={()=>setPopupCerrarSesion(true)}
            >
                Cerrar sesión
            </button>
        </nav>
    )
}

export default SessionHeader
import styles from './Session_Expired.module.css'



function Session_Expired ({
    setIsAuth,
    setPopupSessionExpired
}) {

    return (
        <div className={styles.container}>

            <p>La sesión expiró. Ingrese nuevamente.</p>
            
            <button
                className={styles.ingresarButton}
                onClick={()=>{
                    setIsAuth(false)
                    setPopupSessionExpired(false)
                }}
            >
                Ingresar
            </button>

        </div>
    )
}

export default Session_Expired
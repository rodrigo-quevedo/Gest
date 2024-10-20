import styles from './CerrarSesion.module.css'

function CerrarSesion (
    {
        setIsAuth, 
        setPopupCerrarSesion
    }
) {
    document.querySelector('title').innerText = 'Cerrar Sesión';

    return (
        <main className={styles.mainContainer}>

            <div className={styles.container}>

                <h1 className={styles.question}>
                    ¿Desea cerrar la sesión?
                </h1>

                <button
                    className={`${styles.button} ${styles.acceptButton}`}
                    onClick={()=>{
                        setIsAuth(false); 
                        setPopupCerrarSesion(false);
                    }}
                >
                    Cerrar la sesión
                </button>

                <button
                    className={`${styles.button} ${styles.cancelButton}`}
                    onClick={()=>
                        setPopupCerrarSesion(false)
                    }
                >
                    Cancelar
                </button>

            </div>

        </main>
    )
}

export default CerrarSesion
import styles from './CerrarSesion.module.css'

import {useState} from 'react'

import { FETCH_STATUS } from '../../../../config/config'
import FetchStatusText from '../../../componentes_reutilizables/FetchStatusText/FetchStatusText'

import fetch_cerrar_sesion from './fetch_backend/fetch_cerrar_sesion'



function CerrarSesion (
    {
        setIsAuth, 
        setPopupCerrarSesion
    }
) {
    document.querySelector('title').innerText = 'Cerrar Sesión';

    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.DEFAULT
    })

    return (
        <main className={styles.mainContainer}>

            <div className={styles.container}>

                <h1 className={styles.question}>
                    ¿Desea cerrar la sesión?
                </h1>

                <button
                    className={`${styles.button} ${styles.acceptButton}`}
                    onClick={()=>{
                        setFetchStatus({
                            status: FETCH_STATUS.SUBMIT,
                            submitMessage: `Cerrando sesión...`
                        })
                        fetch_cerrar_sesion(setFetchStatus, setIsAuth, setPopupCerrarSesion)
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

                <div className={styles.fetchStatusContainer}>
                    <FetchStatusText
                        fetchStatus={fetchStatus}
                    />
                </div>

            </div>

        </main>
    )
}

export default CerrarSesion
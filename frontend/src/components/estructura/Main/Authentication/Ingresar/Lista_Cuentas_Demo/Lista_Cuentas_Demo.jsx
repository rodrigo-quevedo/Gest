import styles from './Lista_Cuentas_Demo.module.css'

import {useState, useEffect} from 'react'

import { FaUserAlt } from "react-icons/fa";

import fetch_cuentas_demo from './fetch_cuentas_demo/fetch_cuentas_demo';


function Lista_Cuentas_Demo ({
    setCredenciales,
    setCanUpdate
}) {

    const [cuentasDemo, setCuentasDemo] = useState(null)
    const [firstFetch, setFirstFetch] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(null)

    useEffect(()=>{
        if (firstFetch === false) {
            // Artificial delay to show off the skeleton if needed, or just fetch
            // fetch_cuentas_demo is sync/async? Assuming async behavior 
            fetch_cuentas_demo(setFirstFetch, setCuentasDemo)
        }
    }, [firstFetch])

    const handleAccountClick = (cuentaDemoObj) => {
        setSelectedAccount(cuentaDemoObj.usuario)
        
        // Small delay to show visual feedback before filling
        setTimeout(() => {
            setCredenciales({
                usuario: cuentaDemoObj.usuario,
                password: cuentaDemoObj.password
            })
            setCanUpdate(true)
            
            // Optional: reset selected after a bit or keep it highlighted
            setTimeout(() => setSelectedAccount(null), 1000)
        }, 300)
    }
    
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Cuentas Demo</h2>
                <p className={styles.subtitle}>Prueba el sistema con datos precargados</p>
            </div>

            <div className={styles.grid}>
                {cuentasDemo ? (
                    cuentasDemo.map((cuenta) => (
                        <button
                            key={cuenta.usuario}
                            className={`${styles.card} ${selectedAccount === cuenta.usuario ? styles.cardActive : ''}`}
                            onClick={(e) => {
                                e.preventDefault()
                                handleAccountClick(cuenta)
                            }}
                            type="button"
                            aria-label={`Usar cuenta demo de ${cuenta.usuario}`}
                        >
                            <div className={styles.iconWrapper}>
                                <FaUserAlt className={styles.icon} />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.username}>{cuenta.usuario}</span>
                                <span className={styles.role}>Click para usar</span>
                            </div>
                            {selectedAccount === cuenta.usuario && (
                                <div className={styles.loadingOverlay}>
                                    <div className={styles.spinner}></div>
                                </div>
                            )}
                        </button>
                    ))
                ) : (
                    // Skeleton Loading State
                    [1, 2, 3].map((i) => (
                        <div key={i} className={`${styles.card} ${styles.skeleton}`}>
                            <div className={styles.skeletonIcon}></div>
                            <div className={styles.skeletonText}></div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default Lista_Cuentas_Demo
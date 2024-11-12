import styles from './Lista_Cuentas_Demo.module.css'

import {useState, useEffect} from 'react'

import { FaUserAlt } from "react-icons/fa";

import fetch_cuentas_demo from './fetch_cuentas_demo/fetch_cuentas_demo';


function Lista_Cuentas_Demo ({
    setCredenciales,
    setCanUpdate
}) {

    const [cuentasDemo, setCuentasDemo] = useState()
    if (cuentasDemo) {console.log('Already fetched.')}
    else {fetch_cuentas_demo(setCuentasDemo)}
    console.log('cuentas demo:', cuentasDemo)
    
    
    return (
        <section className={styles.container}>
            <div className={styles.textContainer}>
                <h2>Usar una cuenta demo</h2>
                <p>Ya tiene cargado productos, compras, ventas, etc.</p>
            </div>

            {cuentasDemo ? 
                <ul className={styles.listContainer}>
                    {cuentasDemo.map((cuentaDemoObj)=>{
                        return (
                            <li
                                onClick={()=> {
                                    setCredenciales({
                                        usuario: cuentaDemoObj.usuario,
                                        password: cuentaDemoObj.password
                                    })
                            
                                    setCanUpdate(true) 
                                    }
                                }
                            >
                                <button 
                                className={styles.botonCuenta}
                                >
                                    <span className={styles.cuentaDemoIcon}>
                                        <FaUserAlt />
                                    </span>
                                    {cuentaDemoObj.usuario}
                                </button>
                            </li>
                            )
                        })
                    }
                </ul>
                :
                <p>'Cargando...'</p>
            }

        </section>


    )
}

export default Lista_Cuentas_Demo
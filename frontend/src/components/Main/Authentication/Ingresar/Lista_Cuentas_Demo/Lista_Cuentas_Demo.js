import styles from './Lista_Cuentas_Demo.module.css'

import { FaUserAlt } from "react-icons/fa";

function Lista_Cuentas_Demo () {
    return (
        <section className={styles.container}>
            <div className={styles.textContainer}>
                <h2>Usar una cuenta demo</h2>
                <p>Ya tiene cargado productos, compras, ventas, etc.</p>
            </div>
            {/* Solo es un placeholder. Esta lista en realidad se saca de un FETCH al backend */}
            <ul className={styles.listContainer}>
                <li>
                    <button 
                        className={styles.botonCuenta}
                    >
                        <span className={styles.cuentaDemoIcon}>
                            <FaUserAlt />
                        </span>
                        sabroso23
                    </button>
                </li>
                <li>
                    <button 
                        className={styles.botonCuenta}
                    >
                        <span className={styles.cuentaDemoIcon}>
                            <FaUserAlt />
                        </span>
                        otro_usuario
                    </button>
                </li>
                <li>
                    <button 
                        className={styles.botonCuenta}
                    >
                        <span className={styles.cuentaDemoIcon}>
                            <FaUserAlt />
                        </span>
                        
                        multicuentaxd
                    </button>
                </li>
            </ul>
        </section>
    )
}

export default Lista_Cuentas_Demo
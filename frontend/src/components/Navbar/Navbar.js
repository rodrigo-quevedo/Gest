import styles from './Navbar.module.css'

import { MENUS } from '../../App'

export default function Navbar ({setMenu}) {
    return (
        <nav className={styles.navContainer}>
            <button>Lista de productos</button>
            <button>Ingresar nuevos productos</button>
            <button>Historial de productos ingresados</button>
            <button>Registrar venta</button>
            <button>Historial de ventas</button>

        </nav>
    )
}
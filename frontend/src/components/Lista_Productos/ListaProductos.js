import {useState} from 'react'

import styles from './ListaProductos.module.css'

import {MENUS} from '../../App'

export default function ListaProductos ({setMenu}) {
    // const [productos, setProductos] = useState([])
    // const [cargarLista, setCargarLista] = useState(true)

    // const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 
    // const URL_LISTA_PRODUCTOS = URL_EXPRESS_APP + '/productos'


    return (
        <section>
            <h1>Lista de productos</h1>
            <button className={styles.menuButton}
            onClick={()=>setMenu(MENUS[1])}>Ingresar nuevos productos</button>
            <button className={styles.menuButton}
            onClick={()=>setMenu(MENUS[2])}>Ingresar venta</button>
        </section>
    )
}
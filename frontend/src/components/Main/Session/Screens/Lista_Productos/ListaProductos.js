import {useState} from 'react'

import styles from './ListaProductos.module.css'


function ListaProductos () {
    document.querySelector('title').innerText = 'Lista de productos';
    // const [productos, setProductos] = useState([])
    // const [cargarLista, setCargarLista] = useState(true)

    // const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 
    // const URL_LISTA_PRODUCTOS = URL_EXPRESS_APP + '/productos'


    return (
        <div>
            <section>
                <h1>Lista de productos</h1>
                <button className={styles.menuButton}
                >Ingresar nuevos productos</button>
                <button className={styles.menuButton}
                >Ingresar venta</button>
            </section>
        </div>
        
    )
}

export default ListaProductos
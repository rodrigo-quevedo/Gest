import {useState} from 'react'

import styles from './ListaProductos.module.css'

import { FaSearch } from "react-icons/fa";

function ListaProductos () {
    document.querySelector('title').innerText = 'Lista de productos';
    // const [productos, setProductos] = useState([])
    // const [cargarLista, setCargarLista] = useState(true)

    // const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 
    // const URL_LISTA_PRODUCTOS = URL_EXPRESS_APP + '/productos'

    const [searchBoxClicked, setSearchBoxClicked] = useState(false)

    return (

        <section className={styles.container}>

            <h1>Lista de productos</h1>

            <form  id="searchBoxForm_ListaProductos">
                <div 
                    className={ searchBoxClicked ?
                        `${styles.searchBox} ${styles.searchBoxSelected}`    
                    :
                        styles.searchBox}
                    onFocus={()=>{setSearchBoxClicked(true)}}
                    onBlur={()=>setSearchBoxClicked(false)}
                >

                    <span>
                        <FaSearch />    
                    </span>

                    <input 
                        type='text'
                        placeholder='Buscar producto'
                    />

                </div>

            </form>

            <p>Producto - Cantidad - Precio Unitario - Calcular Precio (ingrese cantidad) - Marca - Proveedor</p>

        </section>
        
    )
}

export default ListaProductos
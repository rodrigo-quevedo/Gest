//css
import styles from './ListaProductos.module.css'

//hooks
import {useState, useEffect} from 'react'

//config
import {SEARCHBOX_STATE, URL_LISTA_PRODUCTOS} from '../../../../../../config/config'

//componentes
import SearchBox from './SearchBox/SearchBox';
import TablaProductos from './TablaProductos/TablaProductos'


function ListaProductos () {
    document.querySelector('title').innerText = 'Lista de productos';

    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)


    const [listaProductos, setListaProductos] = useState([{
        id: 0,
        producto: '-',
        cantidad: '-',
        precio_unitario: '-',
        marca: '-',
        proveedor: '-'
    }])




    return (

        <section className={styles.container}>

            <h1>Lista de productos</h1>

            <SearchBox
                // Estos states son independientes, se usan para las clases del mismo componente SearchBox.
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                // Pasandole otra URL puedo utilizar el componente SearchBox en otro lugar.
                URL_LISTA_PRODUCTOS={URL_LISTA_PRODUCTOS}
                setListaProductos={setListaProductos}
            />

            <TablaProductos
                searchBoxState={searchBoxState}
                listaProductos={listaProductos}
            />
            
        </section>
        
    )
}

export default ListaProductos
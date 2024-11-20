//css
import styles from './ListaProductos.module.css'

//hooks
import {useState} from 'react'

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import {URL_LISTA_PRODUCTOS} from '../../../../../../config/config'

//componentes
import SearchBox from '../../../../../componentes_reutilizables/SearchBox/SearchBox';
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable'


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
                URL= {URL_LISTA_PRODUCTOS}
                setter={setListaProductos}
            />

            <TablaReutilizable
                searchBoxState={searchBoxState}
                arrayState={listaProductos}

                tableHeaders={
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Marca</th>
                        <th>Proveedor</th>
                     </tr>
                }

                mapCallback={
                    (stateObj) => {
                        return (
                            <tr key={stateObj.id}>
                                <td>{stateObj.producto}</td>
                                <td>{stateObj.cantidad}</td>
                                <td>${stateObj.precio_unitario}</td>
                                <td>{stateObj.marca}</td>
                                <td>{stateObj.proveedor}</td>
                            </tr>
                        )
                    }
                }
            />
            
        </section>
        
    )
}

export default ListaProductos
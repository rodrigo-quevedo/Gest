//css
import styles from './HistorialProductos.module.css'

//react
import { useState, useEffect } from 'react';

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import { URL_HISTORIAL_PRODUCTOS } from '../../../../../../config/config';

//componentes
import SearchBox from '../../../../../componentes_reutilizables/SearchBox/SearchBox';
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable'

function HistorialProductos () {
    document.querySelector('title').innerText = 'Historial de productos';

    // cuando carga la pagina, buscar todo el historial
    useEffect(()=>{
        document.getElementById('searchBoxForm_ListaProductos').requestSubmit()
    }, [])

    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)


    const [listaProductos, setListaProductos] = useState([{
        id: 0,
        producto: '-',
        cantidad: '-',
        precio_unitario: '-',
        marca: '-',
        proveedor: '-',
        fechaHora: '-'
    }])

    return (
        <section className={styles.container}>

             <h1>Historial de Ingreso de Productos</h1>

             <SearchBox
                // Estos states son independientes, se usan para las clases del mismo componente SearchBox.
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                // Pasandole otra URL puedo utilizar el componente SearchBox en otro lugar.
                // URL={URL_LISTA_PRODUCTOS}
                URL={URL_HISTORIAL_PRODUCTOS}
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
                        <th>Fecha y Hora</th>
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

export default HistorialProductos
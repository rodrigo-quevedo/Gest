//css
import styles from './HistorialProductos.module.css'

//react
import { useState } from 'react';

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import { URL_HISTORIAL_PRODUCTOS } from '../../../../../../config/config';

//componentes
import SearchBox from '../../../../../componentes_reutilizables/SearchBox/SearchBox';
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable'

function HistorialProductos () {
    document.querySelector('title').innerText = 'Historial de productos';

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
                URL='https://jsonplaceholder.typicode.com/users'
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
                            // <tr key={productoObj.id}>
                            //     <td>{productoObj.producto}</td>
                            //     <td>{productoObj.cantidad}</td>
                            //     <td>${productoObj.precio_unitario}</td>
                            //     <td>{productoObj.marca}</td>
                            //     <td>{productoObj.proveedor}</td>
                            // </tr>

                            // test con json placeholder:
                            <tr key={stateObj.id}>
                                <td>{stateObj.name}</td>
                                <td>{stateObj.email}</td>
                                <td>${stateObj.phone}</td>
                                <td>{stateObj.username}</td>
                                <td>{stateObj.website}</td>
                                <td>{stateObj.website}</td>
                            </tr>
                        )
                    }
                }
            />

        </section>
    )
}

export default HistorialProductos
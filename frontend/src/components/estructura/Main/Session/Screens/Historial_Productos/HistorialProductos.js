//css
import styles from './HistorialProductos.module.css'

//react
import { useState, useEffect } from 'react';

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import { URL_HISTORIAL_PRODUCTOS } from '../../../../../../config/config';

//componentes
import SearchBox_busquedaLocal from '../../../../../componentes_reutilizables/SearchBox_busquedaLocal/SearchBox_busquedaLocal';
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable'

//logica formateo de fecha y hora
import formatDate from '../../../../../../utils/format_date/format_date';
import formatTime from '../../../../../../utils/format_date/format_time';


function HistorialProductos ({
    historialProductos
}
) {
    document.querySelector('title').innerText = 'Historial de productos';

    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)

    // se muestra todo el historial cuando carga la pagina
    const [arrayResultado, setArrayResultado] = useState(historialProductos)

    


    return (
        <section className={styles.container}>

             <h1>Historial de Ingreso de Productos</h1>

            <SearchBox_busquedaLocal
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}

                array={historialProductos}
                setArrayResultado={setArrayResultado}
            />

            <div className={styles.tableContainer}>
                <TablaReutilizable
                    searchBoxState={searchBoxState}
                    arrayState={arrayResultado}

                    tableHeaders={
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Marca</th>
                            <th>Proveedor</th>
                            <th>Fecha</th>
                            <th>Hora</th>
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
                                    <td>{formatDate(new Date(stateObj.fechaHora))}</td>
                                    <td>{formatTime(new Date(stateObj.fechaHora))}</td>
                                </tr>
                            )
                        }
                    }
                />
            </div>

        </section>
    )
}

export default HistorialProductos
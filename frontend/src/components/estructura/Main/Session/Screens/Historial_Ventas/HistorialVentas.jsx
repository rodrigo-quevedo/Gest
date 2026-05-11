//css
import styles from './HistorialVentas.module.css'

//hooks
import {useState, useEffect} from 'react'

//componentes
import SearchBox_busquedaLocal from '../../../../../componentes_reutilizables/SearchBox_busquedaLocal/SearchBox_busquedaLocal'
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable'

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import {URL_HISTORIAL_VENTAS} from '../../../../../../config/config'

//logica formateo de fecha y hora
import formatDate from '../../../../../../utils/format_date/format_date';
import formatTime from '../../../../../../utils/format_date/format_time';
//formateo precio
import formatPrice from '../../../../../../utils/format_prices/formatPrices'

function HistorialVentas ({
    HistorialVentas,
    listaProductos
}) {
    document.querySelector('title').innerText = 'Historial de ventas';

    
    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)
    
    // se muestra todo el historial cuando carga la pagina
    const [arrayResultado, setArrayResultado] = useState(HistorialVentas)


    return (
        <section className={styles.container}>

            <h1>Historia de Ventas</h1>

            <SearchBox_busquedaLocal 
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}

                array={HistorialVentas}
                setArrayResultado={setArrayResultado}

                listaProductos={listaProductos}
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
                            <th>Total vendido</th>
                            <th>Marca</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                        </tr>
                    }
                    mapCallback={
                        (productoObj) => {
                            return (
                                <tr key={productoObj.id}>
                                    <td>{productoObj.producto}</td>
                                    <td>{productoObj.cantidad}</td>
                                    <td>${formatPrice(productoObj.precio_unitario)}</td>
                                    <td>${formatPrice(productoObj.precio_unitario * productoObj.cantidad)}</td>
                                    <td>{productoObj.marca}</td>
                                    <td>{formatDate(new Date(productoObj.fechaHora))}</td>
                                    <td>{formatTime(new Date(productoObj.fechaHora))}</td>
                                </tr>
                            )
                        }
                    }
                />
            </div>

        </section>
    )
}

export default HistorialVentas
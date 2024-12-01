//css
import styles from './HistorialVentas.module.css'

//hooks
import {useState, useEffect} from 'react'

//componentes
import SearchBox from '../../../../../componentes_reutilizables/SearchBox/SearchBox';
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable'

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import {URL_HISTORIAL_VENTAS} from '../../../../../../config/config'



function HistorialVentas () {
    document.querySelector('title').innerText = 'Historial de ventas';

    
    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)


    const [listaVentas, setListaVentas] = useState([])


    // cuando carga la pagina, buscar todo el historial
    useEffect(()=>{
        document.getElementById('searchBoxForm_ListaProductos').requestSubmit()
    }, [])

    return (
        <section className={styles.container}>

            <h1>Historia de Ventas</h1>

            <SearchBox 
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                URL={URL_HISTORIAL_VENTAS}
                setter={setListaVentas}
            />

            <TablaReutilizable 
                searchBoxState={searchBoxState}
                arrayState={listaVentas}
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
                    (productoObj) => {
                        return (
                            <tr key={productoObj.id}>
                                <td>{productoObj.producto}</td>
                                <td>{productoObj.cantidad}</td>
                                <td>${productoObj.precio_unitario}</td>
                                <td>{productoObj.marca}</td>
                                <td>{productoObj.proveedor}</td>
                                <td>{productoObj.fechaHora}</td>
                            </tr>
                        )
                    }
                }
            />

        </section>
    )
}

export default HistorialVentas
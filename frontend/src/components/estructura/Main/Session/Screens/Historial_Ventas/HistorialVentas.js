//css
import styles from './HistorialVentas.module.css'

//hooks
import {useState} from 'react'

//componentes
import SearchBox from '../../../../../componentes_reutilizables/SearchBox/SearchBox';
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable'

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
// import {URL_HISTORIAL_VENTAS} from '../../../../../../config/config'
const test_URL_HISTORIAL_VENTAS = 'https://jsonplaceholder.typicode.com/users'


function HistorialVentas () {
    document.querySelector('title').innerText = 'Historial de ventas';

    
    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)


    const [listaVentas, setListaVentas] = useState([{
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

            <h1>Historia de Ventas</h1>

            <SearchBox 
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                URL={test_URL_HISTORIAL_VENTAS}
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
                    (stateObj) => {
                        return (
                            // <tr key={productoObj.id}>
                            //     <td>{productoObj.producto}</td>
                            //     <td>{productoObj.cantidad}</td>
                            //     <td>${productoObj.precio_unitario}</td>
                            //     <td>{productoObj.marca}</td>
                            //     <td>{productoObj.proveedor}</td>
                            //     <td>{productoObj.fechaHora}</td>
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

export default HistorialVentas
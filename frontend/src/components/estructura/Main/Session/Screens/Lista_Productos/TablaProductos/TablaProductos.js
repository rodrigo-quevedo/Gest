import styles from './TablaProductos.module.css'

import {SEARCHBOX_STATE} from '../../../../../../../config/config'


function TablaProductos ({
    searchBoxState,
    listaProductos
}) {
    return (
        <div 
            className={searchBoxState === SEARCHBOX_STATE.FETCH_SUCCESS ? 
                `${styles.tableContainer} ${styles.tableContainerLoaded}`
            :
                styles.tableContainer
        }
    >

            <table >

                <thead>

                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Marca</th>
                        <th>Proveedor</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        listaProductos.map(productoObj => {
                            return (
                                // <tr key={productoObj.id}>
                                //     <td>{productoObj.producto}</td>
                                //     <td>{productoObj.cantidad}</td>
                                //     <td>${productoObj.precio_unitario}</td>
                                //     <td>{productoObj.marca}</td>
                                //     <td>{productoObj.proveedor}</td>
                                // </tr>

                                // test con json placeholder:
                                <tr key={productoObj.id}>
                                    <td>{productoObj.name}</td>
                                    <td>{productoObj.email}</td>
                                    <td>${productoObj.phone}</td>
                                    <td>{productoObj.username}</td>
                                    <td>{productoObj.website}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>

        </div>
    )
}

export default TablaProductos
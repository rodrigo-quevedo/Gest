import styles from './Resumen_Producto.module.css'

//react
import { useState, useEffect } from 'react';

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import { URL_LISTA_PRODUCTOS, URL_HISTORIAL_PRODUCTOS, URL_HISTORIAL_VENTAS } from '../../../../../../config/config';


import SearchBox_resumen from '../../../../../componentes_reutilizables/SearchBox_resumen/SearchBox_resumen'
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable';

import { CiCircleInfo } from "react-icons/ci";
import { PiSealWarningBold } from "react-icons/pi";


function Resumen_Producto() {

        // cuando carga la pagina, buscar todo el historial
        useEffect(()=>{
            document.getElementById('searchBoxForm_ListaProductos').requestSubmit()
        }, [])
    
        const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)
    
    
        const [listaProductos, setListaProductos] = useState([])
        const [historialProductos, setHistorialProductos] = useState([])
        const [historialVentas, setHistorialVentas] = useState([])
        

    return (
        <div className={styles.container}>
            <h1>Resumen de producto</h1>
            <h3><CiCircleInfo/>Ingresa una palabra, ej: "sal", se van a buscar todas las coincidencias.</h3>
            <h3><CiCircleInfo/>Un nombre específico mejorará la búsqueda, ej: "aceite 1L"</h3>
            <h3><CiCircleInfo/>Se puede dejar vacio y enviar para obtener todos los productos</h3>
            <SearchBox_resumen
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                URL_lista={URL_LISTA_PRODUCTOS}
                setter_lista={setListaProductos}
                URL_historialProductos={URL_HISTORIAL_PRODUCTOS}
                setter_historialProductos={setHistorialProductos}
                URL_historialVentas={URL_HISTORIAL_VENTAS}
                setter_historialVentas={setHistorialVentas}
            />
            <h3><PiSealWarningBold/>Se distingue entre mayúscula y minúscula, ej: "ARROZ" es un producto distinto a "Arroz" o a "ARRoz".</h3>

            <div className={styles.tableSection}>

                <div className={styles.tableContainer}>
                    <h2>Lista de Productos</h2>
                    <TablaReutilizable
                        searchBoxState={searchBoxState}
                        arrayState={listaProductos}

                        tableHeaders={
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad Actual</th>
                                <th>Costo unitario</th>
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
                </div>

            
                <div className={styles.tableContainer}>
                    <h2>Historial de Productos</h2>
                    <TablaReutilizable
                        searchBoxState={searchBoxState}
                        arrayState={historialProductos}

                        tableHeaders={
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad ingresada</th>
                                <th>Costo unitario</th>
                                <th>Marca</th>
                                <th>Proveedor</th>
                                <th>Fecha y Hora de ingreso</th>
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
                                        <td>{stateObj.fechaHora}</td>
                                    </tr>
                                )
                            }
                        }
                    />
                </div>

                <div className={styles.tableContainer}>
                    <h2>Historial de ventas</h2>
                    <TablaReutilizable
                        searchBoxState={searchBoxState}
                        arrayState={historialVentas}

                        tableHeaders={
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad vendida</th>
                                <th>Precio unitario de venta</th>
                                <th>Marca</th>
                                <th>Proveedor</th>
                                <th>Fecha y Hora de venta</th>
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
                                        <td>{stateObj.fechaHora}</td>
                                    </tr>
                                )
                            }
                        }
                    />
                </div>
            </div>               
        </div>
    )

}

export default Resumen_Producto
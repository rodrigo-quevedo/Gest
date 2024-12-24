import styles from './Resumen_Producto.module.css'

//react
import { useState, useEffect } from 'react';

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import { URL_LISTA_PRODUCTOS, URL_HISTORIAL_PRODUCTOS, URL_HISTORIAL_VENTAS } from '../../../../../../config/config';


import SearchBox_resumen from '../../../../../componentes_reutilizables/SearchBox_resumen/SearchBox_resumen'
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable';

import formatDate from '../../../../../../utils/format_date/format_date';
import formatTime from '../../../../../../utils/format_date/format_time';

import { PiSealWarningBold } from "react-icons/pi";

import calcularTotalGastado from './finanza/calcularTotalGastado';
import calcularTotalVendido from './finanza/calcularTotalVendido';
import calcularGananciaActual from './finanza/calcularGananciaActual';

import GoUpButton from '../../../../../componentes_reutilizables/GoUpButton/GoUpButton'

function Resumen_Producto() {

    useEffect(()=>{
        // cuando carga la pagina, buscar todo el historial
        document.getElementById('searchBoxForm_ListaProductos').requestSubmit()

        // resetear estilos de producto seleccionado en tabla al clickear en "Lista completa <-|" (sin esto, al clickear ahí, se sigue marcando el último producto clickeado. No debería marcar nada, porque está buscando la lista completa.)
        document.getElementById("searchBoxListaCompletaButton").addEventListener('click', ()=>{setProductSelected(null)})
    }, [])
    
        const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)
    
    
        const [listaProductos, setListaProductos] = useState([])
        const [historialProductos, setHistorialProductos] = useState([])
        const [historialVentas, setHistorialVentas] = useState([])
        
        let totalGastado = calcularTotalGastado(historialProductos)
        let totalVendido = calcularTotalVendido(historialVentas)
        let totalGanancia = (totalVendido - totalGastado).toFixed(2)
        let totalMargen = calcularGananciaActual(historialProductos, historialVentas)
        //pongo todo en un array para poder usar TablaReutilizable
        let arrFinanza = [{
            totalGastado,
            totalVendido,
            totalGanancia,
            totalMargen
        }]

        const [productSelected, setProductSelected] = useState();

        

    return (
        <div className={styles.container}>
            <h1>Resumen de producto</h1>
            
            {/* <div className={styles.finanzaContainer}>
                Total gastado: <span className={styles.gastado}>${totalGastado}</span>
                Total vendido: <span className={styles.vendido}>${totalVendido}</span>
                Neto: <span 
                    className={
                        totalGanancia >=0 ?
                        styles.vendido : styles.gastado
                    }
                >${totalGanancia}</span>
                <br/>
                Ganancia sobre lo que se vendió: <span 
                    className={
                        totalMargen >=0 ?
                        styles.vendido : styles.gastado
                    }
                >${totalMargen}</span>
            </div> */}

            {/* <h3><CiCircleInfo/>Ingresa una palabra, ej: "sal", se van a buscar todas las coincidencias.</h3>
            <h3><CiCircleInfo/>Un nombre específico mejorará la búsqueda, ej: "aceite 1L"</h3> */}
            {/* <h3><CiCircleInfo/>Se puede dejar vacio y enviar para obtener todos los productos</h3> */}

            
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
            

        
            <h3><PiSealWarningBold/>NO se distingue entre mayúscula y minúscula, ej: "ARROZ" es un producto IGUAL que "Arroz" o a "ARRoz".</h3>
            <h3><PiSealWarningBold/>Fechas y horas configuradas para la zona horaria de este dispositivo: {Intl.DateTimeFormat().resolvedOptions().timeZone}</h3>

            <div className={styles.tableGridContainer} >
                <div className={styles.tableSection}>

                    <div className={styles.tableContainer} id="finanzaTable">
                        <h2>Finanza</h2>
                        <TablaReutilizable
                            searchBoxState={searchBoxState}
                            arrayState={arrFinanza}

                            tableHeaders={
                                <tr>
                                    <th>Total gastado</th>
                                    <th>Total vendido</th>
                                    <th>Neto</th>
                                    <th>Ganancia sobre lo vendido</th>
                                    
                                </tr>
                            }

                            mapCallback={
                                (stateObj) => {
                                    return (
                                        <tr key={stateObj.id}>
                                            <td>${stateObj.totalGastado}</td>
                                            <td>${stateObj.totalVendido}</td>
                                            <td>${stateObj.totalGanancia}</td>
                                            <td>${stateObj.totalMargen}</td>
                                        </tr>
                                    )
                                }
                            }
                        />
                    </div>

                    <div className={styles.tableContainer} id="productosTable">
                        <h2>Producto</h2>
                        <TablaReutilizable
                            searchBoxState={searchBoxState}
                            arrayState={listaProductos}

                            tableHeaders={
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad Actual</th>
                                    <th>Marca</th>
                                </tr>
                            }

                            mapCallback={
                                (stateObj) => {
                                    return (
                                        <tr 
                                            key={`${stateObj.producto}_${stateObj.marca}`}
                                            
                                            className={productSelected === `${stateObj.producto}_${stateObj.marca}` ? 
                                                    `${styles.hoveredTR} tableProductSelected` 
                                                : 
                                                    styles.hoveredTR
                                            }
                                            onClick={(e)=>{
                                                //establecer req body
                                                document.getElementById('searchBoxInput').value= stateObj.producto
                                                
                                                //fetch
                                                document.getElementById('searchBoxForm_ListaProductos').requestSubmit()

                                                setProductSelected(`${stateObj.producto}_${stateObj.marca}`)

                                            }}
                                        >
                                            <td>{stateObj.producto}</td>
                                            <td>{stateObj.cantidad}</td>
                                            <td>{stateObj.marca}</td>
                                        </tr>
                                    )
                                }
                            }
                        />
                    </div>

                    
                    <div className={styles.tableContainer} id="comprasTable">
                        <h2>Compras</h2>
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
                                    <th>Fecha de ingreso</th>
                                    <th>Hora de ingreso</th>
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

                    <div className={styles.tableContainer} id="ventasTable">
                        <h2>Ventas</h2>
                        <TablaReutilizable
                            searchBoxState={searchBoxState}
                            arrayState={historialVentas}

                            tableHeaders={
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad vendida</th>
                                    <th>Precio unitario de venta</th>
                                    <th>Marca</th>
                                    <th>Fecha de venta</th>
                                    <th>Hora de venta</th>
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
                                            <td>{formatDate(new Date(stateObj.fechaHora))}</td>
                                            <td>{formatTime(new Date(stateObj.fechaHora))}</td>
                                        </tr>
                                    )
                                }
                            }
                        />
                    </div>
                </div> 

            </div>              
        

            <GoUpButton/>
        </div>
    )

}

export default Resumen_Producto
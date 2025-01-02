//css
import styles from './Resumen_Producto.module.css'

//react
import { useState, useEffect } from 'react';

//config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
import { URL_LISTA_PRODUCTOS, URL_HISTORIAL_PRODUCTOS, URL_HISTORIAL_VENTAS } from '../../../../../../config/config';
import {SESSION_SCREENS} from "../../../../../../config/config"

//componentes
import SearchBox_resumen from '../../../../../componentes_reutilizables/SearchBox_resumen/SearchBox_resumen'
import TablaReutilizable from '../../../../../componentes_reutilizables/TablaReutilizable/TablaReutilizable';
import GoUpButton from '../../../../../componentes_reutilizables/GoUpButton/GoUpButton'


//icons
import { PiSealWarningBold } from "react-icons/pi";
import { FaTruckLoading } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";

//logica de este componente
import formatDate from '../../../../../../utils/format_date/format_date';
import formatTime from '../../../../../../utils/format_date/format_time';
import calcularTotalGastado from './finanza/calcularTotalGastado';
import calcularTotalVendido from './finanza/calcularTotalVendido';
import calcularGananciaActual from './finanza/calcularGananciaActual';


function Resumen_Producto({
    setSessionScreen,
    setProductoAIngresar,
    setProductoAVender,
    setPopupSessionExpired
}) {

    

    useEffect(()=>{
        // cambiar titulo
        document.title = "Resumen"

        // cuando carga la pagina, buscar todo el historial
        document.getElementById('searchBoxForm_ListaProductos').requestSubmit()

        // resetear estilos de producto seleccionado en tabla al clickear en "Lista completa <-|" (sin esto, al clickear ahí, se sigue marcando el último producto clickeado. No debería marcar nada, porque está buscando la lista completa.)
        document.getElementById("searchBoxListaCompletaButton").addEventListener('click', ()=>{
            setProductSelected(null)
        })

        // resetear layout al enviar la searchbox vacia
        document.getElementById("searchBoxForm_ListaProductos").addEventListener('submit', (e)=>{
            if (document.getElementById("searchBoxInput").value === ""){
                setProductSelected(null)
            }
        })
        

    }, [])
    
        //logica searchbox
        const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)
    
    
        //logica tablas
        const [listaProductos, setListaProductos] = useState([])
        const [historialProductos, setHistorialProductos] = useState([])
        const [historialVentas, setHistorialVentas] = useState([])
        const [productSelected, setProductSelected] = useState(null);
        

        
        //logica finanza
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


        //logica compra y venta
        const [ingresarProducto, setIngresarProducto] = useState(false)
        const [registrarVenta, setRegistrarVenta] = useState(false)

    return (
        <div>

            {productSelected !== null ? 
                <h1>Resumen de producto: {productSelected}</h1>
            :
                <h1>Resumen de producto</h1>
            }

            <h3 className={styles.infoText}><PiSealWarningBold/>NO se distingue entre mayúscula y minúscula, ej: "ARROZ" es un producto IGUAL que "Arroz" o a "ARRoz".</h3>
           

            <div className={styles.container}>

                <div className={styles.searchBoxContainer} >

                    <SearchBox_resumen
                        searchBoxState={searchBoxState}
                        setSearchBoxState={setSearchBoxState}
                        URL_lista={URL_LISTA_PRODUCTOS}
                        setter_lista={setListaProductos}
                        URL_historialProductos={URL_HISTORIAL_PRODUCTOS}
                        setter_historialProductos={setHistorialProductos}
                        URL_historialVentas={URL_HISTORIAL_VENTAS}
                        setter_historialVentas={setHistorialVentas}
                        setPopupSessionExpired={setPopupSessionExpired}
                    />
                </div>

                {
                    productSelected === null ? 
                        <>
                            <div className={styles.tableContainer} id="productosTable">
                                {
                                    ingresarProducto?
                                        <h2>Ingresar producto:</h2>
                                    :
                                        registrarVenta?
                                            <h2>Registrar venta:</h2>
                                        :
                                        <h2>Lista de productos (click en producto para ver resumen)</h2>
                                }

                                {
                                    ingresarProducto?
                                        <button 
                                            className={styles.ingresarNuevoProductoButton}
                                            onClick={()=>{
                                                setProductoAIngresar(null)
                                                setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)
                                            }}
                                        >
                                            + Nuevo producto
                                        </button>
                                        :
                                        null
                                }
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
                                                    key={stateObj.producto}
                                                    
                                                    className={productSelected === stateObj.producto ? 
                                                            `${styles.hoveredTR} tableProductSelected` 
                                                        : 
                                                            styles.hoveredTR
                                                    }
                                                    onClick={
                                                        ingresarProducto ?
                                                            
                                                            // manejar ingresar producto
                                                            (e)=>{
                                                                setProductoAIngresar({
                                                                    producto: stateObj.producto,
                                                                    marca: stateObj.marca
                                                                })

                                                                setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)
                                                            }
                                                        :
                                                            registrarVenta ? 
                                                                // manejar registro venta
                                                                (e)=>{
                                                                    setProductoAVender({
                                                                        producto: stateObj.producto,
                                                                        marca: stateObj.marca
                                                                    })

                                                                    setSessionScreen(SESSION_SCREENS.REGISTRAR_VENTAS)
                                                                }
                                                            :
                                                                // manejar resumen producto
                                                                (e)=>{
                                                                    //establecer req body
                                                                    document.getElementById('searchBoxInput').value= stateObj.producto
                                                                    
                                                                    //fetch
                                                                    document.getElementById('searchBoxForm_ListaProductos').requestSubmit()

                                                                    setProductSelected(stateObj.producto)
                                                                }
                                                }
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

                            <div className={styles.containerButtonCompraVenta}>
                                <button 
                                    className={
                                        ingresarProducto?
                                            `${styles.buttonCompraVenta} ${styles.buttonCompraVentaSeleccionado}`
                                        :
                                            styles.buttonCompraVenta
                                    }
                                    onClick={()=>{
                                        //activar/desactivar
                                        setIngresarProducto(!ingresarProducto)
                                        //siempre setear el otro a false
                                        setRegistrarVenta(false)
                                    }}
                                >
                                    Ingresar un producto
                                    <span className={styles.icon}>
                                        <FaTruckLoading/>
                                    </span>
                                </button>

                                <button 
                                    className={
                                        registrarVenta?
                                            `${styles.buttonCompraVenta} ${styles.buttonCompraVentaSeleccionado}`
                                        :
                                            styles.buttonCompraVenta
                                    }
                                    onClick={()=>{
                                        //activar/desactivar
                                        setRegistrarVenta(!registrarVenta)
                                        //siempre setear el otro a false
                                        setIngresarProducto(false)
                                    }}
                                >
                                    Registrar venta
                                    <span className={styles.icon}>
                                        <FaCashRegister/>
                                    </span>
                                </button>
                            </div>
                        </>
                    :
                        <>
                            {/* <div className={styles.finanzaYProductoContainer} > */}
                                <div className={styles.tableContainer} id="productoTableNotInteractive">
                                    <h2>Producto seleccionado</h2>
                                    <TablaReutilizable
                                        searchBoxState={searchBoxState}
                                        arrayState={listaProductos}

                                        tableHeaders={
                                            <tr>
                                                <th>Producto seleccionado</th>
                                                <th>Cantidad Actual</th>
                                                <th>Marca</th>
                                            </tr>
                                        }

                                        mapCallback={
                                            (stateObj) => {
                                                return (
                                                    <tr 
                                                        key={stateObj.producto}
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
                                                    //doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format#description
                                                    <tr key={stateObj.id}>
                                                        <td>${new Intl.NumberFormat("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 2}).format(stateObj.totalGastado)}</td>
                                                        <td>${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(stateObj.totalVendido)}</td>
                                                        <td>${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(stateObj.totalGanancia)}</td>
                                                        <td>${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(stateObj.totalMargen)}</td>
                                                    </tr>
                                                )
                                            }
                                        }
                                    />
                                </div>

                                
                            {/* </div> */}

                            <div className={styles.tableContainer} id="comprasTable">
                                <h2>Compras</h2>
                                <h3 className={styles.infoText}><PiSealWarningBold/>Fechas y horas configuradas para la zona horaria de este dispositivo: {Intl.DateTimeFormat().resolvedOptions().timeZone}</h3>
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
                                                    <td>${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(stateObj.precio_unitario)}</td>
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
                                <h3 className={styles.infoText}><PiSealWarningBold/>Fechas y horas configuradas para la zona horaria de este dispositivo: {Intl.DateTimeFormat().resolvedOptions().timeZone}</h3>
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
                                                    <td>${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(stateObj.precio_unitario)}</td>
                                                    <td>{stateObj.marca}</td>
                                                    <td>{formatDate(new Date(stateObj.fechaHora))}</td>
                                                    <td>{formatTime(new Date(stateObj.fechaHora))}</td>
                                                </tr>
                                            )
                                        }
                                    }
                                />
                            </div>
                        </>
                     
                }
                
            </div>

            <GoUpButton/>
        </div>
    )

}

export default Resumen_Producto
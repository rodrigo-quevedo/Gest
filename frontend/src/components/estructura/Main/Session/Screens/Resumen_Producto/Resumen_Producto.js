//css
import styles from './Resumen_Producto.module.css'

//react
import { useState, useEffect } from 'react';

//config
import {FETCH_STATUS, SEARCHBOX_STATE} from '../../../../../../config/config'
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
//formateo precios
import formatPrice from '../../../../../../utils/format_prices/formatPrices';


function Resumen_Producto({
    setSessionScreen,

    searchBoxState, setSearchBoxState,

    listaProductos, 
    historialProductos,
    historialVentas, 
    
    setProductoAIngresar,
    setProductoAVender,

    compraVentaFetchStatus,
    setCompraVentaFetchStatus
}) {

    //arrays a mostrar:
    const [listaProductosResult, setListaProductosResult] = useState(listaProductos)
    const [historialProductosResult, setHistorialProductosResult] = useState(historialProductos)
    const [historialVentasResult, setHistorialVentasResult] = useState(historialVentas)
    
    useEffect(()=>{
        //cuando carga la pagina, mostrar toda la lista de productos
        if (searchBoxState === SEARCHBOX_STATE.FETCH_SUCCESS){
            document.getElementById("searchBoxForm").requestSubmit();
            setSearchBoxState(SEARCHBOX_STATE.DEFAULT)
        }
    }, [searchBoxState])


    useEffect(()=>{
        // cambiar titulo
        document.title = "Resumen"

        // resetear estilos de producto seleccionado en tabla al clickear en "Lista completa <-|" (sin esto, al clickear ahí, se sigue marcando el último producto clickeado. No debería marcar nada, porque está buscando la lista completa.)
        document.getElementById("searchBoxListaCompletaButton").addEventListener('click', ()=>{
            setProductSelected(null)
        })

        // resetear layout al enviar la searchbox vacia
        document.getElementById("searchBoxForm").addEventListener('submit', (e)=>{
            if (document.getElementById("searchBoxInput").value === ""){
                setProductSelected(null)
            }
        })
        

    }, [])
    
        //logica tablas
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

        //logica mensaje error fetch (lista productos, historial productos, historial ventas)
        const [mensajeErrorFetch, setMensajeErrorFetch] = useState(null)
        useEffect(()=>{
            if (searchBoxState === SEARCHBOX_STATE.ERROR){
                setMensajeErrorFetch(
                    <p className={styles.mensajeErrorFetch}>
                        Hubo un error al obtener los datos desde el servidor. Recargue la página o presione F5.
                    </p>
                )
                setSearchBoxState(SEARCHBOX_STATE.DEFAULT)
            }
        }, [searchBoxState])
        
        //logica mensaje exito venta
        const [mensajeExitoCompraVenta, setMensajeExitoCompraVenta]= useState(null)     
        let exitoCompraVenta =
            <div 
                className={ mensajeExitoCompraVenta ? 
                    styles.resutadoSuccessMessage
                :
                    ''
                }
            > 
                {mensajeExitoCompraVenta}
                {mensajeExitoCompraVenta !== null ? 
                    <button

                        onClick={()=>{setMensajeExitoCompraVenta(null)}}
                    >
                        X
                    </button>
                :
                    null
                }
            </div>
        ;
        useEffect(()=>
        {
            if (compraVentaFetchStatus.status === FETCH_STATUS.SUCCESS) 
            {
                // console.log("*******************SUCCESS**********************")
    
                //mostrar mensaje success venta
                setMensajeExitoCompraVenta(compraVentaFetchStatus.resultado)
                    
                     
                //resetear
                setCompraVentaFetchStatus({
                    status: FETCH_STATUS.DEFAULT
                });   
            }
        }, [compraVentaFetchStatus])



    return (
        <div>

            {productSelected !== null ? 
                <h1>Resumen de producto: {productSelected}</h1>
            :
                <h1>Resumen de producto</h1>
            }

            <h3 className={styles.infoText}><PiSealWarningBold/>NO se distingue entre mayúscula y minúscula, ej: "ARROZ" es un producto IGUAL que "Arroz" o a "ARRoz".</h3>
           
            {mensajeErrorFetch}

            <div className={styles.container}>

                <div className={styles.searchBoxContainer} >

                    <SearchBox_resumen
                        searchBoxState={searchBoxState}
                        setSearchBoxState={setSearchBoxState}
                        
                        listaProductos={listaProductos}
                        historialProductos={historialProductos}
                        historialVentas={historialVentas}

                        setListaProductosResult={setListaProductosResult}
                        setHistorialProductosResult={setHistorialProductosResult}
                        setHistorialVentasResult={setHistorialVentasResult}
                    />

                </div>

               

                {
                    productSelected === null ? 
                        <>
                            
                            <div 
                                className={
                                    //compra
                                    ingresarProducto ?
                                        `${styles.tableContainer} ${styles.tableCompra}`
                                    :
                                        //venta
                                        registrarVenta ? 
                                            `${styles.tableContainer} ${styles.tableVenta}`
                                        :
                                        //lista
                                        styles.tableContainer
                                } 
                                id="productosTable"
                            >
                                
                                {exitoCompraVenta}
                                
                                {
                                    ingresarProducto?
                                        <h2 className={styles.compraTitle}>Ingresar producto (click en producto para ingresar más del mismo):</h2>
                                    :
                                        registrarVenta?
                                            <h2 className={styles.ventaTitle}>Registrar venta (click en producto para vender):</h2>
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
                                    arrayState={listaProductosResult}

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
                                                    
                                                    className={
                                                        //compra
                                                        ingresarProducto ? 
                                                        `${styles.hoveredTRIngreso}`
                                                        :
                                                            //venta
                                                            registrarVenta ?
                                                            `${styles.hoveredTRVenta}`
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
                                                                    document.getElementById('searchBoxForm').requestSubmit()

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
                                            `${styles.buttonCompraVenta} ${styles.buttonCompraSeleccionado}`
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
                                            `${styles.buttonCompraVenta} ${styles.buttonVentaSeleccionado}`
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
                                        arrayState={listaProductosResult}

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
                                    arrayState={historialProductosResult}

                                    tableHeaders={
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad ingresada</th>
                                            <th>Costo unitario</th>
                                            <th>Costo total</th>
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
                                                    <td>${formatPrice(stateObj.precio_unitario)}</td>
                                                    <td>${formatPrice(stateObj.precio_unitario * stateObj.cantidad)}</td>
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
                                    arrayState={historialVentasResult}

                                    tableHeaders={
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad vendida</th>
                                            <th>Precio unitario de venta</th>
                                            <th>Venta total</th>
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
                                                    <td>${formatPrice(stateObj.precio_unitario)}</td>
                                                    <td>${formatPrice(stateObj.precio_unitario * stateObj.cantidad)}</td>
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
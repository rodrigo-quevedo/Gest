import styles from './Session.module.css';

import {useState, useEffect} from 'react'

import Navbar from '../Navbar/Navbar'

//session screens:
import ListaProductos from '../Screens/Lista_Productos/ListaProductos'
import IngresarProductos from '../Screens/Ingresar_Productos/Ingresar_Productos_container/IngresarProductos'
import HistorialProductos from '../Screens/Historial_Productos/HistorialProductos'
import RegistrarVentas from '../Screens/Registrar_Ventas/RegistrarVentas'
import HistorialVentas from '../Screens/Historial_Ventas/HistorialVentas'
import Resumen_Producto from '../Screens/Resumen_Producto/Resumen_Producto';


import {SESSION_SCREENS} from '../../../../../config/config'
import { FETCH_STATUS } from '../../../../../config/config';

// logica fetch backend
import fetchBackend from '../../../../../utils/fetchBackend/fetch_backend/fetchBackend';
import { SEARCHBOX_STATE } from '../../../../../config/config';
import {URL_LISTA_PRODUCTOS, URL_HISTORIAL_PRODUCTOS, URL_HISTORIAL_VENTAS} from '../../../../../config/config';


function Session({
    setPopupSessionExpired
}) {

    // session screen
    const [sessionScreen, setSessionScreen] = useState(SESSION_SCREENS.RESUMEN_PRODUCTO)
    
    // ingreso de producto y registro de venta
    const [productoAIngresar, setProductoAIngresar] = useState(null)
    const [productoAVender, setProductoAVender] = useState(null)
        // fetch status
        const [compraVentaFetchStatus, setCompraVentaFetchStatus] = useState({
            status: FETCH_STATUS.DEFAULT
        })

    const [listaProductos, setListaProductos] = useState([])
    const [historialProductos, setHistorialProductos] = useState([])
    const [historialVentas, setHistorialVentas] = useState([])
    
    //logica fetch (listaProductos, historialProductos, historialVentas)
    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)

    // decidir si hacer fetch o usar la data que ya hay
    const [hacerFetch, setHacerFetch] = useState(true);
    useEffect(()=>{
        if (hacerFetch) {

            setSearchBoxState(SEARCHBOX_STATE.SUBMIT)

            fetchBackend(
                setSearchBoxState,
                URL_LISTA_PRODUCTOS,
                setListaProductos,
                {searchBoxInput: ''},
                setPopupSessionExpired,
                false
            )
    
            fetchBackend(
                setSearchBoxState,
                URL_HISTORIAL_PRODUCTOS,
                setHistorialProductos,
                {searchBoxInput: ''},
                setPopupSessionExpired,
                false
            )
    
            fetchBackend(
                setSearchBoxState,
                URL_HISTORIAL_VENTAS,
                setHistorialVentas,
                {searchBoxInput: ''},
                setPopupSessionExpired,
                true
            )
    
            setHacerFetch(false)
        }
    }, [hacerFetch])
    






    function mostrarScreen(screen) {
        switch(screen) {
            case SESSION_SCREENS.RESUMEN_PRODUCTO: {
                return <Resumen_Producto 
                            setSessionScreen={setSessionScreen}
                            
                            searchBoxState={searchBoxState}
                            setSearchBoxState={setSearchBoxState}

                            listaProductos={listaProductos} 
                            historialProductos={historialProductos} 
                            historialVentas={historialVentas} 

                            setProductoAIngresar={setProductoAIngresar}
                            setProductoAVender={setProductoAVender}
                            
                            compraVentaFetchStatus={compraVentaFetchStatus}
                            setCompraVentaFetchStatus={setCompraVentaFetchStatus}
                        />
            }
            // case SESSION_SCREENS.LISTA_PRODUCTOS: {
            //     return <ListaProductos />
            // }
            case SESSION_SCREENS.INGRESAR_PRODUCTOS: {
                return <IngresarProductos 
                            setSessionScreen={setSessionScreen}

                            productoAIngresar={productoAIngresar}

                            compraFetchStatus={compraVentaFetchStatus}
                            setCompraFetchStatus={setCompraVentaFetchStatus}

                            setHacerFetch={setHacerFetch}

                            listaProductos={listaProductos}
                            historialProductos={historialProductos}
                        />
            }
            case SESSION_SCREENS.REGISTRAR_VENTAS : {
                return <RegistrarVentas 
                            setSessionScreen={setSessionScreen}

                            productoAVender={productoAVender}
                            
                            ventaFetchStatus={compraVentaFetchStatus}
                            setVentaFetchStatus={setCompraVentaFetchStatus}

                            historialProductos={historialProductos}
                            listaProductos={listaProductos}

                            setHacerFetch={setHacerFetch}
                        />
            }
            case SESSION_SCREENS.HISTORIAL_PRODUCTOS: {
                return <HistorialProductos 
                    historialProductos={historialProductos}
                    listaProductos={listaProductos}
                />
            }
            case SESSION_SCREENS.HISTORIAL_VENTAS : {
                return <HistorialVentas 
                    HistorialVentas={historialVentas}
                    listaProductos={listaProductos}
                />
            }

        }
    }

  return (
    <div className={styles.sessionContainer}>

        <section className={styles.navbarContainer}>

            <Navbar 
                //elegir la session screen [ListaProductos/IngresarProductos/HistorialProductos/RegistrarVentas/HistorialVentas]:
                sessionScreen={sessionScreen}

                //setear la session screen [ListaProductos/IngresarProductos/HistorialProductos/RegistrarVentas/HistorialVentas]:
                setSessionScreen={setSessionScreen}

                // bloquear navegacion cuando se esta realizando el fetch
                searchBoxState={searchBoxState}

            />

        </section>
        

        <section className={styles.screenContainer}>

            {
                mostrarScreen(sessionScreen)
            }

            {/* <GoUpButton/> */}

        </section>

    </div>

  )

}

export default Session
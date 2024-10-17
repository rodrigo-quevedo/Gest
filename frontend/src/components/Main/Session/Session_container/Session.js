import styles from './Session.module.css';

import {useState} from 'react'

import Navbar from '../Navbar/Navbar'

//session screens:
// import ListaProductos from '../Screens/Lista_Productos/ListaProductos'
// import ListaCompras from '../Screens/Historial_Productos/HistorialProductos'
// import CargarCompra from '../Screens/Ingresar_Productos/Ingresar_Productos_container/IngresarProductos'
// import ListaVentas from '../Screens/Historial_Ventas/HistorialVentas'
// import CargarVenta from '../Screens/Registrar_Ventas/RegistrarVentas'

import {SESSION_SCREENS} from '../../../../config/config'

function Session() {

    const [sessionScreen, setSessionScreen] = useState(SESSION_SCREENS.LISTA_PRODUCTOS)

    // function mostrarScreen(screen) {
    //     switch(screen) {
    //         case "LISTA_PRODUCTOS": {
    //             return <ListaProductos />
    //         }
    //         case "COMPRA": {
    //             return <CargarCompra />
    //         }
    //         case "LISTA_COMPRAS": {
    //             return <ListaCompras />
    //         }
    //         case "VENTA" : {
    //             return <CargarVenta />
    //         }
    //         case "LISTA_VENTAS" : {
    //             return <ListaVentas />
    //         }

    //     }
    // }

  return (
    <div className={styles.sessionContainer}>

        <section className={styles.navbarContainer}>

            <Navbar 
                //elegir la session screen [ListaProductos/IngresarProductos/HistorialProductos/RegistrarVentas/HistorialVentas]:
                sessionScreen={sessionScreen}

                //setear la session screen [ListaProductos/IngresarProductos/HistorialProductos/RegistrarVentas/HistorialVentas]:
                setSessionScreen={setSessionScreen}
            />

        </section>
        

        <section className={styles.screenContainer}>

            {
                // mostrarScreen(sessionScreen)
            }

        </section>

    </div>

  )

}

export default Session
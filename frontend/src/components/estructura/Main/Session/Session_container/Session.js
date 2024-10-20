import styles from './Session.module.css';

import {useState} from 'react'

import Navbar from '../Navbar/Navbar'

//session screens:
import ListaProductos from '../Screens/Lista_Productos/ListaProductos'
import IngresarProductos from '../Screens/Ingresar_Productos/Ingresar_Productos_container/IngresarProductos'
import HistorialProductos from '../Screens/Historial_Productos/HistorialProductos'
import RegistrarVentas from '../Screens/Registrar_Ventas/RegistrarVentas'
import HistorialVentas from '../Screens/Historial_Ventas/HistorialVentas'

import {SESSION_SCREENS} from '../../../../../config/config'

function Session() {

    const [sessionScreen, setSessionScreen] = useState(SESSION_SCREENS.LISTA_PRODUCTOS)

    function mostrarScreen(screen) {
        switch(screen) {
            case SESSION_SCREENS.LISTA_PRODUCTOS: {
                return <ListaProductos />
            }
            case SESSION_SCREENS.INGRESAR_PRODUCTOS: {
                return <IngresarProductos />
            }
            case SESSION_SCREENS.HISTORIAL_PRODUCTOS: {
                return <HistorialProductos />
            }
            case SESSION_SCREENS.REGISTRAR_VENTAS : {
                return <RegistrarVentas />
            }
            case SESSION_SCREENS.HISTORIAL_VENTAS : {
                return <HistorialVentas />
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
            />

        </section>
        

        <section className={styles.screenContainer}>

            {
                mostrarScreen(sessionScreen)
            }

        </section>

    </div>

  )

}

export default Session
import {useState} from 'react'

import styles from './Session.module.css';

//components
import Navbar from '../Navbar/Navbar'
import ListaProductos from '../Screens/Lista_Productos/ListaProductos'
import ListaCompras from '../Screens/Historial_Productos/HistorialProductos'
import CargarCompra from '../Screens/Ingresar_Productos/Ingresar_Productos_container/IngresarProductos'
import ListaVentas from '../Screens/Historial_Ventas/HistorialVentas'
import CargarVenta from '../Screens/Registrar_Ventas/RegistrarVentas'


export const MENUS = ["LISTA_PRODUCTOS", "COMPRA", "LISTA_COMPRAS", "VENTA","LISTA_VENTAS"]

function Session({setWebpageTitle}) {
    const [sessionMain, setSessionMain] = useState('LISTA_PRODUCTOS')

    function mostrarScreen(screen) {
        switch(screen) {
            case "LISTA_PRODUCTOS": {
                return <ListaProductos setWebpageTitle={setWebpageTitle}/>
            }
            case "COMPRA": {
                return <CargarCompra setWebpageTitle={setWebpageTitle}/>
            }
            case "LISTA_COMPRAS": {
                return <ListaCompras setWebpageTitle={setWebpageTitle}/>
            }
            case "VENTA" : {
                return <CargarVenta setWebpageTitle={setWebpageTitle}/>
            }
            case "LISTA_VENTAS" : {
                return <ListaVentas setWebpageTitle={setWebpageTitle}/>
            }

        }
    }

  return (
    <div className={styles.appContainer}>
        <section className={styles.appHeader}>
            <Navbar setMenu={setSessionMain} menu={sessionMain}/>
        </section>
        
        <section className={styles.appMain}>
            {mostrarScreen(sessionMain)}
        </section>
    </div>
  );
}

export default Session;
import {useState} from 'react'

import styles from './App_Despues_De_Login.module.css';

//components
// import SectionAgregarProducto from './components/Section_Producto/SectionProducto';
import Navbar from './Header/Navbar/Navbar';
import ListaProductos from './Main/Lista_Productos/ListaProductos';
import ListaCompras from './Main/Lista_Compras/ListaCompras'
import CargarCompra from './Main/Cargar_Compra/CargarCompra';
import ListaVentas from './Main/Lista_Ventas/ListaVentas'
import CargarVenta from './Main/Cargar_Venta/CargarVenta';


// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
export const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

export const MENUS = ["LISTA_PRODUCTOS", "COMPRA", "LISTA_COMPRAS", "VENTA","LISTA_VENTAS"]

function App_Despues_De_Login() {
    const [menu, setMenu] = useState('LISTA_PRODUCTOS')

    function mostrarMenu(menu) {
        switch(menu) {
            case "LISTA_PRODUCTOS": {
                return <ListaProductos/>
            }
            case "COMPRA": {
                return <CargarCompra/>
            }
            case "LISTA_COMPRAS": {
                return <ListaCompras/>
            }
            case "VENTA" : {
                return <CargarVenta/>
            }
            case "LISTA_VENTAS" : {
                return <ListaVentas/>
            }

        }
    }

  return (
    <div className={styles.appContainer}>
        <header className={styles.appHeader}>
            <Navbar setMenu={setMenu} menu={menu}/>
        </header>
        <main className={styles.appMain}>
            {mostrarMenu(menu)}
        </main>
        <footer className={styles.appFooter}>
            
        </footer>
    </div>
  );
}

export default App_Despues_De_Login;
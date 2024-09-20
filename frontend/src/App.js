import {useState} from 'react'

import styles from './App.module.css';

//components
// import SectionAgregarProducto from './components/Section_Producto/SectionProducto';
import Navbar from './components/Navbar/Navbar';
import ListaProductos from './components/Lista_Productos/ListaProductos';
import ListaCompras from './components/Lista_Compras/ListaCompras'
import CargarCompra from './components/Cargar_Compra/CargarCompra';
import ListaVentas from './components/Lista_Ventas/ListaVentas'
import CargarVenta from './components/Cargar_Venta/CargarVenta';


// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
export const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

export const MENUS = ["LISTA_PRODUCTOS", "COMPRA", "LISTA_COMPRAS", "VENTA","LISTA_VENTAS"]

function App() {
    const [menu, setMenu] = useState('LISTA_PRODUCTOS')

    function mostrarMenu(menu) {
        switch(menu) {
            case "LISTA_PRODUCTOS": {
                return <ListaProductos/>
            }
            case "LISTA_COMPRAS": {
                return <ListaCompras/>
            }
            case "COMPRA": {
                return <CargarCompra/>
            }
            case "LISTA_VENTAS" : {
                return <ListaVentas/>
            }
            case "VENTA" : {
                return <CargarVenta/>
            }

        }
    }

  return (
    <div className={styles.appContainer}>
        {/* <SectionAgregarProducto /> */}
        <Navbar setMenu={setMenu}/>
        {mostrarMenu(menu)}
    </div>
  );
}

export default App;
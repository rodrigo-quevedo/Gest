import {useState} from 'react'

import './App.css';

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

export const MENUS = ["LISTA_PRODUCTOS", "LISTA_COMPRAS", "COMPRA", "LISTA_VENTAS", "VENTA"]

function App() {
    const [menu, setMenu] = useState('LISTA')

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
    <>
        {/* <SectionAgregarProducto /> */}
        {/* {mostrarMenu(menu)} */}
        <Navbar setMenu={setMenu}/>
    </>
  );
}

export default App;
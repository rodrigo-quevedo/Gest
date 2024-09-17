import {useState} from 'react'

import './App.css';

//components
// import SectionAgregarProducto from './components/Section_Producto/SectionProducto';
import ListaProductos from './components/Lista_Productos/ListaProductos';
import CargarCompra from './components/Cargar_Compra/CargarCompra';
import CargarVenta from './components/Cargar_Venta/CargarVenta';

// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
export const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

export const MENUS = ["LISTA", "COMPRA", "VENTA"]

function App() {
    const [menu, setMenu] = useState('LISTA')

    function mostrarMenu(menu) {
        switch(menu) {
            case "LISTA": {
                return <ListaProductos setMenu={setMenu}/>
            }
            case "COMPRA": {
                return <CargarCompra setMenu={setMenu}/>
            }
            case "VENTA" : {
                return <CargarVenta setMenu={setMenu}/>
            }

        }
    }

  return (
    <>
        {/* <SectionAgregarProducto /> */}
        {mostrarMenu(menu)}
    </>
  );
}

export default App;

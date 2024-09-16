import {useState} from 'react'

import './SectionProducto.css'

import FormAgregarProducto from "./Agregar_Producto/FormAgregarProducto"
import ListaProductos from './Lista_Productos/ListaProductos'


const AgregarProductoSection = () => {
    const [pedirLista, setPedirLista] = useState(true)

    return (
        <section className="containerSectionProducto">
            <FormAgregarProducto setPedirLista={setPedirLista}/>
            
            <ListaProductos pedirLista={pedirLista} setPedirLista={setPedirLista}/>

        </section>
    )
}
export default AgregarProductoSection;
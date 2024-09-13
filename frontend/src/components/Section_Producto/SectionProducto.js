import {useState} from 'react'

import './SectionProducto.css'

import FormAgregarProducto from "./Agregar_Producto/FormAgregarProducto"
import ListaProductos from './Lista_Productos/ListaProductos'


const AgregarProductoSection = () => {

    // const [productos, setProductos] = useState([])

    // const agregarProducto = (producto) => {
        
    //     setProductos([...productos, 
    //         <li key={producto.id}>
    //             <span>{producto.product}</span>
    //         </li>
    //     ]
    //     )
    // }

    return (
        <section className="containerSectionProducto">
            <FormAgregarProducto/>
            
            <ListaProductos />

        </section>
    )
}
export default AgregarProductoSection;
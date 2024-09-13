import {useState} from 'react'

import './SectionProducto.css'

import FormAgregarProducto from "./Agregar Producto/FormAgregarProducto"
import ListaProductos from './Lista Productos/ListaProductos'


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
        <section className="container">
            <FormAgregarProducto 
            agregarProductoProp={agregarProducto}/>
            
            <ListaProductos />

        </section>
    )
}
export default AgregarProductoSection;
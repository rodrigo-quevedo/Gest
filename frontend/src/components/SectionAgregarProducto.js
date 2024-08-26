import {useState} from 'react'

import './SectionAgregarProducto.css'

import FormAgregarProducto from "./FormAgregarProducto"

const AgregarProductoSection = () => {

    const [productos, setProductos] = useState([])

    const agregarProducto = (producto) => {
        
        setProductos([...productos, 
            <li key={producto.id}>
                <span>{producto.product}</span>
            </li>
        ]
        )
    }

    return (
        <section className="container">
            <FormAgregarProducto 
            agregarProductoProp={agregarProducto}/>
            
            <ul>
                {productos.length === 0? productos: null}
            </ul>
            
        </section>
    )
}
export default AgregarProductoSection;
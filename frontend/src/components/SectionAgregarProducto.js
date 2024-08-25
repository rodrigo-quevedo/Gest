import './SectionAgregarProducto.css'

import FormAgregarProducto from "./FormAgregarProducto"

import {useState} from 'react'

const [productos, setProductos] = useState([])

const agregarProducto = (producto) => {
    setProductos([...productos, 
        <li key={producto.id}>
            <span>{producto.product}</span>
        </li>
    ]
    )
}

const AgregarProductoSection = () => {
    return (
        <section className="container">
            <FormAgregarProducto 
            agregarProductoProp={agregarProducto}/>
            
            <ul>
                {productos}
            </ul>
            
        </section>
    )
}
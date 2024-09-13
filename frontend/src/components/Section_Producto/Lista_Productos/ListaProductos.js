import './ListaProductos.css'

import {useState} from 'react'

const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP
let URL_PRODUCTOS = URL_EXPRESS_APP + `/productos`

const ListaProductos = () => {
    const [productos, setProductos] = useState(null)

    const getProductos = () => {
        fetch(URL_PRODUCTOS, {
            method: 'GET'
        })
        .then((Response) => {
            Response.json()
            .then((BodyOfResponseJSONString) => {
                console.log(`Lista JSON sin parsear:`, BodyOfResponseJSONString)
                setProductos(JSON.parse(BodyOfResponseJSONString))
            })
            .catch((err)=> console.log('JS fetch: Error obteniendo el body de la Response', err))
        })
        .catch(err => console.log('JS Fetch: No se pudo hacer la request.', err))
    }

    getProductos()

    const  listaProductos = productos ?
    productos.map((producto) => {
        return <li className="productoEnLista">{producto.product}</li>
    })
    :
    <p>No se pudo obtener la lista de productos del servidor</p>
    
    

    return (
        <div className="containerListaProducto">
            <ul>
                {listaProductos}
            </ul>
        </div>  
    )


}

export default ListaProductos
import './ListaProductos.css'

import {useState} from 'react'

const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP
let URL_PRODUCTOS = URL_EXPRESS_APP + `/productos`

const ListaProductos = () => {
    const [pedirLista, setPedirLista] = useState(true)
    const [listaProductos, setListaProductos] = useState(<p>No se pudo obtener la lista de productos del servidor</p>)

    const getProductos = () => {
        fetch(URL_PRODUCTOS, {
            method: 'GET'
        })
        .then((Response) => {
            Response.json()
            .then((BodyOfResponseJSONString) => {
                console.log(`Lista JSON sin parsear:`, BodyOfResponseJSONString)
                setPedirLista(false)
                let productos = JSON.parse(BodyOfResponseJSONString)                
                setListaProductos(
                    productos.map((producto) => {
                        return <li className="productoEnLista">{producto.product}</li>
                    })
                )
            })
            .catch((err)=> console.log('JS fetch: Error obteniendo el body de la Response', err))
        })
        .catch(err => console.log('JS Fetch: No se pudo hacer la request.', err))
    }
    
    if (pedirLista) getProductos();

    // if (pedirLista) {
        // const productos = getProductos()
        // listaProductos = productos.map((producto) => {
        //     return <li className="productoEnLista">{producto.product}</li>
        // })
    // }
    

    return (
        <div className="containerListaProducto">
            <ul>
                {listaProductos}
            </ul>
        </div>  
    )


}

export default ListaProductos
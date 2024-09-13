import URL_EXPRESS_APP from '../../../App'

let URL_PRODUCTOS = URL_EXPRESS_APP + `/productos`

export default ListaProductos = () => {
    
    let productos = fetch(URL_PRODUCTOS, {
        method: 'GET'
    })
    .then((Response) => {
        Response.json()
        .then((BodyOfResponseObj) => {
            return JSON.parse(BodyOfResponseObj)
        })
        .catch((err)=> console.log('JS fetch: Error obteniendo el body de la Response', err))
    })
    .catch(err => console.log('JS Fetch: No se pudo hacer la request.', err))

    
    

    return (
        <div className="container">
            <ul>
                
            </ul>
        </div>  
    )


}
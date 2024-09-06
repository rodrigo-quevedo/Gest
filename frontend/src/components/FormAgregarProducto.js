import './FormAgregarProducto.css'

// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

const AgregarProductoForm = ({agregarProductoProp}) => {

    const handleSubmit = (e) => {
        console.log("Entering handleSubmit")
        e.preventDefault();
    
        fetch(URL_EXPRESS_APP, {
            method: 'POST',
            body: JSON.stringify(
                Object.fromEntries(
                    new FormData(document.getElementById("formAgregarProducto"))
                )
            ),
            // body: JSON.stringify({myRequest: "REQUEST OK"}),//test
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
        .then((ResponseBodyJSONString)=> {
            console.log('respuesta del server ok:', ResponseBodyJSONString)
            ResponseBodyJSONString.json()
            .then(
                (ResponseBodyObj) => {
                    if (JSON.parse(ResponseBodyObj).success) {
                        // agregarProductoProp(ResponseBodyObj.producto)
                        console.log('Producto agregado correctamente:', JSON.parse(ResponseBodyObj))
                    }
                    else {
                        console.log('El servidor indica que hubo un error:',JSON.parse(ResponseBodyObj))
                    }
                }
            )
            .catch((err)=> {console.log(err)})
        })
        .catch((err)=> {console.log(err)}) 
    }


    return (
        <form onSubmit={handleSubmit} id="formAgregarProducto">
            <label htmlFor="producto">Product: </label>
            <input 
            type="text" 
            className="input"
            id="producto"
            name="product"/>

            <input type="submit" value="Añadir producto"/>
        </form>
    )
}
export default AgregarProductoForm
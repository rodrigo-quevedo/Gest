import './FormAgregarProducto.css'

// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

const AgregarProductoForm = ({agregarProductoProp}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch(URL_EXPRESS_APP, {
            method: 'POST',
            body: JSON.stringify(
                Object.fromEntries(
                    new FormData(document.getElementById("formAgregarProducto"))
                )
            )
            
        })
        .then((ResponseObj)=> {
            ResponseObj.json()
            .then(
                (ObjOfBodyOfResponse) => {
                    if (ObjOfBodyOfResponse.success) {
                        agregarProductoProp(ObjOfBodyOfResponse.producto)
                    }
                    else {}
                }
            )
        })
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
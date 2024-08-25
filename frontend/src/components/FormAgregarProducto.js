import './FormAgregarProducto.css'

// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

const form = document.getElementById("formAgregarProducto")

const handleSubmit = (e) => {
    e.preventDefault();

    fetch(URL_EXPRESS_APP, {
        method: 'POST',
        body: JSON.stringify(
            Object.fromEntries(
                new FormData(form)
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

const AgregarProductoForm = ({agregarProductoProp}) => {
    return (
        <form onSubmit={handleSubmit} id="formAgregarProducto">
            <label for="producto">Product: </label>
            <input 
            type="text" 
            class="input"
            id="producto"
            name="product"/>

            <input type="submit" value="Añadir producto"/>
        </form>
    )
}

export default AgregarProductoForm
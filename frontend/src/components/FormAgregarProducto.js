import './FormAgregarProducto.css'

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
    .then((res)=> {
        res.json()
    })
}

const AddProductForm = () => {
    return (
        <div className="container">
            <form onSubmit={handleSubmit} id="formAgregarProducto">
                <label for="product">Product: </label>
                <input 
                type="text" 
                class="input"
                id="product"
                name="product"/>

                <input type="submit" value="Añadir producto"/>
            </form>
        </div>
    )
}

export default AddProductForm
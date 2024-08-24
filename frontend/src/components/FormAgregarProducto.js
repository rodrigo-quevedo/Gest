import './FormAgregarProducto.css'

const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

const handleSubmit = (e) => {
    e.preventDefault();
}

const AddProductForm = () => {
    return (
        <div className="container">
            <form action={URL_EXPRESS_APP} method="GET" 
            onSubmit={handleSubmit}>
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
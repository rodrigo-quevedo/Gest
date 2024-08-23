import './AddProductForm.css'

const AddProductForm = () => {
    return (
        <div className="container">
            <form action="http://localhost:3003/" method="POST">
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
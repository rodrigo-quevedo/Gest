import styles from '../Autosugerencias_productoFormulario/AutosugerenciasFormulario.module.css'


function manejarClick (elementId, marca, setMarcaSearchString, setMarcaInputActivo){
    document.getElementById(elementId).value = marca
    setMarcaSearchString(marca)
    setMarcaInputActivo(false)
}

function Autosugerencias_marcaFormulario({
    productoSearchString,

    marcaSearchString, setMarcaSearchString,
    marcaInputActivo, setMarcaInputActivo,

    listaProductos

}){

    // Array de marcas sin repetir
    let listaMarcasSinRepetir = [];
    let listaMarcasRepetidas = listaProductos.map(prodObj => prodObj.marca);

    listaMarcasRepetidas.forEach((marca, marcaIndex)=>{
        if (listaMarcasRepetidas.indexOf(marca) === marcaIndex){
            listaMarcasSinRepetir.push(marca.toUpperCase())
        }
    })
    //

    // Array de productos sin repetir
    let listaProductosSinRepetir = [];
    let listaProductosRepetidos = listaProductos.map(prodObj => prodObj.producto);

    listaProductosRepetidos.forEach((producto, productoIndex)=>{
        if (listaProductosRepetidos.indexOf(producto) === productoIndex){
            listaProductosSinRepetir.push(producto.toUpperCase())
        }
    })

    
    let arrayListItems = []; // Filtrado de marcas

    // no hay producto y tampoco marca: devuelvo todas las marcas
    if(
        (listaProductosSinRepetir.indexOf(productoSearchString.toUpperCase()) === -1)
        && 
        marcaSearchString === ''
    ){
        arrayListItems = listaMarcasSinRepetir.map((marca)=>{
            return (
                <li
                    onMouseDown={()=>{
                        manejarClick('marca', marca, setMarcaSearchString, setMarcaInputActivo)
                    }}
                >
                    {marca}
                </li>
            )
        })
    }

    // no hay producto y si hay marca: devuelvo todas las marcas que coinciden
    else if (
        (listaProductosSinRepetir.indexOf(productoSearchString.toUpperCase()) === -1) 
    ){
        arrayListItems = listaMarcasSinRepetir.map((marca)=>{
            if (marca.includes(marcaSearchString.toUpperCase())) {
                return (
                    <li
                        onMouseDown={()=>{
                            manejarClick('marca', marca, setMarcaSearchString, setMarcaInputActivo)
                        }}
                    >
                        {marca}
                    </li>
                )
            }
        })
    }

    // hay producto y no hay marca: devuelvo todas las marcas de ese producto
    else if (listaProductosSinRepetir.indexOf(productoSearchString.toUpperCase()) !== -1){ // el input coincide con algun producto de la lista de productos (en esa lista no hay repeticiones)
        listaProductos.forEach((prodObj)=>{
            if (
                prodObj.producto === productoSearchString.toUpperCase()
                &&
                marcaSearchString === ''
            ){ // para cada producto de la lista de productos igual al input
                arrayListItems.push( // se va a agregar un <li> con su marca correspondiente
                    <li
                        onMouseDown={()=>{
                            manejarClick('marca', prodObj.marca, setMarcaSearchString, setMarcaInputActivo)
                        }}
                    >
                        {prodObj.marca}
                    </li>
                )
            }


            // hay producto y hay marca: devuelvo todas las marcas de ese producto
            else if (
                prodObj.producto === productoSearchString.toUpperCase()
                &&
                prodObj.marca.toUpperCase().includes(marcaSearchString.toUpperCase())
            ){ // para cada producto de la lista de productos igual al input Y con marca parecida/igual
                arrayListItems.push( // se va a agregar un <li> con su marca correspondiente
                    <li
                        onMouseDown={()=>{
                            manejarClick('marca', prodObj.marca, setMarcaSearchString, setMarcaInputActivo)
                        }}
                    >
                        {prodObj.marca}
                    </li>
                )
            }
        })
    }






    return (
        <ul 
            className={
                marcaInputActivo ?
                styles.autosugerenciaContainer
                :
                styles.hide
            }
        >
            
            {arrayListItems}

        </ul>
    )
}

export default Autosugerencias_marcaFormulario
import styles from '../Autosugerencias_productoFormulario/AutosugerenciasFormulario.module.css'

function manejarClick(elementId, value, setProductoInputActivo, setProductoSearchString){
    document.getElementById(elementId).value = value
    setProductoInputActivo(false)
    setProductoSearchString(value)
}

function Autosugerencias_precioFormulario({
    productoSearchString,
    
    precioSearchString, setPrecioSearchString,
    precioInputActivo, setPrecioInputActivo,

    listaProductos,
    historialProductos

}){

    // No repetir precios
    let listaPreciosRepetidos = historialProductos.map((compraObj)=>{return compraObj.precio_unitario})

    let listaPreciosSinRepetir = [];
    listaPreciosRepetidos.forEach((precio, index)=>{
        if (listaPreciosRepetidos.indexOf(precio) === index) {
            listaPreciosSinRepetir.push(precio)
        }
    })

        // Ordenar alfabeticamente
        listaPreciosSinRepetir.sort()
    //


    // Array de productos sin repetir
    let listaProductosRepetidos = listaProductos.map(prodObj => prodObj.producto);
    
    let listaProductosSinRepetir = [];
    listaProductosRepetidos.forEach((producto, productoIndex)=>{
        if (listaProductosRepetidos.indexOf(producto) === productoIndex){
            listaProductosSinRepetir.push(producto.toUpperCase())
        }
    })
         // Ordenar alfabeticamente
         listaProductosSinRepetir.sort()
    //

    let arrayListItems = []; // Filtrado de cantidades

    // hay producto y no hay cantidad: devuelvo todas las cantidades de ese producto
    if (listaProductosSinRepetir.indexOf(productoSearchString.toUpperCase()) !== -1){ // el input coincide con algun producto de la lista de productos (en esa lista no hay repeticiones)
        historialProductos.forEach((prodObj)=>{
            if (
                prodObj.producto === productoSearchString.toUpperCase()
                &&
                precioSearchString === ''
            ){ // para cada producto de la lista de productos igual al input
                arrayListItems.push( // se va a agregar un <li> con su cantidad correspondiente
                    <li
                        key={`${prodObj.producto}_${prodObj.marca}`}
                        onMouseDown={()=>{
                            manejarClick('inputPrecioUnitarioCompra', prodObj.precio_unitario, setPrecioSearchString, setPrecioInputActivo)
                        }}
                    >
                        {prodObj.precio_unitario}
                    </li>
                )
            }


            // hay producto y hay marca: devuelvo todas las marcas de ese producto
            else if (
                prodObj.producto === productoSearchString.toUpperCase()
                &&
                prodObj.precio_unitario.toString().includes(precioSearchString.toUpperCase())
            ){ // para cada producto de la lista de productos igual al input Y con marca parecida/igual
                arrayListItems.push( // se va a agregar un <li> con su marca correspondiente
                    <li
                        onMouseDown={()=>{
                            manejarClick('inputPrecioUnitarioCompra', prodObj.precio_unitario, setPrecioSearchString, setPrecioInputActivo)
                        }}
                    >
                        {prodObj.precio_unitario}
                    </li>
                )
            }
        })
    }


    return (
        <ul 
            className={
                precioInputActivo ?
                styles.autosugerenciaContainer
                :
                styles.hide
            }
        >
            {arrayListItems}
            {/* {listaCantidadesSinRepetir.map((cantidad)=>{
                if (cantidadSearchString === ''){
                    return (
                        <li onMouseDown={()=>{manejarClick('cantidad', cantidad, setCantidadInputActivo, setCantidadSearchString)}}>
                            {cantidad}
                        </li>
                    )
                }
                else if (cantidad?.includes(cantidadSearchString.toUpperCase())){
                    return (
                        <li onMouseDown={()=>{manejarClick('cantidad', cantidad, setCantidadInputActivo, setCantidadSearchString)}}>
                            {cantidad}
                        </li>
                    )
                }
            })}  */}
            
        </ul>
    )
}

export default Autosugerencias_precioFormulario
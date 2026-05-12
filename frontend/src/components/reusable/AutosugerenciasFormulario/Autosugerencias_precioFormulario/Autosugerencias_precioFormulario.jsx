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
    historialProductos,

    inputId,

    setCalcularTotal
}){

    // No repetir precios
    let listaPreciosRepetidos = []
    let listaPreciosSinRepetir = [];


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
                
                //fix para que no haya cantidades repetidas
                listaPreciosRepetidos.push(prodObj.precio_unitario)
                
            }


            // hay producto y hay marca: devuelvo todas las marcas de ese producto
            else if (
                prodObj.producto === productoSearchString.toUpperCase()
                &&
                prodObj.precio_unitario.toString().includes(precioSearchString.toUpperCase())
            ){ // para cada producto de la lista de productos igual al input Y con marca parecida/igual

                 //fix para que no haya cantidades repetidas
                 listaPreciosRepetidos.push(prodObj.precio_unitario)
            }
        })
    }

    // No repetir precios
    listaPreciosRepetidos.forEach((precio, index)=>{
        if (listaPreciosRepetidos.indexOf(precio) === index) {
            listaPreciosSinRepetir.push(precio)
        }
    })

        // Ordenar alfabeticamente
        listaPreciosSinRepetir.sort((a,b)=>{
            if ( Number(a) < Number(b) ) return -1;
            else return 0;
        })
    //

    listaPreciosSinRepetir.forEach((precio)=>{
        arrayListItems.push( // se va a agregar un <li> con su cantidad correspondiente
            <li
                // key={`${prodObj.producto}_${prodObj.marca}`}

                onMouseDown={()=>{
                    setCalcularTotal(true)
                    manejarClick(inputId, precio, setPrecioSearchString, setPrecioInputActivo)
                }}
            >
                {precio}
            </li>
        )
    })


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

        </ul>
    )
}

export default Autosugerencias_precioFormulario
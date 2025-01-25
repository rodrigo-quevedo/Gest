import styles from '../Autosugerencias_productoFormulario/AutosugerenciasFormulario.module.css'

function manejarClick(elementId, producto, setProductoInputActivo, setProductoSearchString){
    document.getElementById(elementId).value = producto
    setProductoInputActivo(false)
    setProductoSearchString(producto)
}


function Autosugerencias_cantidadFormulario({
    productoSearchString,
    
    cantidadSearchString, setCantidadSearchString,
    cantidadInputActivo, setCantidadInputActivo,

    listaProductos,
    historialProductos,

    setCalcularTotal
}){

    // No repetir productos
    let listaCantidadesRepetidas = [];
    let listaCantidadesSinRepetir = [];
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
                cantidadSearchString === ''
            ){ // para cada producto de la lista de productos igual al input

                //fix para que no haya cantidades repetidas
                listaCantidadesRepetidas.push(prodObj.cantidad)
            }


            // hay producto y hay marca: devuelvo todas las marcas de ese producto
            else if (
                prodObj.producto === productoSearchString.toUpperCase()
                &&
                prodObj.cantidad.toString().includes(cantidadSearchString.toUpperCase())
            ){ // para cada producto de la lista de productos igual al input Y con marca parecida/igual
               
                //fix para que no haya cantidades repetidas
                listaCantidadesRepetidas.push(prodObj.cantidad)
            }
        })
    }

    // Cantidades no repetidas
    listaCantidadesRepetidas.forEach((cantidad, index)=>{
        if (listaCantidadesRepetidas.indexOf(cantidad) === index){
            listaCantidadesSinRepetir.push(cantidad)
        }
    })

    // Ordenar de menor a mayor
    listaCantidadesSinRepetir.sort((a,b)=>{
        if ( Number(a) < Number(b) ) return -1;
        else return 0;
    })


    listaCantidadesSinRepetir.forEach((cantidad)=>{
        arrayListItems.push( // se va a agregar un <li> con su cantidad correspondiente
            <li
                onMouseDown={()=>{ 
                    setCalcularTotal(true)
                    manejarClick('cantidad', cantidad, setCantidadSearchString, setCantidadInputActivo)
                }}
            >
                {cantidad}
            </li>
        )
    })




    return (
        <ul 
            className={
                cantidadInputActivo ?
                styles.autosugerenciaContainer
                :
                styles.hide
            }
        >
            {arrayListItems}
            
        </ul>
    )
}

export default Autosugerencias_cantidadFormulario
import styles from './AutosugerenciasFormulario.module.css'

function manejarClick(elementId, producto, setProductoInputActivo, setProductoSearchString){
    document.getElementById(elementId).value = producto
    setProductoInputActivo(false)
    setProductoSearchString(producto)
}

function Autosugerencias_productoFormulario({
    productoSearchString, setProductoSearchString,
    productoInputActivo, setProductoInputActivo,

    listaProductos

}){

    // No repetir productos
    let listaProductosRepetidos = listaProductos.map((prodObj)=>{return prodObj.producto})

    let listaProductosSinRepetir = listaProductosRepetidos.map((producto, index)=>{
        if (listaProductosRepetidos.indexOf(producto) === index) return producto
    })

    // Ordenar alfabeticamente
    listaProductosSinRepetir.sort()
    //




    return (
        <ul 
            className={
                productoInputActivo ?
                styles.autosugerenciaContainer
                :
                styles.hide
            }
        >
            
            {listaProductosSinRepetir.map((producto)=>{
                if (productoSearchString === ''){
                    return (
                        <li onMouseDown={()=>{manejarClick('producto', producto, setProductoInputActivo, setProductoSearchString)}}>
                            {producto}
                        </li>
                    )
                }
                else if (producto?.includes(productoSearchString.toUpperCase())){
                    return (
                        <li onMouseDown={()=>{manejarClick('producto', producto, setProductoInputActivo, setProductoSearchString)}}>
                            {producto}
                        </li>
                    )
                }
            })} 
            
        </ul>
    )
}

export default Autosugerencias_productoFormulario
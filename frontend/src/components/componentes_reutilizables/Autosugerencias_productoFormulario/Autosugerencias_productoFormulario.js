import styles from './Autosugerencias_productoFormulario.module.css'


function Autosugerencias_productoFormulario({
    productoSearchString, setProductoSearchString,
    productoInputActivo, setProductoInputActivo,

    listaProductos

}){
    return (
        <ul 
            className={
                productoInputActivo ?
                styles.autosugerenciaContainer
                :
                styles.hide
            }
        >
            
            {listaProductos.map((prodObj)=>{
                if(productoSearchString === ''){
                    return (
                        <li
                            onMouseDown={()=>{
                                document.getElementById('producto').value = prodObj.producto
                                setProductoInputActivo(false)
                                setProductoSearchString(prodObj.producto)
                            }}
                        >
                            {prodObj.producto}
                        </li>
                    )
                }
                else if (prodObj.producto.toUpperCase().includes(productoSearchString.toUpperCase())){
                    return (
                        <li
                            onMouseDown={()=>{
                                document.getElementById('producto').value = prodObj.producto
                                setProductoInputActivo(false)
                                setProductoSearchString(prodObj.producto)
                            }}
                        >
                            {prodObj.producto}
                        </li>
                    )
                }
            })} 
            
        </ul>
    )
}

export default Autosugerencias_productoFormulario
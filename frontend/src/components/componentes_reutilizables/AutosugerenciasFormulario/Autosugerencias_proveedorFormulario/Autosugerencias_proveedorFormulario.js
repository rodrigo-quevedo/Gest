import styles from '../Autosugerencias_productoFormulario/AutosugerenciasFormulario.module.css'

function manejarClick(elementId, producto, setProductoInputActivo, setProductoSearchString){
    document.getElementById(elementId).value = producto
    setProductoInputActivo(false)
    setProductoSearchString(producto)
}

function Autosugerencias_proveedorFormulario({
    proveedorSearchString, setProveedorSearchString,
    proveedorInputActivo, setProveedorInputActivo,

    historialProductos

}){

    // No repetir productos
    let listaProveedoresRepetidos = historialProductos.map((compraObj)=>{return compraObj.proveedor})
    console.log('proveedores repetidos:',listaProveedoresRepetidos)

    let listaProveedoresSinRepetir = [];
    listaProveedoresRepetidos.forEach((proveedor, index)=>{
        if (listaProveedoresRepetidos.indexOf(proveedor) === index){
            listaProveedoresSinRepetir.push(proveedor)
        }
    })

    // Ordenar alfabeticamente
    listaProveedoresSinRepetir.sort()
    //
    console.log('proveedores sin repetir:',listaProveedoresSinRepetir)




    return (
        <ul 
            className={
                proveedorInputActivo ?
                styles.autosugerenciaContainer
                :
                styles.hide
            }
        >
            
            {listaProveedoresSinRepetir.map((proveedor)=>{
                if (proveedorSearchString === ''){
                    return (
                        <li onMouseDown={()=>{manejarClick('proveedor', proveedor, setProveedorInputActivo, setProveedorSearchString)}}>
                            {proveedor}
                        </li>
                    )
                }
                else if (proveedor?.includes(proveedorSearchString.toUpperCase())){
                    return (
                        <li onMouseDown={()=>{manejarClick('proveedor', proveedor, setProveedorInputActivo, setProveedorSearchString)}}>
                            {proveedor}
                        </li>
                    )
                }
            })} 
            
        </ul>
    )
}

export default Autosugerencias_proveedorFormulario
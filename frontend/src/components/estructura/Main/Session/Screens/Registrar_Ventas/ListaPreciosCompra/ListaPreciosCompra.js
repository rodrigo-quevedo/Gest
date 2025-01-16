import styles from './ListaPreciosCompra.module.css'

import formatDate from '../../../../../../../utils/format_date/format_date'


function ListaPreciosCompra({
    productoAVender, 
    historialProductos
}){

    // extraer precios
    let comprasArr = historialProductos?.filter((compraObj)=>{
        if (productoAVender?.producto.toUpperCase() === compraObj.producto.toUpperCase()) {
            return compraObj
        }
    })

    // console.log(preciosArr)

    // mapear precios a <li>
    let preciosArr = comprasArr.map((compraObj)=>{
        return (
            <tr>
                <td>{compraObj.cantidad}</td>
                <td>${compraObj.precio_unitario}</td>
                <td>{formatDate(new Date(compraObj.fechaHora))}</td>
            </tr>
        )
    })


    // devolver jsx con data inyectada
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Costos registrados de: <span>{productoAVender?.producto}</span> marca <span>{productoAVender?.marca}</span>
            </h2>
            
            <table className={styles.tableContainer}>
                <tr>
                    <th>Cantidad ingresada</th>
                    <th>Costo unitario</th>
                    <th>Fecha</th>
                </tr>
                {preciosArr}
            </table>
        </div>
    )
}

export default ListaPreciosCompra
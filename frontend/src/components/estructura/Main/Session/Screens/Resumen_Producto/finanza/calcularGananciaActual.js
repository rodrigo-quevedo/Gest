function calcularGananciaActual (
    historialCompras,
    historialVentas
){
    let sumaGanancia = 0;
    historialCompras.forEach(compra => {
        historialVentas.forEach(venta => {
            if (
                compra.producto === venta.producto
                &&
                compra.marca === venta.marca
            ){
                sumaGanancia += (Number(venta.precio_unitario) * venta.cantidad)
                sumaGanancia -= (Number(compra.precio_unitario) * venta.cantidad)//se toma en cuenta la cantidad que se vendió para comparar costos y ventas
            }
        })
    });

    return sumaGanancia.toFixed(2)
}

export default calcularGananciaActual
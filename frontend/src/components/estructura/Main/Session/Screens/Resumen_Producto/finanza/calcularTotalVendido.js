function calcularTotalVendido(
    historialVentas
){
  
    let sumaVentas = 0;
    historialVentas.forEach(venta => {
        //parsear precio_unitario (viene con tipo string desde el server)
        let precioParseado = Number(venta.precio_unitario)

        sumaVentas += (precioParseado * venta.cantidad)
    });
    


    return sumaVentas.toFixed(2)
}

export default calcularTotalVendido
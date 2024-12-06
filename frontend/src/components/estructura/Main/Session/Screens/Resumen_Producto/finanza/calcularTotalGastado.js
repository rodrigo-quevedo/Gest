function calcularTotalGastado(
    historialCompras
){

    //Total gastado
    let sumaCompras = 0;
    historialCompras.forEach(compra => {
        //parsear precio_unitario (viene con tipo string desde el server)
        let precioParseado = Number(compra.precio_unitario)

        sumaCompras += (precioParseado * compra.cantidad)
    });



    return sumaCompras.toFixed(2)
}

export default calcularTotalGastado
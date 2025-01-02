const GET =  async (req, res) => {
    
    //logs
    console.log(`GET en /historial_ventas: ${new Date()}`)
    console.log('request query:', req.query)

    //req.query validado por middleware

    //usuario
    const usuarioEncontrado = res.locals.usuarioEncontrado

    //obtener historialVentas[]
    const Historial_VentasModel = require('../../../models/Session/Historial_Ventas')

    const idHistorialVentas = usuarioEncontrado.idHistorialVentas

    try {
        const historialVentasEncontrado = await Historial_VentasModel.findById(idHistorialVentas).exec()

        
        if (! historialVentasEncontrado?.historialVentas) throw new Error("historialVentasEncontrado?.historialVentas is null")


        const historialVentasParseadoYFiltrado = []
        
        //parsear decimal128 y date + resultados de busqueda
        historialVentasEncontrado.historialVentas
        .sort((a,b)=>{return a.fechaHora.getTime() - b.fechaHora.getTime()})
        .reverse()
        .forEach(venta =>{
            //devolver todo
            if (req.query.searchBoxInput === '') {
                historialVentasParseadoYFiltrado.push({
                    producto: venta.producto.toUpperCase(),
                    cantidad: venta.cantidad,
                    precio_unitario: venta.precio_unitario.toString(),
                    marca: venta.marca.toUpperCase(),
                    fechaHora: venta.fechaHora.toISOString()
                })
            }

            //devolver exact match
            else if (venta.producto.toUpperCase() === req.query.searchBoxInput.toUpperCase()) {
                historialVentasParseadoYFiltrado.push({
                    producto: venta.producto.toUpperCase(),
                    cantidad: venta.cantidad,
                    precio_unitario: venta.precio_unitario.toString(),
                    marca: venta.marca.toUpperCase(),
                    fechaHora: venta.fechaHora.toISOString()
                })
            }
            
            //devolver resultados similares
            else if (venta.producto.toUpperCase().includes(req.query.searchBoxInput.toUpperCase())){
                historialVentasParseadoYFiltrado.push({
                    producto: venta.producto.toUpperCase(),
                    cantidad: venta.cantidad,
                    precio_unitario: venta.precio_unitario.toString(),
                    marca: venta.marca.toUpperCase(),
                    fechaHora: venta.fechaHora.toISOString()
                })
            }

            //no devolver nada (a continuacion se van a limpiar los null)
            return;
        })
        console.log('historialVentasParseadoYFiltrado: ',historialVentasParseadoYFiltrado)

        res.status(200).json({
            success: true,
            message: historialVentasParseadoYFiltrado
        })
        return;

    }
    catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: "DB error. No se pudo encontrar el historial de ventas del usuario en la Base de Datos"
        })
    }

}

module.exports = GET
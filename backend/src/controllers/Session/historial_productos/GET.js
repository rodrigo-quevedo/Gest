const GET =  async (req, res) => {
    
    
    console.log(`GET recibido en /productos: ${new Date()}`)
    console.log('request query:', req.query)

    //validacion del input por middleware validarReqQuerySearchbox

    //obtener usuario por middleware
    const usuarioEncontrado = res.locals.usuarioEncontrado
    
    //servidor responde con el historial de productos:
    const idHistorialProductos = usuarioEncontrado.idHistorialProductos
    
    const Historial_ProductosModel = require('../../../models/Session/Historial_Productos')
    const historialEncontrado = await Historial_ProductosModel.findById(idHistorialProductos).exec()

    if (!historialEncontrado?.historialProductos) {
        console.log('No se pudo encontrar la lista de productos')
        
        res.status(400).json({
            success: false,
            message: `No se pudo encontrar la lista de productos.`
        })

        return;
    }

    //parsear Decimal128 y date
    let arrayHistorial = [];
    historialEncontrado?.historialProductos.forEach( (el,i) => {
        arrayHistorial[i] = el
    })
    console.log('primer arrayHistorial:', arrayHistorial)

        //Formato fechaHora: "YYYY-MM-DD a las HH:MM"
        function formatDate(d)
        {
            var year = d.getFullYear().toString();
            var month = (d.getMonth() + 1).toString();
            var day = d.getDate().toString();
            var hours = d.getHours().toString()
            var minutes = d.getMinutes().toString()
            
            if (month.length === 1)  month = "0" + month;
            if (day.length === 1) day = "0" + day;
            if (hours.length === 1) hours = '0'+ hours
            if (minutes.length === 1) minutes = '0'+ minutes

            return `${year}-${month}-${day} a las ${hours}:${minutes}`;
        }

    arrayHistorial = arrayHistorial.map((prodObj)=> {
        return {
            producto: prodObj.producto,
            cantidad: prodObj.cantidad,
            precio_unitario: prodObj.precio_unitario.toString(),
            marca: prodObj.marca,
            proveedor: prodObj.proveedor,
            fechaHora: formatDate(prodObj.fechaHora)
        }
    })

    console.log('Historial de productos parseado:', arrayHistorial)


    //resultado de la busqueda:
    let arrayResultado = arrayHistorial.map((prod)=>{
        //devolver todo
        if (req.query.searchBoxInput === '') {
            return prod
        }

        //devolver exact match
        else if (prod.producto === req.query.searchBoxInput) {
            return prod
        }
        
        //devolver resultados similares
        else if (prod.producto.includes(req.query.searchBoxInput)){
            return prod
        }

        //no devolver nada (a continuacion se van a limpiar los null)
        return null;
    })

    console.log('arrayResultado antes de limpiar los null:', arrayResultado)

    //ahora vamos a eliminar los null
    let arrayResultadoLimpio = []

    arrayResultado.forEach(el=>{
        if (el !== null) {
            arrayResultadoLimpio.push(el)
        }
        return
    })

    console.log('arrayResultadoLimpio, DESPUES de limpiar los null:', arrayResultadoLimpio)

    res.status(200).json({
        success: true,
        message: arrayResultadoLimpio
    })
    return;
}

module.exports = GET
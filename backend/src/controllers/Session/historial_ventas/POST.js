const Historial_VentasModel = require('../../../models/Session/Historial_Ventas')
const Lista_ProductosModel = require('../../../models/Session/Lista_Productos')

const POST =  async (req, res) => {
    
    //middlewares:
        //cors
        //validar jwt
        //validar inputs del req.body
        //obtener usuario
    
    const usuarioEncontrado = res.locals.usuarioEncontrado

    let ventaPushedListaProductos;//esto luego se va a mandar como respuesta en caso de exito

    const pushVentaHistorial = {
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        precio_unitario: req.body.precio_unitario,
        marca: req.body.marca,
        proveedor: req.body.proveedor,
        fechaHora: new Date()
    }

    try {
        //------insertar doc en Historial_Productos
        //consiguir el array
        const historialVentasUsuario = await Historial_VentasModel.findById(usuarioEncontrado.idHistorialVentas);
        console.log('historialVentasUsuario', historialVentasUsuario)


        historialVentasUsuario.historialVentas.push(pushVentaHistorial)//push (para pushear tengo que usar el array)
        const pushResult = await historialVentasUsuario.save(); //save (en cambio para el save() tengo que usar el documento)//si esto tira error, lo agarra el catch
        console.log(`Venta ingresada (push result): ${pushResult}`)
            
    
        //-----actualizar model Lista_Productos:
        const listaProductosUsuario = await Lista_ProductosModel.findById(usuarioEncontrado.idListaProductos)//como es byId, me devuelve 1 solo
        console.log('listaProductosUsuario', listaProductosUsuario)

        //valido si se encontró la lista de usuarios en la db:
        if (!listaProductosUsuario?.listaProductos){
            console.log('No se pudo cargar la lista de productos para actualizarla')
            throw new Error('No se pudo cargar la lista de productos para actualizarla')
        }
        

        //antes de hacer el update, primero tengo que chequear si el array listaProductos tiene ese producto
        let prodEncontradoEnListaProductos = listaProductosUsuario.listaProductos.find((prodObj)=>{
            //aca si el array está vacío, el flag queda en false
            return (
                prodObj.producto === pushVentaHistorial.producto
                &&
                prodObj.marca === pushVentaHistorial.marca
            )  
        })
        
        // si no tiene el producto, no lo puedo vender:
        if (!prodEncontradoEnListaProductos) {
            console.log(`No se encontró el producto '${req.body.producto}' marca '${req.body.marca}' en la lista de productos.`)

            res.status(400).json({
                success: false,
                message: `No se encontró el producto '${req.body.producto}' marca '${req.body.marca}' en la lista de productos.`
            })

            return;
        }

        // si tiene el producto, registrar la venta
        ventaPushedListaProductos = await Lista_ProductosModel.findOneAndUpdate(
            {
                _id: usuarioEncontrado.idListaProductos,
                "listaProductos._id" : prodEncontradoEnListaProductos._id
            }, 

            {
                $set: {
                    "listaProductos.$.cantidad": prodEncontradoEnListaProductos.cantidad - pushVentaHistorial.cantidad
                }
            }
        )
        .exec()
        console.log("ventaPushedListaProductos:", ventaPushedListaProductos)

        if (!ventaPushedListaProductos){
            console.log('no se pudo actualizar el producto en Lista Productos')
            throw new Error('no se pudo actualizar el producto en Lista Productos')
        }            
       
    }
    catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: err.message
        })

        return;
    }

    console.log('ventaPushedListaProductos', ventaPushedListaProductos)

    res.status(200).json({
        success: true,
        message: `Venta ingresada: ${ventaPushedListaProductos}`
    })
        
    return;

}

module.exports = POST
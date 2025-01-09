const Historial_ProductosModel = require('../../../models/Session/Historial_Productos')
const Lista_ProductosModel = require('../../../models/Session/Lista_Productos')

const POST =  async (req, res) => {
    
    console.log(`POST recibido en /historial_productos: ${new Date()}`)
    console.log('body de la request:', req.body)


    //middlewares:
        //session validada con isAuthenticated middleware 
        //req.body validado con validarReqBodyProducto middleware
        //usuario obtenido con middleware obtenerUsuario
        const usuarioEncontrado = res.locals.usuarioEncontrado
    

    let listaProductosActualizada;
    let historialActualizado;

    const pushObjHistorial = {
        producto: req.body.producto.toUpperCase(),
        cantidad: req.body.cantidad,
        precio_unitario: req.body.precio_unitario,
        marca: req.body.marca.toUpperCase(),
        proveedor: req.body.proveedor.toUpperCase(),
        fechaHora: new Date(new Date().toISOString())
    }

    const pushObjListaProd = {
        producto: req.body.producto.toUpperCase(),
        cantidad: req.body.cantidad,
        precio_unitario: req.body.precio_unitario,
        marca: req.body.marca.toUpperCase(),
        proveedor: req.body.proveedor.toUpperCase()
    }

    try {
        //consiguir el array historial
        const historialProductoUsuario = await Historial_ProductosModel.findById(usuarioEncontrado.idHistorialProductos);
        console.log('historialProductoUsuario', historialProductoUsuario)
            
    
        //obtener model Lista_Productos:
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
                prodObj.producto.toUpperCase() === pushObjListaProd.producto.toUpperCase()
                &&
                prodObj.marca.toUpperCase() === pushObjListaProd.marca.toUpperCase()
            )
            
            //en vez de tener 1 precio unitario para cada producto, puedo dejar solamente el ultimo precio en la Lista Productos
            //lo mismo con el proveedor, puedo dejar solamente el ultimo proveedor en la Lista Productos
            //me ahorro hacer esto:
                // &&
                // prodObj.precio_unitario.toString() === pushObj.precio_unitario.toString() 
                // &&
                // prodObj.proveedor === pushObj.proveedor 
            
        })
        
        //agregar compra al historial de productos
        historialProductoUsuario.historialProductos.push(pushObjHistorial)//push (para pushear tengo que usar el array)
        historialActualizado = await historialProductoUsuario.save(); //save (en cambio para el save() tengo que usar el documento)//si esto tira error, lo agarra el catch
        console.log(`Producto ingresado (push result): ${historialActualizado}`)

        // si no lo tiene, agregarlo a lista productos
        if (!prodEncontradoEnListaProductos) {

            listaProductosUsuario.listaProductos.push(pushObjListaProd)//aca si hago el push nomas
            listaProductosActualizada = await listaProductosUsuario.save()//save //esto tira un Error, asique lo agarra el catch

        }
        // pero si lo tiene, actualizar el array lista productos
        else {
            listaProductosActualizada = await Lista_ProductosModel.findOneAndUpdate(
                {
                    _id: usuarioEncontrado.idListaProductos,
                    "listaProductos._id" : prodEncontradoEnListaProductos._id
                }, 

                {
                    $set: {
                        "listaProductos.$.cantidad": prodEncontradoEnListaProductos.cantidad + pushObjListaProd.cantidad,
                        "listaProductos.$.precio_unitario" : pushObjListaProd.precio_unitario,//ultimo precio_unitario
                        proveedor: pushObjListaProd.proveedor //ultimo_proveedor
                    }
                }
            )
            .exec()
            console.log("productoPusheadoListaProductos:", listaProductosActualizada)

            if (!listaProductosActualizada){
                console.log('no se pudo actualizar el producto en Lista Productos')
                throw new Error('no se pudo actualizar el producto en Lista Productos')
            }            

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

    console.log('listaProductosActualizada', listaProductosActualizada)


    let resultado = historialActualizado.historialProductos.find((productoObj)=>{
        // console.log(Number(productoObj.precio_unitario), pushObjHistorial.precio_unitario)

        return (
            productoObj.producto.toUpperCase() === pushObjHistorial.producto.toUpperCase()
            &&
            productoObj.marca.toUpperCase() === pushObjHistorial.marca.toUpperCase()
            &&
            productoObj.proveedor.toUpperCase() === pushObjHistorial.proveedor.toUpperCase()
            &&
            productoObj.cantidad === pushObjHistorial.cantidad
            &&
            Number(productoObj.precio_unitario) === pushObjHistorial.precio_unitario
        )
    })

    res.status(200).json({
        success: true,
        message: `Producto ingresado: ${resultado.producto}. Cantidad: ${resultado.cantidad}. Precio unitario: $${resultado.precio_unitario}. Total: $${resultado.precio_unitario * resultado.cantidad}`
    })
        
    return;

}

module.exports = POST
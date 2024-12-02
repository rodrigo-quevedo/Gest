const POST =  async (req, res) => {
    
    console.log(`POST recibido en /historial_productos: ${new Date()}`)
    console.log('body de la request:', req.body)


    //session validada con isAuthenticated middleware 

    //req.body validado con validarReqBodyProducto middleware

    //usuario obtenido con middleware obtenerUsuario
    const usuarioEncontrado = res.locals.usuarioEncontrado
    

    //insertar doc en Historial_Productos
    try {
        //consiguir el array
        const idHistorialProductos = usuarioEncontrado.idHistorialProductos
        console.log('idHistorialProductos: ',idHistorialProductos) 

        //cargar en el array
        
        const Historial_ProductosModel = require('../../../models/Session/Historial_Productos')
        const historialProductoUsuario = await Historial_ProductosModel.findById(idHistorialProductos);

            console.log('historialProductoUsuario', historialProductoUsuario)

            //obtener array
            const arrayHistorialProductos = historialProductoUsuario.historialProductos

            //crear objeto a cargar
            const pushObj = {
                producto: req.body.producto,
                cantidad: req.body.cantidad,
                precio_unitario: req.body.precio_unitario,
                marca: req.body.marca,
                proveedor: req.body.proveedor,
                fechaHora: new Date()
            }

            //push (para pushear tengo que usar el array)
            arrayHistorialProductos.push(pushObj)

            //save (en cambio para el save() tengo que usar el documento)
            const pushResult = await historialProductoUsuario.save();
            console.log(`Producto ingresado (push result): ${pushResult}`)
            
            if(
                !pushResult?._id 
                || 
                pushResult?.historialProductos?.length < 1
            ){
                console.log('No se pudo cargar el producto')

                res.status(400).json({
                    success: false,
                    message: `No se pudo cargar el producto.`
                })
        
                return;
            }

            
    
    //actualizar model Lista_Productos:
        
        const Lista_ProductosModel = require('../../../models/Session/Lista_Productos')
        const idListaProductos = usuarioEncontrado.idListaProductos
        const listaProductosUsuario = await Lista_ProductosModel.findById(idListaProductos)//como es byId, me devuelve 1 solo

        let productoPusheadoListaProductos;
        
        console.log('listaProductosUsuario', listaProductosUsuario)
        
        //valido si se encontró la lista de usuarios en la db:
        if (!listaProductosUsuario?.listaProductos){
            console.log('No se pudo cargar la lista de productos para actualizarla')

            res.status(400).json({
                success: false,
                message: `No se pudo cargar la lista de productos para actualizarla.`
            })
    
            return;
        }

        let arrayListaProductosUsuario = listaProductosUsuario?.listaProductos
        console.log('arrayListaProductosUsuario', arrayListaProductosUsuario)
        
        //antes de hacer el update, primero tengo que chequear si el array listaProductos tiene ese producto
        let prodEncontradoEnListaProductos = false;

        arrayListaProductosUsuario.forEach((prodObj)=>{
            //aca si el array está vacío, el flag queda en false
            if (prodObj.producto === pushObj.producto) {
                prodEncontradoEnListaProductos = prodObj//acá si es true le puedo mandar el objeto del producto dentro de la lista producto
                
                //aca no puedo actualizar el array directamente porque es un forEach()
            }
        })
        
        // si no lo tiene, agregarlo
        if (prodEncontradoEnListaProductos === false) {

            console.log('no se encontro el producto en la lista de productos')
            //aca si hago el push nomas
            arrayListaProductosUsuario.push({
                producto: pushObj.producto,
                cantidad: pushObj.cantidad,
                precio_unitario: pushObj.precio_unitario,
                marca: pushObj.marca,
                proveedor: pushObj.proveedor
            })
            //save
            productoPusheadoListaProductos = await listaProductosUsuario.save()

            console.log('productoPusheadoListaProductos', productoPusheadoListaProductos)

            if (!productoPusheadoListaProductos?.listaProductos){
                console.log('No se pudo cargar la lista de productos para actualizarla')

                res.status(400).json({
                    success: false,
                    message: `No se pudo cargar la lista de productos para actualizarla.`
                })
        
                return;
            }
            
        }
        else {
            //en cambio, si el producto ya existe en array listaProductos, entonces tengo que hacer un update
                console.log('si se encontró el producto en la lista de productos')

                //update
                // actualizar el array
                arrayListaProductosUsuario = arrayListaProductosUsuario.map((productoObj)=>{
                    if(productoObj.producto === pushObj.producto) {
                        console.log('producto encontrado,','productoObj.cantidad:', productoObj.cantidad, 'pushObj.cantidad:',pushObj.cantidad)
                        productoObj.cantidad = productoObj.cantidad + pushObj.cantidad
                        return productoObj
                        
                        
                        // return {
                        //     producto: productoObj.producto,
                        //     cantidad: productoObj.cantidad + pushObj.cantidad,//simplemente actualizo la cantidad
                        //     precio_unitario: productoObj.precio_unitario,
                        //     marca: productoObj.marca,
                        //     proveedor: productoObj.proveedor
                        // }
                    }
                    return productoObj
                })

                //save
                listaProductosUsuario.listaProductos = arrayListaProductosUsuario;
                productoPusheadoListaProductos = await listaProductosUsuario.save()

                if (!productoPusheadoListaProductos.listaProductos) {
                    console.log('No se pudo cargar la lista de productos para actualizarla')

                    res.status(400).json({
                        success: false,
                        message: `No se pudo cargar la lista de productos para actualizarla.`
                    })
            
                    return;
                }
            
                console.log('productoPusheadoListaProductos', productoPusheadoListaProductos)

        }
            
            
        res.status(400).json({
            success: true,
            message: `Producto ingresado: ${pushResult?.historialProductos[0]}`
        })
            

        return;
    }
    catch(err){
        console.log(err)

        res.status(400).json({
            success: false,
            message: err.message
        })

        return;
    }

}

module.exports = POST
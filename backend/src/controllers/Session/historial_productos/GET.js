const GET =  async (req, res) => {
    
    
    console.log(`GET recibido en /productos: ${new Date()}`)
    console.log('request query:', req.query)

    //validar inputs de la req.query (acá se me complicó porque tengo que dejar pasar el '', ese me lo toma como false en javascript)
    if (req.query.searchBoxInput === null ||
        req.query.searchBoxInput === undefined
    ) {
        res.status(400).json({
            success: false,
            message: 'searchBoxInput: El campo es obligatorio.'
        })

        return;
    }

    if (typeof req.query.searchBoxInput !== 'string') {
        res.status(400).json({
            success: false,
            message: `searchBoxInput: '${req.query.searchBoxInput}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }

    if (/^[a-zA-ZÀ-ÿñÑ0-9 ]{0,50}$/.test(req.query.searchBoxInput) === false) {
        res.status(400).json({
            success: false,
            message: `searchBoxInput: '${req.query.searchBoxInput}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, y espacios. NO se aceptan caracteres especiales. Mínimo 0 y máximo 50 caracteres.`
        })

        return;
    }

    
    //servidor responde con el historial de productos:
    const userSession = res.locals.sessionInJwtPayload

    const UsuariosModel = require('../../../models/Authentication/Usuarios')
    const usuarioEncontrado = await UsuariosModel.find({usuario: userSession.usuario}).exec()

    console.log('usuarioEncontrado[0]:', usuarioEncontrado[0])

    if (!usuarioEncontrado[0]?.idListaProductos) {
        console.log('No se pudo encontrar al usuario')

        res.status(400).json({
            success: false,
            message: `No se pudo encontrar al usuario.`
        })

        return;
    }

    const idHistorialProductos = usuarioEncontrado[0].idHistorialProductos
    
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

    //parsear Decimal128
    let arrayHistorial = [];
    historialEncontrado?.historialProductos.forEach( (el,i) => {
        arrayHistorial[i] = el
    })
    console.log('primer arrayHistorial:', arrayHistorial)

    arrayHistorial = arrayHistorial.map((prodObj)=> {
        return {
            producto: prodObj.producto,
            cantidad: prodObj.cantidad,
            precio_unitario: prodObj.precio_unitario.toString(),
            marca: prodObj.marca,
            proveedor: prodObj.proveedor
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
//el input del searchbox tiene name "searchBoxInput"

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

    if (/^[a-zA-ZÀ-ÿñÑ0-9 .]{0,50}$/.test(req.query.searchBoxInput) === false) {
        res.status(400).json({
            success: false,
            message: `searchBoxInput: '${req.query.searchBoxInput}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 0 y máximo 50 caracteres.`
        })

        return;
    }

    //servidor responde con la lista:
    const userSession = res.locals.sessionInJwtPayload
        //--> tengo que sacar la lista productos para el usuario
    const UsuariosModel = require('../../../models/Authentication/Usuarios')
    const usuarioEncontrado = await UsuariosModel.find({usuario: userSession.usuario}).exec()//el findOne() no me estuvo funcionando, por eso uso find() y despues el index [] del array para utilizarlos

    console.log('usuarioEncontrado[0]:', usuarioEncontrado[0])

    if (!usuarioEncontrado[0]?.idListaProductos) {
        console.log('No se pudo encontrar al usuario')

        res.status(400).json({
            success: false,
            message: `No se pudo encontrar al usuario.`
        })

        return;
    }

    const idListaProductos = usuarioEncontrado[0].idListaProductos
        
        //--> además, la lista viene limitada por el req.query.searchBoxInput
    const Lista_ProductosModel = require('../../../models/Session/Lista_Productos')
    const listaEncontrada = await Lista_ProductosModel.findById(idListaProductos).exec()
    
    //puede haber casos en que la listaEncontrada[] tenga length = 0, así que no hay que chequear eso.
    
    if (!listaEncontrada?.listaProductos) {
        console.log('No se pudo encontrar la lista de productos')
        
        res.status(400).json({
            success: false,
            message: `No se pudo encontrar la lista de productos.`
        })

        return;
    }
    
        //->aca intento parsear pero no me deja, el return funciona bien, debe ser que es inmutable
        // let arrayListaProductos = listaEncontrada?.listaProductos;

        //voy a hacer una copia
        let arrayListaProductos = [];
        listaEncontrada?.listaProductos.forEach( (el,i) => {
            arrayListaProductos[i] = el
        })
        console.log('primera arrayListaProductos:', arrayListaProductos)

    //tengo que parsear los floats antes de enviarlos.
    //antes de parsear, me salen en este formato:
    // "precio_unitario": {
    //      "$numberDecimal": "2500.00"
    //}
    //parse:
    arrayListaProductos = arrayListaProductos.map((prodObj)=> {

            //no se por qué esto nunca funcionó:
            // console.log('antes de parsear:', prodObj.precio_unitario, 'despues de parsear:', prodObj.precio_unitario.toString())
            // // prodObj.precio_unitario = prodObj.precio_unitario.toString()
            // prodObj.precio_unitario = 'lsdkfjaslkf'
            // console.log('prodObj.precio_unitario:', prodObj.precio_unitario)
            
            // console.log('prodObj despues de parsear:', prodObj)
            // return prodObj


        return {
            producto: prodObj.producto,
            cantidad: prodObj.cantidad,
            precio_unitario: prodObj.precio_unitario.toString(),
            marca: prodObj.marca,
            proveedor: prodObj.proveedor
        }
    })
        
    console.log('Lista de productos parseada:', arrayListaProductos)

    //buscar lo del searchbox dentro del array .listaProductos()
        //1. armar una REGEXP para devolver resultados similares
        //2. chequear searchBoxInput = '' para devolver todo

    let arrayResultado = arrayListaProductos.map((prod)=>{
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

        //no devolver nada (el frontend no va a mostrar nada si el objeto está vacío)
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
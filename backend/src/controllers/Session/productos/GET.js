//el input del searchbox tiene name "searchBoxInput"

const GET =  async (req, res) => {
    
    console.log(`GET recibido en /productos: ${new Date()}`)
    console.log('request query:', req.query)

    //validacion de searchBoxInput por middleware
    //usuario obtenido de middleware
    const usuarioEncontrado = res.locals.usuarioEncontrado

    const idListaProductos = usuarioEncontrado.idListaProductos
        
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
            producto: prodObj.producto.toUpperCase(),
            cantidad: prodObj.cantidad,
            precio_unitario: prodObj.precio_unitario.toString(),
            marca: prodObj.marca.toUpperCase(),
            proveedor: prodObj.proveedor.toUpperCase()
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
        else if (prod.producto === req.query.searchBoxInput.toUpperCase()) {
            return prod
        }
        
        //devolver resultados similares
        else if (prod.producto.includes(req.query.searchBoxInput.toUpperCase())){
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
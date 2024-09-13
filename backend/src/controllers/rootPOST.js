const Producto = require('../models/Producto')

const insertarProducto = async (res, name) => {
    try {
        const productoInsertado = await Producto.create({
            product: name
        })
        console.log(productoInsertado? `Producto creado: ${productoInsertado}` : `Error al agregar producto a la DB: ${productoInsertado}`)
        return productoInsertado;//retorno la promise para poder usar await al llamar esta función
    }
    catch (err) {
        console.log('MongoDB: No se pudo agregar el producto.', err)
        res.json(JSON.stringify({
            success: false,
            message: 'MongoDB: No se pudo agregar el producto.',
            error: err
        }))
    }
}

const responderCliente = async (res, name) => {
    try {
        let query = Producto.findOne({
            product: name
        })
        const productoEncontrado = await query.exec()
        console.log(`El producto agregado es: ${productoEncontrado}`)
        res.json(JSON.stringify({
            success: true,
            product: productoEncontrado
        }))
    }
    catch (err) {
        console.log('MongoDB: No se pudo buscar el último producto agregado')
        res.json(JSON.stringify({
            success: false,
            message: 'MongoDB: No se pudo buscar el último producto agregado',
            error: err
        }))
    }
    
}

module.exports = async (req, res) => {
    console.log(`POST request received on '/' at ${new Date()}`, req.body)

    res.header({
        "Access-Control-Allow-Origin": process.env.URL_REACT_CLIENT
    })

    if (req.body.product 
        && typeof req.body.product === 'string' 
        && /\w{2,15}/.test(req.body.product)
    ){
        await insertarProducto(res, req.body.product)
        responderCliente(res, req.body.product)
    }
    else {
        console.log('Request vacia o con datos incorrectos:', req.body)

        res.status(400)
        .send(JSON.stringify({
            success: false,
            mensaje: "Campo incompleto/incorrecto. Por favor, ingresar los datos según lo indicado en el formulario."    
        }))
    }
}
const Producto = require('../models/Producto')

const insertarProducto = async (name) => {
    try {
        const productoInsertado = await Producto.create({
            product: name
        })
    }
    catch (err) {console.log('MongoDB: No se pudo agregar el producto.', err)}
}

const responderCliente = async (res, name) => {
    try {
        const productoEncontrado = await Producto.find({
            product: name
        })
        res.json(JSON.stringify(productoEncontrado))
    }
    catch (err) {
        console.log('MongoDB: No se pudo buscar el último producto agregado')
    }
    
}

module.exports = (req, res) => {
    console.log(`POST request received on '/' at ${new Date()}`, req.body)

    res.header({
        "Access-Control-Allow-Origin": process.env.URL_REACT_CLIENT
    })

    if (req.body.product 
        && typeof req.body.product === 'string' 
        && /\w{2,15}/.test(req.body.product)
    ){
        insertarProducto(req.body.product)
        responderCliente(res, req.body.product)
        //Respuesta hardcodeada:
        // res.json(JSON.stringify({
        //     success: true,
        //     product: {
        //         id: 91230918203,
        //         name: req.body.product
        //     }
        // }))
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
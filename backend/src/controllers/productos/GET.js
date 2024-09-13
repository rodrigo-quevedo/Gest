const Producto = require('../../models/Producto')

module.exports = async (req, res)=> {
    console.log(`GET en /product recibido: ${Date.now()}`)

    res.header({
        'Access-Control-Allow-Origin': process.env.URL_REACT_CLIENT
    })
    
    try {
        let query = Producto.find()

        let listaProductos = await query.exec()
        
        if (listaProductos) {
            res.json(JSON.stringify(listaProductos))
        }
        else {
            console.log('MongoDB: No se pudo ejecutar el find().')
        }
        
    }
    catch (err) {

    }

}
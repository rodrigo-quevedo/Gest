const validarStringNotUsername = require('../utils/input_validation/validarStringNotUsername')
const validarCantidadInteger = require('../utils/input_validation/validarCantidadInteger')

const validarReqBodyProducto = (req, res, next) => {

    // PRODUCTO
    validarStringNotUsername("producto", req.body.producto, res)

    // CANTIDAD
    validarCantidadInteger("cantidad", req.body.cantidad, res, 1, 9999)


    // PRECIO UNITARIO
    validarPrecioFloat2Decimales("precio_unitario", req.body.precio_unitario, 0.01, 999999999.99)

    // MARCA
    validarStringNotUsername("marca", req.body.marca, res)    

    // PROVEEDOR
    validarStringNotUsername("proveedor", req.body.proveedor, res)

    next()
}

module.exports = validarReqBodyProducto
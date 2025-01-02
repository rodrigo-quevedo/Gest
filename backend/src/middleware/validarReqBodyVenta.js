const validarStringNotUsername = require('../utils/input_validation/validarStringNotUsername')
const validarCantidadInteger = require('../utils/input_validation/validarCantidadInteger')
const validarPrecioFloat2Decimales = require("../utils/input_validation/validarPrecioFloat2Decimales")

const validarReqBodyProducto = (req, res, next) => {

    // PRODUCTO
    validarStringNotUsername("producto", req.body.producto, res)

    // CANTIDAD
    validarCantidadInteger("cantidad", req.body.cantidad, res, 1, 9999)

    // PRECIO UNITARIO
    validarPrecioFloat2Decimales("precio_unitario", req.body.precio_unitario, res, 0.01, 999999999.99)

    // MARCA
    validarStringNotUsername("marca", req.body.marca, res)    

    next()
}

module.exports = validarReqBodyProducto
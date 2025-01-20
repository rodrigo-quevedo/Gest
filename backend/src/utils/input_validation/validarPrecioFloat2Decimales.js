const InputValidationError = require('../../utils/CustomErrors/InputValidationError/InputValidationError')

const validarPrecioFloat2Decimales = (atributo, input, res, min, max) => {

    if (!input) {
        throw new InputValidationError(`${atributo}: El campo es obligatorio.`)
    }

    //el float es más complicado, porque es check integer + check cantidad de decimales (2 decimales)
    if (
        typeof input !== 'number' || 
        isNaN(input) || 
        (
            // no es integer
            parseInt(input, 10) !== input
            && // Y
            (   
                // tampoco es Float con 1 o 2 decimales
                !(
                    //(para 1 o 2 decimales, devuelve true)
                    //los otros casos, que son los que busco para este guard,
                    //devuelve false, pero eso no me sirve; por eso
                    //lo doy vuelta con el "!"
                    input.toString().split('.')[1]?.length === 1 ||
                    input.toString().split('.')[1]?.length === 2
                )
            )
        )
    ) {
        throw new InputValidationError(`${atributo}: '${input}' es inválido. El campo debe ser Integer, o Float con 1 o 2 decimales.`)
    }

    if (input < min || input > max) {
        throw new InputValidationError(`${atributo}: '${req.body.precio_unitario}' es inválido. Valor min es ${min} y max es ${max}`)
    }
}

module.exports = validarPrecioFloat2Decimales
const InputValidationError = require('../../utils/CustomErrors/InputValidationError/InputValidationError')

const validarCantidadInteger = (atributo, input, res, min, max) => {
    if (!input) {
        throw new InputValidationError(`${atributo}: El campo es obligatorio.`)
    }
    
    if (
        typeof input !== 'number' || 
        isNaN(input) ||
        parseInt(input, 10) !== input
    ) {
        throw new InputValidationError( `${atributo}: '${input}' es inválido. El campo debe ser tipo Integer.`)
    }
    
    if (input < min || input > max) {
        throw new InputValidationError(`${atributo}: '${input}' es inválido. El minimo es ${min} y el máximo es ${max}.`)
    }
}

module.exports = validarCantidadInteger
const InputValidationError = require('../../utils/CustomErrors/InputValidationError/InputValidationError')

const validarStringNotUsername = (atributo, input, res) => {

    if (!input) {
        throw new InputValidationError(`${atributo}: El campo es obligatorio.`)
    }

    if (typeof input !== 'string') {
        throw new InputValidationError(`${atributo}: '${input}' es inválido. El campo debe ser tipo String.`)
    }


    if (/^[a-zA-ZÀ-ÿñÑ0-9 .]{6,50}$/.test(input) === false) {
        throw new InputValidationError(`${atributo}: '${input}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres.`)
    }
}

module.exports = validarStringNotUsername
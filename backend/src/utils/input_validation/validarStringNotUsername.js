const validarStringNotUsername = (atributo, input, res) => {

    if (!input) {
        res.status(400).json({
            success: false,
            message: `${atributo}: El campo es obligatorio.`
        })

        return;
    }

    if (typeof input !== 'string') {
        res.status(400).json({
            success: false,
            message: `${atributo}: '${input}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }


    if (/^[a-zA-ZÀ-ÿñÑ0-9 .]{6,50}$/.test(input) === false) {
        res.status(400).json({
            success: false,
            message: `${atributo}: '${input}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres.`
        })

        return;
    }
}

module.exports = validarStringNotUsername
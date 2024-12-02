const validarCantidadInteger = (atributo, input, res, min, max) => {
    if (!input) {
        res.status(400).json({
            success: false,
            message: `${atributo}: El campo es obligatorio.`
        })
    
        return;
    }
    
    if (
        typeof input !== 'number' || 
        isNaN(input) ||
        parseInt(input, 10) !== input
    ) {
        res.status(400).json({
            success: false,
            message: `${atributo}: '${input}' es inválido. El campo debe ser tipo Integer.`
        })
    
        return;
    }
    
    if (input < min || input > max) {
        res.status(400).json({
            success: false,
            message: `${atributo}: '${input}' es inválido. El minimo es ${min} y el máximo es ${max}.`
        })
    
        return;
    }
}

module.exports = validarCantidadInteger
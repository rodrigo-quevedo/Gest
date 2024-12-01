const validarReqQuerySearchbox = (req, res, next)=>{

    
    //validar inputs de la req.query (acá no puedo usar if(!req.query.searchBoxInput) porque tengo que dejar pasar el '', ese me lo toma como false el lenguaje javascript)
    if (req.query.searchBoxInput === null ||
        req.query.searchBoxInput === undefined
    ) {
        res.status(400).json({
            success: false,
            message: 'searchBoxInput: El campo es obligatorio.'
        })

        return;
    }

    
    if (typeof req.query.searchBoxInput !== 'string') {
        res.status(400).json({
            success: false,
            message: `searchBoxInput: '${req.query.searchBoxInput}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }

    
    if (/^[a-zA-ZÀ-ÿñÑ0-9 .]{0,50}$/.test(req.query.searchBoxInput) === false) {
        res.status(400).json({
            success: false,
            message: `searchBoxInput: '${req.query.searchBoxInput}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 0 y máximo 50 caracteres.`
        })

        return;
    }


    next ()
}

module.exports = validarReqQuerySearchbox
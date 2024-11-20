const POST =  (req, res) => {
    
    console.log('body de la request:', req.body)

    //isAuthenticated middleware me devuelve un objeto Session existente en la DB
    const userSession = res.locals.sessionInJwtPayload

    //validar body de la request:

    // PRODUCTO
    if (!req.body.producto) {
        res.status(400).json({
            success: false,
            message: 'producto: El campo es obligatorio.'
        })

        return;
    }

    if (typeof req.body.producto !== 'string') {
        res.status(400).json({
            success: false,
            message: `producto: '${req.body.producto}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }

    if (/^[a-zA-ZÀ-ÿñÑ0-9 ]{6,50}$/.test(req.body.producto) === false) {
        res.status(400).json({
            success: false,
            message: `producto: '${req.body.producto}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, y espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres.`
        })

        return;
    }


    // CANTIDAD
    if (!req.body.cantidad) {
        res.status(400).json({
            success: false,
            message: 'cantidad: El campo es obligatorio.'
        })

        return;
    }

    if (
        typeof req.body.cantidad !== 'number' || 
        isNaN(req.body.cantidad) ||
        parseInt(req.body.cantidad, 10) !== req.body.cantidad
    ) {
        res.status(400).json({
            success: false,
            message: `cantidad: '${req.body.cantidad}' es inválido. El campo debe ser tipo Integer.`
        })

        return;
    }

    if (req.body.cantidad < 0 || req.body.cantidad > 9999) {
        res.status(400).json({
            success: false,
            message: `cantidad: '${req.body.cantidad}' es inválido. El minimo es 0 y el máximo es 9999.`
        })

        return;
    }


    // PRECIO UNITARIO
    if (!req.body.precio_unitario) {
        res.status(400).json({
            success: false,
            message: 'precio_unitario: El campo es obligatorio.'
        })

        return;
    }

    //el float es más complicado, porque es check integer + check cant. decimales 
    if (
        typeof req.body.precio_unitario !== 'number' || 
        isNaN(req.body.precio_unitario) || 
        (
            // no es integer
            parseInt(req.body.precio_unitario, 10) !== req.body.precio_unitario
            && // Y
            (   
                // tampoco es Float con 1 o 2 decimales
                !(
                    //(para 1 o 2 decimales, devuelve true)
                    //los otros casos, que son los que busco para este guard,
                    //devuelve false, pero eso no me sirve; por eso
                    //lo doy vuelta con el "!"
                    req.body.precio_unitario.toString().split('.')[1]?.length === 1 ||
                    req.body.precio_unitario.toString().split('.')[1]?.length === 2
                )
            )
        )
    ) {
        res.status(400).json({
            success: false,
            message: `precio_unitario: '${req.body.precio_unitario}' es inválido. El campo debe ser Integer, o Float con 1 o 2 decimales.`
        })

        return;
    }



    // MARCA
    if (!req.body.marca) {
        res.status(400).json({
            success: false,
            message: 'marca: El campo es obligatorio.'
        })

        return;
    }

    if (typeof req.body.marca !== 'string') {
        res.status(400).json({
            success: false,
            message: `marca: '${req.body.marca}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }

    if (/^[a-zA-ZÀ-ÿñÑ0-9 ]{6,50}$/.test(req.body.marca) === false) {
        res.status(400).json({
            success: false,
            message: `marca: '${req.body.marca}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, y espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres.`
        })

        return;
    }

    // PROVEEDOR
    if (!req.body.proveedor) {
        res.status(400).json({
            success: false,
            message: 'proveedor: El campo es obligatorio.'
        })

        return;
    }
    
    if (typeof req.body.proveedor !== 'string') {
        res.status(400).json({
            success: false,
            message: `proveedor: '${req.body.proveedor}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }

    if (/^[a-zA-ZÀ-ÿñÑ0-9 ]{6,50}$/.test(req.body.proveedor) === false) {
        res.status(400).json({
            success: false,
            message: `proveedor: '${req.body.proveedor}' es inválido. Solo son válidos: letras mayúsculas, letras minúsculas, números, y espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres.`
        })

        return;
    }


    console.log('todo OK')
    res.status(200).json({
        success: true,
        message: `todo OK`
    })
}

module.exports = POST
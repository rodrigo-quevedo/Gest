const obtenerUsuario = async (req, res, next) => {

    console.log('Dentro de obtenerUsuario middleware..')

    const userSession = res.locals.sessionInJwtPayload

    const UsuariosModel = require('../models/Authentication/Usuarios')
    const usuarioEncontrado = await UsuariosModel.find({usuario: userSession.usuario}).exec()

    console.log('usuarioEncontrado[0]:', usuarioEncontrado[0])

    if (!usuarioEncontrado[0]?.idListaProductos) {
        console.log('No se pudo encontrar al usuario')

        res.status(400).json({
            success: false,
            message: `No se pudo encontrar al usuario.`
        })

        return;
    }

    res.locals.usuarioEncontrado = usuarioEncontrado[0]

    next()
}

module.exports = obtenerUsuario
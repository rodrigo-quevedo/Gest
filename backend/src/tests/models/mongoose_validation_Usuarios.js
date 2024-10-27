const UsuariosModel = require('../models/Authentication/Usuarios')


const testValidation = async () => {
    try {

        const usuarioCreado = await UsuariosModel.create({
            usuario: 'safd123',
            password: 'asdf123asdffdsA'
        })

        console.log(
            usuarioCreado ? 
                `Creado: ${usuarioCreado}` 
            : 
                `Error al agregar a la DB: ${usuarioCreado}`
        )
        
        return usuarioCreado;//retorno la promise para poder usar await al llamar esta función
    }
    catch (err) {
        console.log('MongoDB error:', err)
    }
}

module.exports = testValidation
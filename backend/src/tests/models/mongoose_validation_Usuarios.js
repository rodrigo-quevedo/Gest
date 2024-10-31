const UsuariosModel = require('../../models/Authentication/Usuarios')


const testValidation = async () => {
    UsuariosModel.init().then( 
        async () => {
        
            try {
        
                const usuarioCreado = await UsuariosModel.create({
                    usuario: 'safd123asdfadsf43',
                    password: 'asdf123asdffdsA',
                    isDemo: 'false'
                })
        
                console.log(
                    usuarioCreado ? 
                        `Creado: ${usuarioCreado}` 
                    : 
                        `Error al agregar a la DB: ${usuarioCreado}`
                )

                const usuarioCreado2 = await UsuariosModel.create({
                    usuario: 'safd123asdfadsf43',
                    password: 'asdf123asdffdsA',
                    isDemo: 'false'
                })
        
                console.log(
                    usuarioCreado2 ? 
                        `Creado: ${usuarioCreado2}` 
                    : 
                        `Error al agregar a la DB: ${usuarioCreado2}`
                )

                
                return usuarioCreado;//retorno la promise para poder usar await al llamar esta función
            }

            catch (err) {
                console.log('MongoDB error:', err)
            }

        }
    )
    .catch(err=> console.log(err))
}

module.exports = testValidation
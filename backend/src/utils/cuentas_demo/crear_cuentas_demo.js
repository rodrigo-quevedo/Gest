const UsuariosModel = require('../../models/Authentication/Usuarios')

const bcrypt = require('bcrypt')
async function crear_cuentas_demo  () {
    let numeroUsuario = 0;
    
    for (let i=0; i<4; i++){
        try {
            const usuarioCreado = await UsuariosModel.create({
                usuario: `UsuarioDemo${numeroUsuario++}`,
                password: bcrypt.hashSync('abc123ABC', 10),//password encriptada
                isDemo: true
            })
    
            if (usuarioCreado) {
                //LOG
                console.log(`Usuario creado: ${await UsuariosModel.find({usuario: `UsuarioDemo${numeroUsuario-1}`})}`)

        
            }
        }
        catch (err){
            console.log(err)

            if (err.name === "ValidationError") {
                let errors = {};
            
                Object.keys(err.errors).forEach((key) => {
                    if (err.errors[key].name === "CastError") {
                        errors[key] = `Tipo de dato incorrecto: ${err.errors[key].message}`;    
                    }
                    else {
                        errors[key] = err.errors[key].message;
                    }
                });

                
            }
            
            
            //error "unique" para usuarios repetidos:
            if (err.errorResponse?.code === 11000){
                console.log(`El usuario '${`UsuarioDemo${numeroUsuario-1}`}' ya existe.`)
                
            }
        }

    }


}

module.exports = crear_cuentas_demo
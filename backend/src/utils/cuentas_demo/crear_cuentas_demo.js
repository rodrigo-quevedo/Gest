const UsuariosModel = require('../../models/Authentication/Usuarios')

const bcrypt = require('bcrypt')
async function crear_cuentas_demo  () {
    let numeroUsuario = 0;
    
    try {
        for (let i=0; i<4; i++){
            const usuarioCreado = await UsuariosModel.create({
                usuario: `UsuarioDemo${numeroUsuario++}`,
                password: bcrypt.hashSync('abc123ABC', 10),//password encriptada
                isDemo: true
            })
    
            if (usuarioCreado) {
                //LOG
                console.log(`Usuario creado: ${await UsuariosModel.find({usuario: `UsuarioDemo${numeroUsuario-1}`})}`)
    
                //server response
                res.status(200).json({
                    success: true,
                    message: `Usuario creado con exito!. Usuario: ${req.body.usuario}`
                })
            }
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
        
            res.status(400).json({
                success: false,
                message: errors
            });

            return
        }
        
        
        //error "unique" para usuarios repetidos:
        if (err.errorResponse?.code === 11000){
            res.status(500).json({
                success: false,
                message: `El usuario '${req.body.usuario}' ya existe.`
            });
        }

    }


}

module.exports = crear_cuentas_demo
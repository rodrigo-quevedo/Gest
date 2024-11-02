const UsuariosModel = require('../../../models/Authentication/Usuarios')

const POST =  async (req, res) => {

    console.log(`Se recibio POST en /registrarse: ${new Date()}`)


    try {
        const usuarioCreado = await UsuariosModel.create({
            usuario: req.body.usuario,
            password: req.body.password,
            isDemo: false
        })

        if (usuarioCreado) {
            res.status(200).json({
                success: true,
                message: 'Usuario creado con exito!.'
            })
        }

        //creo que no hace falta porque salta un error y es manejado por el catch{}
        // else {
        //     console.log('Server: Error al crear el usuario')
        // }

    }
    catch (err){
        console.log(err)

        if (err.name === "ValidationError") {
            let errors = {};
      
            Object.keys(err.errors).forEach((key) => {
              errors[key] = err.errors[key].message;
            });
      
            res.status(400).json({
                success: false,
                message: errors
            });

            return
        }
        
        
        //error "unique" para usuarios repetidos:
        if (err.errorResponse.code === 11000){
            res.status(500).json({
                success: false,
                message: `El usuario '${req.body.usuario}' ya existe.`
            });
        }



    }
}

module.exports = POST
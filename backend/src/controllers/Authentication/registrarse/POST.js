const UsuariosModel = require('../../../models/Authentication/Usuarios')

const POST =  async (req, res) => {

    //LOGS
    console.log(`Se recibio POST en /registrarse: ${new Date()}`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT
    })

    if (
        req.body.password 
        && req.body.confirmPassword 
        && req.body.password !== req.body.confirmPassword
    ) {
        res.status(400).json({
            success: false,
            message: 'Las contraseñas no coinciden. Intente nuevamente.'
        })

        return;
    }

    try {
        const usuarioCreado = await UsuariosModel.create({
            usuario: req.body.usuario,
            password: req.body.password,
            isDemo: false
        })

        if (usuarioCreado) {
            //LOG
            console.log(`Usuario creado: ${req.body}`)

            //server response
            res.status(200).json({
                success: true,
                message: `Usuario creado con exito!. Usuario: ${req.body.usuario}`
            })
        }
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
        if (err.errorResponse?.code === 11000){
            res.status(500).json({
                success: false,
                message: `El usuario '${req.body.usuario}' ya existe.`
            });
        }


    }
}

module.exports = POST
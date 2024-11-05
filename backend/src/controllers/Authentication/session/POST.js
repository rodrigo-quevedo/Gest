const UsuariosModel = require('../../../models/Authentication/Usuarios')

const bcrypt = require('bcrypt')

const POST = async (req, res) => {
    
    //LOGS
    console.log(`Se recibio POST en /session: ${new Date()}`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT
    })

    //validacion
    if (!req.body.usuario) {
        res.status(400).json({
            success: false,
            message: 'usuario: El campo es obligatorio.'
        })

        return;
    }

    if (!req.body.password) {
        res.status(400).json({
            success: false,
            message: 'password: El campo es obligatorio.'
        })

        return;
    }

    if (typeof req.body.usuario !== 'string') {
        res.status(400).json({
            success: false,
            message: `password: '${req.body.usuario}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }

    if (typeof req.body.password !== 'string') {
        res.status(400).json({
            success: false,
            message: `password: '${req.body.password}' es inválido. El campo debe ser tipo String.`
        })

        return;
    }

    if (/^[a-zA-ZÀ-ÿñÑ0-9]{6,20}$/.test(req.body.usuario) === false) {
        res.status(400).json({
            success: false,
            message: `usuario: '${req.body.usuario}' es inválido. Solo son válidos las letras mayúsculas, las letras minúsculas y los números. NO se aceptan caracteres especiales. Mínimo 6 y máximo 20 caracteres.`
        })

        return;
    }

    if (/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])[a-zA-Z0-9ñÑ]{10,30}$/.test(req.body.password) === false) {
        res.status(400).json({
            success: false,
            message: `password: '${req.body.password}' es inválido. Los caracteres válidos son letras mayúsculas, letras minúsculas y números. NO se aceptan caracteres especiales, tampoco acentos o tildes. Debe tener entre 10 y 30 caracteres. Al menos 1 mayúscula, 1 minúscula y 1 número.`
        })

        return;
    }

    //Si no retonó con todas las validaciones de arriba, su formato es valido.
    //Ahora podemos comparar 'usuario' y 'password' contra la db:
    try {
        const usuarioEncontrado = await UsuariosModel.findOne({
            usuario: req.body.usuario
        }).exec()
    

        if (usuarioEncontrado) {
            console.log("El usuario existe:", usuarioEncontrado)
        }
        else {
            //LOG
            console.log('No se encontró al usuario')

            //Respuesta servidor
            res.status(400).json({
                success: false,
                message: `El usuario'${req.body.usuario}' no existe.`
            })
    
            return;
        }
    
        if (bcrypt.compareSync(req.body.password, usuarioEncontrado.password) ){
            console.log('El usuario y la contraseña son válidos')

            res.status(200).json({
                success: true,
                message: `Credenciales correctas!`
            })
    
            return;
        }

        else {
            console.log(`Contraseña incorrecta`)

            res.status(400).json({
                success: false,
                message: `La contraseña para el usuario'${req.body.usuario}' es incorrecta.`
            })
    
            return;
        }
    }
    catch(err) {
        console.log(err)
    }



}

module.exports = POST
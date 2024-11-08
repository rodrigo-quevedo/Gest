
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
    const UsuariosModel = require('../../../models/Authentication/Usuarios')
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
    
        //validacion de credenciales
        const bcrypt = require('bcrypt')
        if (bcrypt.compareSync(req.body.password, usuarioEncontrado.password) ){
            
            //credenciales validas, se crea Session
            console.log('El usuario y la contraseña son válidos')

            const minutes = process.env.SESSION_EXPIRATION_MINUTES

            const SessionsModel = require('../../../models/Authentication/Sessions')
            
            const usuarioSession = await SessionsModel.create({
                expiresAt: new Date(new Date().getTime() + (1000 * 60 * minutes)),
                usuario: req.body.usuario
            })

            console.log('usuarioSession: ', usuarioSession)

            //ahora ya con la session construida, podemos armar un JWT para mandarle al usuario (cliente)
            console.log(usuarioSession._id.toString())
            
            const jwt = require('jsonwebtoken')
            var sessionJWT = jwt.sign(
                { 
                    //Estos datos son legibles con un decodificador Base64Url.
                    //Aun asi, los datos son INMUTABLES, ya que el jwt se construye con este objeto (payload) y la primary key.
                    //-> Si se cambiara el objeto, osea, el payload, se deberia cifrar el jwt con la MISMA private key para que el metodo jwt.verify() lo valide.
                    //-> Es decir, la fortaleza del jwt para que sea inmutable es la fortaleza de la private key (aca yo la guardé en la variable de entorno JWT_PRIVATE_KEY)

                    //Conclusion: Que el usuario o la id de la session sean legibles no hace daño, ya que son inmutables.
                    //Por ejemplo: Un usuario no puede cambiarse el usuario a 'admin' o lo que sea, porque el payload del jwt es inmutable. Si el usuario llega a cambiar el payload, debe adivinar una PRIVATE KEY, construir el jwt modificado con ella, y enviar el jwt al servidor, pero allí en el servidor el metodo jwt.verify() lo va a invalidar ya que es imposible adivinar una PRIVATE KEY robusta. Por eso la importancia de usar una private key robusta en el metodo jwt.sign().

                    usuario: usuarioSession.usuario,
                    sessionId: usuarioSession._id.toString()
                }, 
                process.env.JWT_PRIVATE_KEY
            );



            //Para que cada cliente tenga 1 jwt, lo que tenemos que hacer es ponerlo en una cookie.
            //Realmente no tenemos alternativa, salvo alguna db del navegador.
            //State no podemos usar, ya que es algo global. (no estoy seguro)
            //En cualquier caso, lo voy a implementar con cookies ya que las maneja el navegador y me ahorro implementar algo del lado del frontend (del cliente).
            //ej: si quiero usar state, tengo que implementarlo en el frontend tambien.
            //En cambio, las cookies las puedo agregar y borrar desde el servidor.
            
            //poner el jwt en la cookie
            // const cookies = require('cookies')
            // new cookies(req, res)

            // const sessionCookieOptions = require('../../../config/sessionCookieOptions')
            res.cookies.set('jwt', sessionJWT, {
                maxAge: 1000 * 60 * process.env.SESSION_EXPIRATION_MINUTES, //10 mins
                // path: '/',// this is the default value
                domain: process.env.DOMAIN_REACT_CLIENT,//parece que localhost no es un dominio valido
                httpOnly: true,
                // partitioned: false;//esto igualmente no esta implementado por todos los navegadores aun (https://caniuse.com/?search=partitioned)
                sameSite: false,
                secure: true
            })
            console.log('existing cookies', req.cookies.get('jwt'))
            console.log(req.headers)



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
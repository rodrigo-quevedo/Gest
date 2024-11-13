const DELETE =  async (req, res) => {
        
    //LOGS
    console.log(`Se recibio DELETE en /session: ${new Date()}`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        //cookie cors
        "Access-Control-Allow-Credentials": "true"
    })


    //validar (por si contiene codigo malicioso), leer y corroborar cookie


    if (req.cookies?.jwt === undefined) {
        res.status(400).json({
            success: false,
            message: "No hay una cookie 'jwt'."
        })
        
        return;
    }

    //-->Esta validacion de abajo no se si es necesaria, ya que en teoria la cookie está en formato string, pero por si las dudas:
    if (typeof req.cookies?.jwt !== 'string') {
        res.clearCookie('jwt')

        res.status(400).json({
            success: false,
            message: 'JWT: Tipo de dato invalido, debe ser string.'
        })
        
        return;
    }
    //formato JWT
    if (/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/.test(req.cookies?.jwt) === false) {
        res.clearCookie('jwt')

        res.status(400).json({
            success: false,
            message: 'JWT: Formato invalido.'
        })
        
        return;
    }
    
    //aca estoy comprobando que se hasheó el token con mi misma private key (verificación de integridad)
    try{
        const jwt = require('jsonwebtoken')
        const jwtPayload = jwt.verify(req.cookies.jwt, process.env.JWT_PRIVATE_KEY)
    }
    catch(err){
        console.log(err)
        
        res.clearCookie('jwt')

        res.status(400).json({
            success: false,
            message: 'Se detectó que el JWT es inválido. El mismo no fue producido por el servidor.'
        })
        return;
    }
    

    //validacion del jwt payload 'sessionId'
    if (typeof jwtPayload.sessionId !== 'string') {
        res.clearCookie('jwt')
        
        res.status(400).json({
            success: false,
            message: 'JWT: Tipo de dato invalido, debe ser string.'
        })
        
        return;
    }
    //nota: en MongoDB, el ObjectId tiene un string de 24 caracteres hexadecimales
    if (/^[0-9a-fA-F]{24}$/.test(jwtPayload.sessionId) === false) {
        res.clearCookie('jwt')
        
        res.status(400).json({
            success: false,
            message: 'JWT: Formato invalido.'
        })
        
        return;
    }
    
    //eliminar session en DB (la session se guarda en la DB para guardar su tiempo de expiracion. Ese tiempo de expiracion es independiente del tiempo de expiracion de la cookie)
    try {
        const mongoose = require('mongoose')
        const SessionsModel = require('../../../models/Authentication/Sessions')

        //buscar que la sessionId del jwt exista
        const sessionInJwtPayload = await SessionsModel.findById(new mongoose.Types.ObjectId(jwtPayload.sessionId))

        

    }
    catch(err){
        console.log(err)

        //si bien no encuentro la sesion en la DB, se la voy a borrar de la cookie (aunque si la copio, el cliente la puede crear nuevamente; pero claro, no me afecta, ya que va a pasar lo mismo, no voy a encontrar la sesion)
        res.clearCookie('jwt')

        res.status(400).json({
            success: false,
            message: `No se pudo encontrar la sesión para cerrarla. ${err.message}`
        })
        
        return;
    }
    
    //eliminar session en frontend (cookie que se llama 'jwt')
    res.clearCookie('jwt')
    
    
    //server response
    res.status(200).json({
        success: true,
        message: 'Sesion cerrada con exito.'
    })

}

module.exports = DELETE
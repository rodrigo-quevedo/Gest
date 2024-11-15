const isAuthenticated = async (req, res, next)=> {

    //LOG
    console.log('Dentro de isAuthenticated middleware')

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
        res.clearCookie('jwt', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        })

        res.status(400).json({
            success: false,
            message: 'JWT: Tipo de dato invalido, debe ser string.'
        })
        
        return;
    }
    //formato JWT
    if (/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/.test(req.cookies?.jwt) === false) {
        res.clearCookie('jwt', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        })

        res.status(400).json({
            success: false,
            message: 'JWT: Formato invalido.'
        })
        
        return;
    }
    
    //aca estoy comprobando que se hasheó el token con mi misma private key (verificación de integridad)
    let jwtPayload = null;
    try{
        const jwt = require('jsonwebtoken')
        jwtPayload = jwt.verify(req.cookies.jwt, process.env.JWT_PRIVATE_KEY)
    }
    catch(err){
        console.log(err)
        
        res.clearCookie('jwt', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        })

        res.status(400).json({
            success: false,
            message: 'Se detectó que el JWT es inválido. El mismo no fue producido por el servidor.'
        })
        return;
    }
    

    //validacion del jwt payload 'sessionId'
    if (typeof jwtPayload.sessionId !== 'string') {
        res.clearCookie('jwt', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        })
        
        res.status(400).json({
            success: false,
            message: 'JWT: Tipo de dato invalido, debe ser string.'
        })
        
        return;
    }
    //nota: en MongoDB, el ObjectId tiene un string de 24 caracteres hexadecimales
    if (/^[0-9a-fA-F]{24}$/.test(jwtPayload.sessionId) === false) {
        res.clearCookie('jwt', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        })
        
        res.status(400).json({
            success: false,
            message: 'JWT: Formato invalido.'
        })
        
        return;
    }
    
    //buscar que la sessionId del jwt exista
    const mongoose = require('mongoose')
    const SessionsModel = require('../models/Authentication/Sessions')
    
    let sessionInJwtPayload = null;
    try {
        
        sessionInJwtPayload = await SessionsModel.findById(new mongoose.Types.ObjectId(jwtPayload.sessionId))
        
        console.log('session:', sessionInJwtPayload)
    }
    catch(err){
        console.log(err)

        //si bien no encuentro la sesion en la DB, se la voy a borrar de la cookie (aunque si la copio, el cliente la puede crear nuevamente; pero claro, no me afecta, ya que va a pasar lo mismo, no voy a encontrar la sesion)
        res.clearCookie('jwt', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        })

        res.status(400).json({
            success: false,
            message: `No se pudo encontrar la sesión. ${err.message}`
        })
        
        return;
    }

    //verificar que la sesión no caducó aún (comprobar expiresAt)
    console.log('expiresAt:', sessionInJwtPayload.expiresAt)
    console.log('comparando con: ',  new Date(new Date().getTime()))

    if (sessionInJwtPayload.expiresAt < new Date(new Date().getTime())) {
        console.log(`La sesión ya caducó.`)
    
        res.clearCookie('jwt', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        })
    
        res.status(400).json({
            success: false,
            message: `La sesión ya caducó.`
        })
        
        return;
    }
    

    //El middleware isAuthenticated le pasa la session del jwt a los siguientes middlewares.
    //Este sessionInJwtPayload es un objeto Session (tiene id, usuario y expiresAt)
    res.locals.sessionInJwtPayload = sessionInJwtPayload;

    next();
}

module.exports = isAuthenticated
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

    //la validacion se hace en el middleware isAuthenticated
    //ese middleware devuelve res.locals.sessionInJwtPayload
    const sessionInJwtPayload = res.locals.sessionInJwtPayload

    //eliminar session en DB (la session se guarda en la DB para guardar su tiempo de expiracion. Ese tiempo de expiracion es independiente del tiempo de expiracion de la cookie)
    try {
        const sessionBorrada = await SessionsModel.findOneAndDelete(sessionInJwtPayload)
        
        console.log('session borrada:', sessionBorrada)
    }
    catch(err){//error en el borrado del documento perteneciente al sessionId
        console.log(err)

        //si bien no encuentro la sesion en la DB, se la voy a borrar de la cookie (aunque si la copio, el cliente la puede crear nuevamente; pero claro, no me afecta, ya que va a pasar lo mismo, no voy a encontrar la sesion)
        res.clearCookie('jwt')

        res.status(400).json({
            success: false,
            message: `No se pudo cerrar la sesión. ${err.message}`
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
const SessionsModel = require('../models/Authentication/Sessions')

const eliminateExpiredSessions = async () => {
    
    const sessions = await SessionsModel.find({}).exec()

    for (var session of sessions) {
        if (session.expiresAt < new Date()) {//sesion expirada
            const sessionEliminated = await SessionsModel.findByIdAndDelete(session._id).exec()
            
            if (sessionEliminated){
                console.log(`Sesion eliminada:`, session)
            }
            else {
                console.log(`No se pudo eliminar la sesion:`, session)
            }
        }
    }
    

    setTimeout(()=>{
        eliminateExpiredSessions()
    }, 1000 * 60 * 10)//cada 10 min vuelve a comprobar
}


module.exports = eliminateExpiredSessions
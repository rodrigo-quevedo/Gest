//1. fecha actual
//2. si fecha actual = 1ro del mes, hacer backup
    //3. ->sacar ultima fecha de backup, si es hoy, no hacer backup

const do_collections_backup = require('./do_collections_backup')

const schedule_collections_backup = async (trial) => {

    console.log('configurando backups programados...')

    const fechaHoraActual = new Date()
    
    const Backups_List_Model = require('./Backups_List_Model')
    let ultimaFechaHora = await Backups_List_Model.find({}).sort({fechaHora: -1}).exec()

    console.log('ultima fecha hora:', ultimaFechaHora)

    if (ultimaFechaHora) {
        ultimaFechaHora = ultimaFechaHora[0].fechaHora
        evaluate_backup(fechaHoraActual, ultimaFechaHora)
    }
    else {
        if (trial >= 3) return;

        setTimeout(
            ()=> {
                schedule_collections_backup(trial+1)
            }
            , (1000 * 20)
        )
    }

    setTimeout(
        ()=> {
            console.log('timeout de schedule_collections_backup')
        
            evaluate_backup(fechaHoraActual, ultimaFechaHora)

        }
        , (1000 * 60 * 60 * 24)
    )

}    

const evaluate_backup = (fechaHoraActual, ultimaFechaHora) => {
    if (
        (
                fechaHoraActual.getDay() === 1 
            && 
                (
                        fechaHoraActual.getDay() !== ultimaFechaHora.getDay()
                    &&
                        fechaHoraActual.getMonth() !== ultimaFechaHora.getMonth()
                    &&
                        fechaHoraActual.getYear() !== ultimaFechaHora.getYear()
                )
        )
        ||
        ultimaFechaHora.length === 0
    ) {
        
        console.log('condition true')
        do_collections_backup('backup programado para cada 1ro de mes')

    }
}

module.exports = schedule_collections_backup
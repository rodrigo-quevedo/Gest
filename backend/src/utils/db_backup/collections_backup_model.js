const Backups_ListModel = require('./Backups_List_Model')


const get_last_backup_number = async (description) => {
    
    console.log('preparing to backup collections...')

    const existingBackups = await Backups_ListModel.find({}).sort({id: 'desc'}).exec()
    
    // console.log('existing backups result:', existingBackups)

    if (existingBackups.length > 0) {
        
        const lastBackupDoc = existingBackups[0]

        console.log('last backup is:', lastBackupDoc.id)
        const newBackupNumber = lastBackupDoc.id + 1;


        console.log('añadiendo backup a lista de backups')
        console.log(
            await Backups_ListModel.create({
                id: newBackupNumber, 
                backupDescription: description,
                fechaHora: new Date()
            })
        )


        return newBackupNumber

    }

    else {
        console.log('no backups list found')
        console.log(
            await Backups_ListModel.create({
                id: 1, 
                backupDescription: description,
                fechaHora: new Date()
            })
        )

        return 1
    }




}

module.exports = get_last_backup_number

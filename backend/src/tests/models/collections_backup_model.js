//default connection
const mongoose = require('mongoose')

//backup connection
const backups = process.env.DB_URL_BACKUPS;
const Backups_ListConnection = mongoose.createConnection(backups);

const Backups_ListSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        min: 0,
        validate : {
            validator : Number.isInteger,
            message: "La ID del backup debe ser un numero entero"
        }
    },
    backupDescription: {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 80,
        match: /^[a-zA-ZÀ-ÿñÑ0-9 ]{0,80}$/
    }
})

const Backups_ListModel = Backups_ListConnection.model('Backups_List', Backups_ListSchema)




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
                backupDescription: description 
            })
        )


        return newBackupNumber

    }

    else {
        console.log('no backups list found')
        console.log(
            await Backups_ListModel.create({
                id: 1, 
                backupDescription: description 
            })
        )

        return 1
    }




}

module.exports = get_last_backup_number

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

module.exports = Backups_ListModel
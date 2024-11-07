const mongoose = require('mongoose')

const SessionsSchema = new mongoose.Schema({
    //En vez de un custom id, puedo usar el ObjectID de mongoDB.
    //Esto va en el payload del jwt.

    expiresAt: {//esto tambien va en el payload del jwt
        type: Date,
        required: true
    },

    usuario: {//este no va en el jwt, solo lo accede el servidor.
        type: String,
        required: [true, "Es obligatorio llenar este campo."],
        minLength: [6, "La cantidad mínima de caracteres es 6."],
        maxLength: [20, "La cantidad máxima de caracteres es 20."],
        match: [/^[a-zA-ZÀ-ÿñÑ0-9]{6,20}$/, "Solo son válidos las letras mayúsculas, las letras minúsculas y los números. NO se aceptan caracteres especiales. Mínimo 6 y máximo 20 caracteres."]
        //no tiene 'unique' porque puede haber varias sessions con el mismo usuario, ej: login desde distintos dispositivos.
    }

})

const SessionsModel = mongoose.model('Sessions', SessionsSchema)

module.exports = SessionsModel
const mongoose = require('mongoose')

const UsuariosSchema = new mongoose.Schema({
    
    usuario: {
        type: [String, "Este campo debe ser tipo String"],
        required: [true, "Es obligatorio llenar este campo."],
        minLength: [0, "La cantidad mínima de caracteres es 0."],
        maxLength: [20, "La cantidad máxima de caracteres es 20."],
        match: [/^[a-zA-ZÀ-ÿñÑ0-9]{0,20}$/, "Solo son válidos las letras mayúsculas, las letras minúsculas y los números. NO se aceptan caracteres especiales. Máximo 20 caracteres."],
        unique: true//este tira un error de MongoDB, no de mongoose, así que lo manejo aparte.
    },

    password: {
        type: [String, "Este campo debe ser tipo String"],
        required: [true, "Es obligatorio llenar este campo."],
        minLength: [10, "La cantidad mínima de caracteres es 10."],
        maxLength: [30, "La cantidad máxima de caracteres es 30."],
        match: [/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])[a-zA-Z0-9ñÑ]{10,30}$/, "Los caracteres válidos son letras mayúsculas, letras minúsculas y números. NO se aceptan caracteres especiales, tampoco acentos o tildes. Debe tener entre 10 y 30 caracteres. Al menos 1 mayúscula, 1 minúscula y 1 número."]
    },

    isDemo: {
        type: [Boolean, "Este campo debe ser tipo Boolean"],
        required:  [true, "Es obligatorio llenar este campo."],
    }
    
})

const Usuarios = mongoose.model('Usuarios', UsuariosSchema)

module.exports = Usuarios
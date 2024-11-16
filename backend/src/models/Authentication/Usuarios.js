const mongoose = require('mongoose')

const UsuariosSchema = new mongoose.Schema({
    
    usuario: {
        type: String,
        required: [true, "Es obligatorio llenar este campo."],
        minLength: [6, "La cantidad mínima de caracteres es 6."],
        maxLength: [20, "La cantidad máxima de caracteres es 20."],
        match: [/^[a-zA-ZÀ-ÿñÑ0-9]{6,20}$/, "Solo son válidos las letras mayúsculas, las letras minúsculas y los números. NO se aceptan caracteres especiales. Mínimo 6 y máximo 20 caracteres."],
        unique: true//este tira un error de MongoDB, no de mongoose, así que lo manejo aparte.
    },

    password: {
        type: String, 
        required: [true, "Es obligatorio llenar este campo."]
    },

    isDemo: {
        type: Boolean,
        required:  [true, "Es obligatorio llenar este campo."]
    },

    idListaProductos: {
        type: mongoose.Types.ObjectId,
        required:  [true, "Es obligatorio llenar este campo."]
    },

    idHistorialProductos: {
        type: mongoose.Types.ObjectId,
        required:  [true, "Es obligatorio llenar este campo."]
    },

    idHistorialVentas: {
        type: mongoose.Types.ObjectId,
        required:  [true, "Es obligatorio llenar este campo."]
    }
    
})

const Usuarios = mongoose.model('Usuarios', UsuariosSchema)

module.exports = Usuarios
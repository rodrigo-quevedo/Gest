const mongoose = require('mongoose')

const UsuariosSchema = new mongoose.Schema({
    
    usuario: {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 20,
        match: /^[a-zA-ZÀ-ÿñÑ0-9]{0,20}$/
    },

    password: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 30,
        match: /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])[a-zA-Z0-9ñÑ]{10,30}$/
    }
    
})

const Usuarios = mongoose.model('Usuarios', UsuariosSchema)

module.exports = Usuarios
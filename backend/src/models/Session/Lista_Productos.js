const mongoose = require('mongoose') 

const Lista_ProductosSchema = new mongoose.Schema({
    
    listaProductos : [
        {
            producto : {
                type: String,
                required: [true, "Es obligatorio llenar este campo."],
                minLength: [6, "La cantidad mínima de caracteres es 6."],
                maxLength: [50, "La cantidad máxima de caracteres es 20."],
                match: [/^[a-zA-ZÀ-ÿñÑ0-9 .]{6,50}$/, "Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres."]
            },
            cantidad : {
                type: Number,
                required: [true, "Es obligatorio llenar este campo."],
                min: [0, "El min es 0. (value es {VALUE})"],
                max: [9999, "El max es 9999. (value es {VALUE})"],
                validate : {
                    validator : Number.isInteger,
                    message   : '{VALUE} is not an integer value'
                }
            },
            precio_unitario : {
                type: mongoose.Decimal128,
                required: true,
                //min y max son built-in validators del type Number
                // min: 0,
                // max: 999999999,
                //si le hago el set, no necesito get,porque se inserta con 2 digitos directamente
                set: v => {
                return new mongoose.Types.Decimal128(v.toFixed(2));
                },
                validate: {
                    validator : (v) => {
                        return v > 0 && v < 999999999
                    },
                    message : 'Min value is 0, max value is 999999999 (value is {VALUE})'
                }
                
            },
            marca :  {
                type: String,
                required: [true, "Es obligatorio llenar este campo."],
                minLength: [6, "La cantidad mínima de caracteres es 6."],
                maxLength: [50, "La cantidad máxima de caracteres es 20."],
                match: [/^[a-zA-ZÀ-ÿñÑ0-9 .]{6,50}$/, "Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres."]
            },
            proveedor:  {
                type: String,
                required: [true, "Es obligatorio llenar este campo."],
                minLength: [6, "La cantidad mínima de caracteres es 6."],
                maxLength: [50, "La cantidad máxima de caracteres es 20."],
                match: [/^[a-zA-ZÀ-ÿñÑ0-9 .]{6,50}$/, "Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres."]
            }
        }
    ]

})

const Lista_ProductosModel = mongoose.model('Lista_Productos', Lista_ProductosSchema)

module.exports = Lista_ProductosModel
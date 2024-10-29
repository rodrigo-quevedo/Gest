const mongoose = require('mongoose')

const Historial_VentasSchema = new mongoose.Schema({
    producto : {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 50,
        match: /^[a-zA-ZÀ-ÿñÑ0-9 ]{0,50}$/
    },
    cantidad : {
        type: Number,
        required: true,
        min: 0,
        max: 9999,
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
        required: true,
        minLength: 0,
        maxLength: 50,
        match: /^[a-zA-ZÀ-ÿñÑ0-9 ]{0,50}$/
    },
    proveedor:  {
        type: String,
        required: true,
        minLength: 0,
        maxLength: 50,
        match: /^[a-zA-ZÀ-ÿñÑ0-9 ]{0,50}$/
    },
    fechaHora : {
        type : Date,
        required: true
    }  
})

const Historial_VentasModel = mongoose.model('Historial_Ventas', Historial_VentasSchema)

module.exports = Historial_VentasModel
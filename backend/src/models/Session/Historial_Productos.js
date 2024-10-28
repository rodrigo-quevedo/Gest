const mongoose = require('mongoose') 

const Historial_ProductosSchema = new mongoose.Schema({
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
        min: 0,
        max: 999999999,
        //si le hago el set, no necesito get,porque se inserta con 2 digitos directamente
        set: v => {
          return new mongoose.Types.Decimal128(v.toFixed(2));
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
    }

})

const Historial_ProductosModel = mongoose.model('Historial_Productos', Historial_ProductosSchema)

module.exports = Historial_ProductosModel
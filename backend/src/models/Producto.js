// const connection = require('../config/database')
const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
    product: {type: String}
})

const Producto = mongoose.model('producto', ProductoSchema)

module.exports = Producto
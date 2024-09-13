const express = require('express')
const ProductosRouter = express.Router()

const get = require('../controllers/productos/GET')

ProductosRouter.get('/', get)

module.exports = ProductosRouter
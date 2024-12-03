//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/historial_ventas/GET')
const POSTcontroller = require('../../controllers/Session/historial_ventas/POST')
const OPTIONScontroller = require('../../controllers/Session/historial_ventas/OPTIONS')


//middleware import
const isAuthenticated = require('../../middleware/isAuthenticated')
const cors_basico = require('../../middleware/cors_basico')
const validarReqQuerySearchbox = require('../../middleware/validarReqQuerySearchbox')
const obtenerUsuario = require('../../middleware/obtenerUsuario')
const validarReqBodyProducto = require("../../middleware/validarReqBodyPoducto")


//routing
router.get('/', cors_basico, isAuthenticated, validarReqQuerySearchbox, obtenerUsuario,  GETcontroller)
router.post('/', cors_basico, isAuthenticated, validarReqBodyProducto, obtenerUsuario, POSTcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/historial_ventas/GET')
const POSTcontroller = require('../../controllers/Session/historial_ventas/POST')
const OPTIONScontroller = require('../../controllers/Session/historial_ventas/OPTIONS')

//routing
router.get('/', GETcontroller)
router.post('/', POSTcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
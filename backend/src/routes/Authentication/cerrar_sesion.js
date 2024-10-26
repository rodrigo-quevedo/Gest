//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Authentication/cerrar_sesion/GET')
const OPTIONScontroller = require('../../controllers/Authentication/cerrar_sesion/OPTIONS')

//routing
router.get('/', GETcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
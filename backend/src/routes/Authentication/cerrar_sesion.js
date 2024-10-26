//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Authentication/cerrar_sesion/GET')

//routing
router.get('/', GETcontroller)

//export
module.exports = router
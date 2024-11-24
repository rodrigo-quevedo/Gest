//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/historial_productos/GET')
const POSTcontroller = require('../../controllers/Session/historial_productos/POST')
const OPTIONScontroller = require('../../controllers/Session/historial_productos/OPTIONS')


//middleware import
const isAuthenticated = require('../../middleware/isAuthenticated')
const cors_basico = require('../../middleware/cors_basico')


//routing
router.get('/', cors_basico, isAuthenticated, GETcontroller)
router.post('/', cors_basico, isAuthenticated, POSTcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
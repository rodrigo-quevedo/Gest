//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/historial_productos/GET')
const POSTcontroller = require('../../controllers/Session/historial_productos/POST')
const OPTIONScontroller = require('../../controllers/Session/historial_productos/OPTIONS')

//routing
router.get('/', GETcontroller)
router.post('/', POSTcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
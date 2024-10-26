//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/historial_productos/GET')
const POSTcontroller = require('../../controllers/Session/historial_productos/POST')

//routing
router.get('/', GETcontroller)
router.post('/', POSTcontroller)

//export
module.exports = router
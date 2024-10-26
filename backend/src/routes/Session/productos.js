//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/productos/GET')

//routing
router.get('/', GETcontroller)

//export
module.exports = router
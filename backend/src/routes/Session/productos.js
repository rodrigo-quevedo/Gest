//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/productos/GET')
const OPTIONScontroller = require('../../controllers/Session/productos/OPTIONS')

//routing
router.get('/', GETcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
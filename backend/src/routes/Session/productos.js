//setup
const express = require('express')
const router = express.Router()

//controller import
const GETcontroller = require('../../controllers/Session/productos/GET')
const OPTIONScontroller = require('../../controllers/Session/productos/OPTIONS')

//middleware import
const isAuthenticated = require('../../middleware/isAuthenticated')
const cors_basico = require('../../middleware/cors_basico')

//routing
router.get('/', cors_basico, isAuthenticated, GETcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
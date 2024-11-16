//setup
const express = require('express')
const router = express.Router()

//controller import
const OPTIONScontroller = require('../../controllers/Authentication/session/OPTIONS')
const POSTcontroller = require('../../controllers/Authentication/session/POST')
const DELETEcontroller = require('../../controllers/Authentication/session/DELETE')

//middleware import
const isAuthenticated = require('../../middleware/isAuthenticated')
const cors_basico = require('../../middleware/cors_basico')
const ingresar_con_jwt_cookie = require('../../middleware/ingresar_con_jwt_cookie')

//routing
router.options('/', OPTIONScontroller)
router.post('/', cors_basico, ingresar_con_jwt_cookie, POSTcontroller)//ingresar
router.delete('/', cors_basico, isAuthenticated, DELETEcontroller)//cerrar sesion

//export
module.exports = router
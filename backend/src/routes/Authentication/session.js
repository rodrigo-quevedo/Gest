//setup
const express = require('express')
const router = express.Router()

//controller import
const OPTIONScontroller = require('../../controllers/Authentication/session/OPTIONS')
const POSTcontroller = require('../../controllers/Authentication/session/POST')
const DELETEcontroller = require('../../controllers/Authentication/session/DELETE')


//routing
router.options('/', OPTIONScontroller)
router.post('/', POSTcontroller)//ingresar
router.delete('/', DELETEcontroller)//cerrar sesion

//export
module.exports = router
//setup
const express = require('express')
const router = express.Router()

//controller import
const POSTcontroller = require('../../controllers/Authentication/registrarse/POST')
const OPTIONScontroller = require('../../controllers/Authentication/registrarse/OPTIONS')

//routing
router.post('/', POSTcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
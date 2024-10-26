//setup
const express = require('express')
const router = express.Router()

//controller import
const POSTcontroller = require('../../controllers/Authentication/ingresar/POST')
const OPTIONScontroller = require('../../controllers/Authentication/ingresar/OPTIONS')


//routing
router.post('/', POSTcontroller)
router.options('/', OPTIONScontroller)

//export
module.exports = router
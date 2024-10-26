//setup
const express = require('express')
const router = express.Router()

//controller import
const POSTcontroller = require('../../controllers/Authentication/registrarse/POST')


//routing
router.post('/', POSTcontroller)

//export
module.exports = router
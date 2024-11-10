const express = require('express')
const router = express.Router()

const optionsController = require('../../controllers/Authentication/cuentas_demo/OPTIONS')
const getController = require('../../controllers/Authentication/cuentas_demo/GET')

router.options('/', optionsController)
router.get('/', getController)

module.exports = router



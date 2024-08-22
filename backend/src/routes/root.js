const express = require('express')
const router = express.Router()

const get = require('../controllers/rootGET')


router.get('/', get)

module.exports = router
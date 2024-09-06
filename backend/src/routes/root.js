const express = require('express')
const router = express.Router()

const get = require('../controllers/rootGET')
const post = require('../controllers/rootPOST')
const options = require('../controllers/rootOPTIONS')


router.get('/', get)
router.post('/', post)
router.options('/', options)

module.exports = router
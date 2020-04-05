var express = require('express')
var router = express.Router()
const validate = require('../validate/user.validate')
const shortid = require('shortid')
const controller = require('../controllers/controller')

router.get('',controller.index)

router.get('/search', controller.search)

router.get('/create',controller.create)

router.get('/:id', controller.getId)

router.post('/create', validate.postCreate ,controller.postCreate)

module.exports = router
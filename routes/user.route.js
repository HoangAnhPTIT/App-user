var express = require('express')
var multer  = require('multer')
var router = express.Router()
const validate = require('../validate/user.validate')
const shortid = require('shortid')
const controller = require('../controllers/controller')
var upload = multer({ dest: './public/uploads/' })


router.get('/',controller.index)

router.get('/search', controller.search)

router.get('/create',controller.create)

router.get('/:id', controller.getId)

router.post('/create',
 upload.single('avatar'), 
 validate.postCreate ,
 controller.postCreate
 )

module.exports = router
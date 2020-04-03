var express = require('express')
var router = express.Router()
const db = require('../db')
const shortid = require('shortid')


router.get('',function(req,res){
	res.render('users',{
		users: db.get('users').value()
	})
})

router.get('/search', (req, res) => {
	var q = req.query.q
	var matchedUsers = db.get('users').value().filter((users) => {
		return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	})
	res.render('users',{
		users : matchedUsers
	})
})

router.get('/create',(req, res) => {
	res.render('create')
})

router.get('/:id', (req, res)=>{
	var id = req.params.id
	var user = db.get('users').find({id : id}).value()
	res.render('view',{
		user: user
	})
})

router.post('/create', (req, res) => {
	req.body.id= shortid.generate()
	db.get('users').push(req.body).write()
	res.redirect('/users')
})

module.exports = router
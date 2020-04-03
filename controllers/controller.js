
const db = require('../db')
const shortid = require('shortid')


module.exports.index = function(req,res){
	res.render('users',{
		users: db.get('users').value()
	})
}

module.exports.search = (req, res) => {
	var q = req.query.q
	var matchedUsers = db.get('users').value().filter((users) => {
		return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	})
	res.render('users',{
		users : matchedUsers
	})
}

module.exports.create = (req, res) => {
	res.render('create')
}

module.exports.getId = (req, res)=>{
	var id = req.params.id
	var user = db.get('users').find({id : id}).value()
	res.render('view',{
		user: user
	})
}

module.exports.postCreate = (req, res) => {
	req.body.id= shortid.generate()
	db.get('users').push(req.body).write()
	res.redirect('/users')
}
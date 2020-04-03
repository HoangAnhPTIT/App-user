const express = require('express')
const app = express()
const port = 3000

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const shortid = require('shortid')

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
db.defaults({ users:[] })
  .write()


var users = [
			{ id:1 , name: 'Anh'},
			{ id:2 , name: 'Cun'}
		]

app.get('/', (req, res) => res.render('index'))

app.get('/users',function(req,res){
	res.render('users',{
		users: db.get('users').value()
	})
})

app.get('/users/search', (req, res) => {
	var q = req.query.q
	var matchedUsers = db.get('users').value().filter((users) => {
		return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	})
	res.render('users',{
		users : matchedUsers
	})
})

app.get('/users/create',(req, res) => {
	res.render('create')
})

app.get('/users/:id', (req, res)=>{
	var id = req.params.id
	var user = db.get('users').find({id : id}).value()
	console.log(user)
	res.render('view',{
		user: user
	})
})

app.post('/users/create', (req, res) => {
	req.body.id= shortid.generate()
	db.get('users').push(req.body).write()
	res.redirect('/users')
})











app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
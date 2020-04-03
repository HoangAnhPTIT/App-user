const express = require('express')
const app = express()
const port = 3000
const userRoute = require('./routes/user.route')

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded




app.get('/', (req, res) => res.render('index'))

app.use('/users', userRoute)










app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
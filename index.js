const express = require('express')
const app = express()
const port = 3000

const cartRoute = require('./routes/cart.route')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/products.route')
var cookieParser = require('cookie-parser')
const authMiddleware = require('./middlewares/auth.middleware')
const sesionMiddleware = require('./middlewares/session.middleware')

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser("ariuhfashf23uh"))
app.use(sesionMiddleware)

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

app.use('/users',authMiddleware.requireAuth, userRoute)

app.use('/auth', authRoute)

app.use('/product', productRoute)

app.use('/cart', cartRoute)






app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
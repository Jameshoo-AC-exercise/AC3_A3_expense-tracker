const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const session = require('express-session')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT
require('./config/mongoose')

const hbs = exphbs.create({ defaultLayout: 'main', extname: 'hbs' })
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(
  session({
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`The express server was started under localhost:${port}`)
})

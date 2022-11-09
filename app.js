const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
// dotenv setting
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT

//自己設定的引用的項目
require('./config/mongoose')
const routes = require('./routes')


//使用套件後產生的
const app = express()

//handlebars setting
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')  //啟用引擎

// user body get 
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
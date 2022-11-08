const express = require('express')
const PORT = process.env.PORT || 3000

//使用套件後產生的
const app = express()

// user body get 
app.use(express.urlencoded({ extended: true }))

//router setting
app.get('/', (req, res) => {
  res.send('This is my test page for initialization(初始化) ')
})

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
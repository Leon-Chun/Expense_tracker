const express = require('express')
const router = express.Router()

//底下小路由們
const home = require('./modules/home')
const others = require('./modules/others')
const users = require('./modules/users')  

//請求與對應小路由。 務必由嚴格的網址，排到簡單網址。因機制是由上往下一一比對。
router.use('/expense-tracker', others)
router.use('/users', users)
router.use('/', home)

module.exports = router
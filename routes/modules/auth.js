const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook', {   //是向 Facebook 發出請求
  scope: ['email', 'public_profile']        //是我們向 Facebook 要求的資料
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router

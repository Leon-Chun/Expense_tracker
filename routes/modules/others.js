const express = require('express')
const router = express.Router() // 啟動路由器功能
const Recort = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
 
})

router.post('/new', (req, res) => {
  return Recort.create({ ...req.body }) 
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
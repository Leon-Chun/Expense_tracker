const express = require('express')
const router = express.Router() // 啟動路由器功能
const record = require('../../models/record')

router.get('/', (req, res) => {
  res.render('index')
  // Todo.find()
  //   .lean()
  //   .sort({ name: 'asc' }) //desc 反序
  //   .then(todos => res.render('index', { todos }))
  //   .catch(error => console.error(error))
})

module.exports = router
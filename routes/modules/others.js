const express = require('express')
const router = express.Router() // 啟動路由器功能
// const Todo = require('../../models/todo') //資料庫資料，並刪除 app.js的引入

router.get('/new', (req, res) => {
  res.render('new')
  // Todo.find()
  //   .lean()
  //   .sort({ name: 'asc' }) //desc 反序
  //   .then(todos => res.render('index', { todos }))
  //   .catch(error => console.error(error))
})

module.exports = router
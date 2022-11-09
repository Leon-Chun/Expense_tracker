const express = require('express')
const router = express.Router() // 啟動路由器功能
const Recort = require('../../models/record')


router.get('/new', (req, res) => {
  res.render('new')
  // Todo.find()
  //   .lean()
  //   .sort({ name: 'asc' }) //desc 反序
  //   .then(todos => res.render('index', { todos }))
  //   .catch(error => console.error(error))
})

router.post('/new', (req, res) => {
  // const userId = req.user._id
  return Recort.create({ ...req.body }) //,userId
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
  // const userId = req.user._id
  const _id = req.params.id
  return Recort.findById({ _id }) //,userId
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
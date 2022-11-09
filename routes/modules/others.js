const express = require('express')
const router = express.Router() // 啟動路由器功能
const Recort = require('../../models/record')
const moment = require('moment')

//首頁
router.get('/new', (req, res) => {
  res.render('new')
  // Todo.find()
  //   .lean()
  //   .sort({ name: 'asc' }) //desc 反序
  //   .then(todos => res.render('index', { todos }))
  //   .catch(error => console.error(error))
})

//新增
router.post('/new', (req, res) => {
  // const userId = req.user._id
  return Recort.create({ ...req.body }) //,userId
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//修改
router.get('/:id/edit',(req,res) => {
  const _id = req.params.id
  return Recort.findById({ _id }) //,userId
    .lean()
    // .populate('category')
    .then(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      // categories.forEach(category => {
      //   if (category._id.toString() === record.category._id.toString()) {
      //     category.selected = 'selected'
      //   }
      // })
      res.render('edit', { record })// , categories
    })
    .catch(error => console.log(error))
})

// router.put('/:id', (req, res) => {
//   // const userId = req.user._id
//   const _id = req.params.id
//   return Recort.findById({ _id }) //,userId
//     .then(record => record.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

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
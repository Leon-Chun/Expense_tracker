const express = require('express')
const router = express.Router() // 啟動路由器功能
const Recort = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')

//首頁
router.get('/new', (req, res) => {
  Category.find({})
    .sort({ id : 'asc' })
    .lean()
    .then(categoryData => {
        res.render('new',{categoryData})
    })
})

//新增
router.post('/new', (req, res) => {
  const userId = req.user._id

  return Recort.create({ ...req.body ,userId}) 
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//前往修改頁面
router.get('/:id/edit', async (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  console.log(req.params)
  const categoryData = []

  await Category.find({})
    .sort({ id: 'asc' })
    .lean()
    .then(categories => {
      categoryData.push(...categories)
    })

  return Recort.findOne({ _id ,userId})
    .lean()
    .then(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record, categoryData })
    })
    .catch(error => console.log(error))
})


//修改
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const {name,date,categoryId,amount} = req.body

  return Recort.findOne({ _id ,userId })
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      record.save()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})



//刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Recort.findOne({ _id ,userId})
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
const express = require('express')
const router = express.Router() // 啟動路由器功能
const Recort = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')
const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

//首頁
router.get('/new', (req, res) => {
  res.render('new')
})

//新增
router.post('/new', (req, res) => {
  // const userId = req.user._id
  return Recort.create({ ...req.body }) //,userId
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.get('/:id/edit',(req,res) => {
  const _id = req.params.id
  return Recort.findById({ _id }) //,userId
    .lean()
    // .populate('category')
    .then(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})


//修改
router.put('/:id', (req, res) => {
  // const userId = req.user._id
  const _id = req.params.id
  const body = req.body
 
  return Recort.findOne({ _id }) //,userId
    .then(() =>  res.redirect('/'))
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
const express = require('express')
const router = express.Router() 
const Record = require('../../models/record')
const Category= require('../../models/category')
const moment = require('moment')


router.get('/', async(req, res) => {
  const userId = req.user._id
  const category = req.body.category //body 是 抓使用者輸入
  const categorySelect = []
  let totalAmount = 0
  let categoryData=[]
  // let categories = []

  await Category.find({})
    .lean()
    .then(categories => {
      categoryData.push(...categories)
      categories.forEach(category => {
        // 下拉選單保留選擇項目
        if (category._id.toString() === req.query.category) {
          category.selected = 'selected'
          categorySelect.push(req.query.category)
          // 若沒選擇，就全選
        } else if (!req.query.category) {
          categorySelect.push(category)
        }
      })
    })


  await Record.find({ userId })//, catogory:categorySelect
    .lean()
    .then(data => {
      data.forEach(record => {
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
        categoryData.forEach(category => {
          if (category.id == record.categoryId){
            record.categoryIconName = category.icon
          }
        })
      })
      res.render('index', { data, totalAmount, categoryData })
    })
    .catch(error => console.error(error))
})

module.exports = router
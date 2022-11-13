const express = require('express')
const router = express.Router() 
const Record = require('../../models/record')
const Category= require('../../models/category')
const moment = require('moment')


router.get('/', async(req, res) => {
  const userId = req.user._id
  const categorySelect = []
  let totalAmount = 0
  let categoryData=[]
  // let categories = []

  await Category.find({})
    .sort({id : 'asc'})
    .lean()
    .then(categories => {
      categoryData.push(...categories)
      categories.forEach(category => {
           //依照下拉選單的選項塞入id
        if (category.id.toString() === req.query.category) {
          category.selected = 'selected'
          categorySelect.push(req.query.category)
          // 若無，則全分類輸入
        } else if (!req.query.category) {
          categorySelect.push(category.id)
        }
      })
    })

  await Record.find({ userId , categoryId:categorySelect})
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
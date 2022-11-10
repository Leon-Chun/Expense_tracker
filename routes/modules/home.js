const express = require('express')
const router = express.Router() // 啟動路由器功能
const record = require('../../models/record')
const moment = require('moment')
const CATEGORYICON = {
  1 : "fa-solid fa-house",
  2 : "fa-solid fa-van-shuttle",
  3 : "fa-solid fa-face-grin-beam",
  4 : "fa-solid fa-utensils",
  5 : "fa-solid fa-pen"
}


router.get('/', async(req, res) => {
  let totalAmount = 0
  let categoryIcon = {}
  await record.find()
    .lean()
    // .sort({ name: 'asc' }) //desc 反序
    .then(data => {
      data.forEach(record => {
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
        for (let key in CATEGORYICON) {
          if (record.categoryId == key) {
            record.categoryIconName = CATEGORYICON[key]
            break
          }
        }
      })
      res.render('index', { data ,totalAmount,categoryIcon}) //, categories , totalAmount
    })
    .catch(error => console.error(error))
})

module.exports = router
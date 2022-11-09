const express = require('express')
const router = express.Router() // 啟動路由器功能
const record = require('../../models/record')
const moment = require('moment')

router.get('/', (req, res) => {
  record.find()
    .lean()
    // .sort({ name: 'asc' }) //desc 反序
    .then(data => {
      data.forEach(record => {
        record.date = moment(record.date).format('YYYY-MM-DD')
        // totalAmount += record.amount
      })
      res.render('index', { data }) //, categories , totalAmount
    })
    .catch(error => console.error(error))
})

module.exports = router
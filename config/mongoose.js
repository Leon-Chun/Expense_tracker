const mongoose = require('mongoose')

//database setting 貼在路由前。 此段是 雲端資料庫
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection    // 取得資料庫連線狀態
db.on('error', () => {                  // 連線異常
  console.log('mongodb error')
})
db.once('open', () => {                // 連線成功
  console.log('mongodb connected')
})

module.exports = db
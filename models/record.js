const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  categoryId: { type: Number, ref:'Category' , index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  createdAd: { type: Date, default: Date.now },
  userId: { 
    type: Schema.Types.ObjectId,    //`type` 和 `ref` 這兩個設定是一起
    ref: 'User',  //定義參考對象是 User model
    index: true,   //增加讀取效能
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
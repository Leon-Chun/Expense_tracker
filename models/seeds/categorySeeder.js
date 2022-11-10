const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const categoryData = [
  { id: 1, name: "家居物業", icon: "fa-solid fa-house" },
  { id: 2, name: "交通出行", icon: "fa-solid fa-van-shuttle" },
  { id: 3, name: "休閒娛樂", icon: "fa-solid fa-face-grin-beam" },
  { id: 4, name: "餐飲食品", icon: "fa-solid fa-utensils" },
  { id: 5, name: "其他", icon: "fa-solid fa-pen" }
]

db.once('open', () => {
  return Promise.all(
    categoryData.map((category) => {
      return Category.create(category)
    })
  )
    .then(() => {
      console.log('categorySeeder done.')
      process.exit()
    })
    .catch((err) => console.log(err))
})
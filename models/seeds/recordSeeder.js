const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USERS = [{
  name: 'user1',
  email: 'aaa@aaa.aaa',
  password: 'a'
}]

const itemsSeeder = [{
  name: '藍筆',
  date: '2022-08-01',
  categoryId: 5,
  amount: 15,
}, {
  name: '我的生日',
  date: '2022-09-21',
  categoryId: 4,
  amount: 100000,
}, {
  name: '慢喂門票',
  date: '2022-08-08',
  categoryId: 3,
  amount: 300,
}, {
  name: '電競椅',
  date: '2022-11-15',
  categoryId: 1,
  amount: 20000,
}, {
  name: '股票講座',
  date: '2018-09-05',
  categoryId: 2,
  amount: 500,
}]


db.once('open', () => {
  Promise.all(SEED_USERS.map((SEED_USER) =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))

      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))

      .then(user => {
        const userId = user._id
        return Promise.all(itemsSeeder.map(record => {
          return Record.create({ ...record, userId })
        }))
      })
  ))

    .then(() => {
      console.log('recordSeeder done.')
      process.exit()
    })
})
const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  pwd: String
})

const articleSchema = new Schema({
  content: String,
  title: String,
  date: Date,
  uname: String,
  address: String,
  mobile: String,
  amount: String
})

const whiteSchema = new Schema({
  uname: String,
  address: String,
  mobile: String,
  amount: String,
  windowNum: String,
  createTime: String
})

const clothSchema = new Schema({
  name: String,
  source: String,
  mobile: String,
  bankCard: String,
  uname: String,
  price: String,
  length: String,
  deliveryTime: String,
})


const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  White: mongoose.model('White', whiteSchema),
  Cloth: mongoose.model('Cloth', clothSchema),
  initialized: false
}

const initialize = function () {
  Models.User.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (!doc.length) {
      console.log('Database opens for the first time...')
      // Promise.all(init.map(item => new Models[item.type](item).save()))
      //   .then(() => console.log('Initialize successfully.'))
      //   .catch(() => console.log('Something went wrong during initializing.'))
    } else {
      Models.initialized = true
    }
  })
}

mongoose.connect('mongodb://localhost/YYCL')
// mongoose.set('debug', true)

const db = mongoose.connection

db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
  initialize()
})

module.exports = Models

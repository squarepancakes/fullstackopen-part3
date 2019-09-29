const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, )
  .then(() => console.log('connected'))
  .catch(error => console.log(error.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
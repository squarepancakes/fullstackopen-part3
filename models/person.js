const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } )
  .then(() => console.log('connected'))
  .catch(error => console.log(error.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
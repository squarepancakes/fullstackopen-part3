require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())

app.use(bodyParser.json())

app.use(express.static('build'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      const transformed = persons.map(person => person.toJSON())
      response.json(transformed)
    })

})

app.get('/info', (request, response) => {
  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date().toString()}</div>
  `)
})

// app.get('/api/persons/:id', (request, response) => {
//   const requestedId = Number(request.params.id)
//   const person = persons.find(person => person.id === requestedId)
//   if(!person) {
//     return response.status(404).end()
//   }
//   response.json(person)
// })

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log()
  Person.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name && !body.number) {
    return response.status(400).json({error:"missing content"})
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(result => response.status(201).json(result.toJSON()))
})


const PORT = process.env.PORT

app.listen(PORT)

console.log(`App is running on port ${PORT}`)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
let persons = [
  {
    name: "Arto Hellas",
    number: "044-3245-34",
    id: 1
  },
  {
    name: "II Arto Hellas",
    number: "044-3245-34",
    id: 2
  },
  {
    name: "III Arto Hellas",
    number: "044-3245-34",
    id: 3
  }
]


app.use(cors())
app.use(bodyParser.json())

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date().toString()}</div>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const requestedId = Number(request.params.id)
  const person = persons.find(person => person.id === requestedId)
  if(!person) {
    return response.status(404).end()
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const requestedId = Number(request.params.id)
  persons = persons.filter(person => person.id !== requestedId)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const found = persons.find(person => 
    person.name.toLowerCase() === body.name.toLowerCase())

  if(!body.name || !body.number) {
    return response.status(400).json(
      {error: "The name or number is missing"}
    )
  } else if(found) {
    return response.status(400)
      .json({error:"The name already exist in phonebook"})
  }
  const id = Math.floor(Math.random()*1000000)
  const newPerson = {...body, id}
  persons = persons.concat(newPerson)
  response.status(201).json(newPerson)
})


const PORT = process.env.PORT || 3001
app.listen(PORT)

console.log(`App is running on port ${PORT}`)
const express = require('express')
const app = express()

const persons = [
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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date().toString()}</div>
  `)
} )

app.get('/api/persons/:id', (request, response) => {
  const requestedId = Number(request.params.id)
  const person = persons.find(person => person.id === requestedId)
  if(!person) {
    return response.status(404).end()
  }
  response.json(person)
})

app.listen(3001)

console.log(`App is running on port 3001`)
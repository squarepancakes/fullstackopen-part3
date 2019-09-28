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

app.listen(3001)

console.log(`App is running on port 3001`)
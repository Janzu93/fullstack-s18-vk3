const express = require('express')
const time = require('express-timestamp')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(time.init)
app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Martti Tienari",
        number: "040-123456"
    },
    {
        id: 3,
        name: "Arto Järvinen",
        number: "040-123456"
    },
    {
        id: 4,
        name: "Lea Kutvonen",
        number: "040-123456"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const count = persons.length
    const time = req.timestamp
    res.end(`<p>puhelinluettelossa on ${count} henkilön tiedot</p><p>${time}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    person.id = Math.floor(Math.random() * 100000000000)

    if (person.number === undefined || person.name === undefined) {
        res.status(400).json({error: 'Name or number missing'})
    } else if (persons.find(p => p.name === person.name)) {
        res.status(400).json({error: 'Name must be unique'})
    } else {
        persons = persons.concat(person)
        res.json(person)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

const express = require('express')
const time = require('express-timestamp')

const app = express()
app.use(time.init)

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

    if ( person ) {
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

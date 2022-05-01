const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'))
app.use(express.json());

morgan.token('body', request => JSON.stringify(request.body));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

// GETs
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(err => {
    response.status(404).end("Resource not found")
  })
});

// PUTs
app.put('/api/persons/:id', (request, response) => {
    const body = request.body;
    persons = persons.map(person => {
      if(person.id === Number(body.id)){
        return body;
      }else{
        return person;
      }
    });
    response.status(204).end();
  })

// POSTs
app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (body.name === "") {
    return response.status(400).json({ error: 'name missing' })
  }else if (body.number === "") {
    return response.status(400).json({ error: 'number missing' })
  }else{
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
});

// DELETEs
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter( note => id !== note.id);
  response.status(204).end();
})

// unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send('unknown endpoint')
  }
app.use(unknownEndpoint)

// PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
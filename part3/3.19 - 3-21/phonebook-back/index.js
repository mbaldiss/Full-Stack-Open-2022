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
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
  .catch(error => next(error))
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
  .catch(error => next(error))
});

app.get('/api/info', (request, response, next) => {
  Person.find({}).then(persons => {
    response.status(200).send(`The phonebook has ${persons.length} people. Today ${new Date()}`)

  })
  .catch(error => next(error))
});

// PUTs
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  const updatedPerson = {
    name: body.name,
    number: body.number
  }
  
  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: body.number })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

// POSTs
app.post('/api/persons', (request, response, next) => {
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
  person
  .save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedPerson => {
    response.json(savedPerson)
  }) 
  .catch(error => next(error))
  }
});

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send('unknown endpoint')
  }
app.use(unknownEndpoint)

// ERROR
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
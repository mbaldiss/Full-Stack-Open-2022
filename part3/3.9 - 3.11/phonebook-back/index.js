const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.static('build'))
app.use(express.json());

morgan.token('body', request => JSON.stringify(request.body));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
    {
        id: 1,
        name: "Marco Baldissone",
        number: "3804731415"
    },
    {
        id: 2,
        name: "Agustin Baldissone",
        number: "3804381380"
    }
  ];

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

app.get('/api/info', (request, response) => {
    const date = new Date();
    console.log("asd")
    response.send(`Phonebook has info for ${persons.length} people.<br/> ${date}`);
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

  if (!body.name) {
    return response.status(400).json({ 
      error: 'person missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

    let aux = false;
    persons.map(person => {
        if(person.name === body.name) {
            aux = true;
        }
    });
    if(aux) {
        return response.status(400).json({ 
            error: 'name must be unique'
        })
    }

  let maxId = 0;
  if(persons.length !== 0){
    maxId = Math.max(...persons.map(person => person.id));
  }

  const person = {
    id: maxId + 1,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  console.log(persons);
  response.json(person)
});

app.get('/', (request, response) => {
  response.send('<h1>Welcome!</h1>');
});

app.get('/api', (request, response) => {
    response.send('<h1>Welcome! :)</h1>');
  });

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end("Resource not found")
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter( note => id !== note.id);
  response.status(204).end();
})

const unknownEndpoint = (request, response) => {
    response.status(404).send('unknown endpoint')
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
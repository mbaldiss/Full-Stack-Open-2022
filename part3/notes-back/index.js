const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());

morgan.token('body', request => JSON.stringify(request.body));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

let notes =  [
  {
  "content": "HTML is easy",
  "important": true,
  "id": 1
  },
  {
  "content": "CSS is easy, too",
  "important": true,
  "id": 2
  },
  {
  "content": "JS is easy, too",
  "important": false,
  "id": 3
  },
  {
  "content": "React is easy, too",
  "important": false,
  "id": 4
  }
]

app.post('/api/notes', (request, response) => {
    const body = request.body;

  const note = {
    id: body.id,
    content: body.content,
    important: body.important
  }

  notes = notes.concat(note)
  response.json(note)
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter( note => id !== note.id);
  response.status(204).end();
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const updatedNote = request.params.newObject;
  notes = notes.map(p => {
    if(p.id === id){
      return updatedNote;
    }else{
      return p;
    }
  });
  response.status(204).end();
})

const unknownEndpoint = (request, response) => {
    response.status(404).send('unknown endpoint')
  }
  
app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
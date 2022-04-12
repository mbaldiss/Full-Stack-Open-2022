import { useState } from "react";
import Note from "./components/Note";

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];


function App() {
  const [, setState] = useState(notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState();

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      content: newNote
    }
    setState(notes.push(noteObject));
    setNewNote("");
  }
  
  const handleChangeNotes = (event) => {
      setNewNote(event.target.value)
  }

  const notesToShow = (showAll === true)
  ? notes.filter(note => note.important === true)
  : (showAll === false) 
    ? notes.filter(note => note.important === false) 
    : notes;

  return (
    <div>
      <h1>Notes:</h1>
      <div>
        <button onClick={() => setShowAll(true)}>
          show important
        </button>
        <button onClick={() => setShowAll()}>
          show all
        </button>
        <button onClick={() => setShowAll(false)}>
          show false
        </button>
      </div>
      <ul>
        {notesToShow.map(note => {
            return <Note key={note.id} note={note}/>;
        })}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChangeNotes}/>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;

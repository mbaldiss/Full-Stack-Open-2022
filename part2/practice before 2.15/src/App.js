import React from 'react'
import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes"

let count = 0;

const func = value => value;

console.log(func(true));
console.log(func(false));

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState();

  console.log("Hello");
  
  useEffect(() => {
    noteServices
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
      .catch(error => console.log(error))
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      // id: notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      content: newNote
    }

    noteServices
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote("");
      })
  }
  
  const handleChangeNotes = (event) => {
      setNewNote(event.target.value)
  }

  let notesToShow = (showAll === true)
    ? notes.filter(note => note.important === true)
    : (showAll === false) 
      ? notes.filter(note => note.important === false) 
      : notes;

  notesToShow = notesToShow.filter(note => note.hasOwnProperty("important"));

  const toggle = id => {
    const note = notes.find(n => n.id === id);
    const editedNote = {...note, important: !note.important}
    noteServices
      .update(id, editedNote)
      .then(returnedNote => {
        setNotes(notes.map (note => {
          if(note.id !== id){
            return note;
          }else{
            return returnedNote;
          }
        }))
      })
  }

  const deleteNote = id => {
    noteServices
      .update(id,)
      .then(() => {
        setNotes(notes.map (note => {
          if(note.id !== id){
            return note;
          }else{
            return {};
          }
        }))
      })
  }

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
            return <Note key={count++} note={note} toggleImportance={() => toggle(note.id)} deleteNote={() => deleteNote(note.id)}/>;
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

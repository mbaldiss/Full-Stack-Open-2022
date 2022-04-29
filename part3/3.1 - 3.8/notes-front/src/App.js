import conect from "./services/conect";
import { useState, useEffect } from 'react';

function App() {

  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    conect
      .getAllNotes()
      .then(initialData => setNotes(initialData));
    }, []);
  
  const importantNotes = notes.filter(note => note.important);

  const changeImportance = (noteTo) => {

    const updatedNote = {
      content: noteTo.content,
      important: !noteTo.important,
      id: noteTo.id
    };

    conect
      .updateNote(updatedNote)
      .then(updatedNotes => {
        setNotes(notes.map(note => {
          if(note.id === noteTo.id){
            return updatedNote;
          }else{
            return note;
          }
        }))
      })
  }

  const deleteNote = note => {
    if(window.confirm('Are you sure you want to delete this note?')){
      conect
      .deleteNote(note.id)
      .then(() => setNotes(notes.filter(currentNote => currentNote.id !== note.id)))
    }
    
  }

  const createNote = () => {
    let newNote = prompt('Insert a new note (importance is random)');

    if(newNote === null){
      return null;
    }else if(newNote === ""){
      alert("Please enter a valid note")
    }else{
      newNote = {
        content: newNote
      }
      conect
        .createNote(newNote)
        .then(response => {
          setNotes(notes.concat(response));
        })
    }
  }

  let count = 0;

  return (
    <div>
      <h1 style={{color: 'green'}}>Note´s System v1</h1>
      <button onClick={() => createNote()}>Create Note</button>
      <h1>All notes</h1>
      <ul>
        {notes.map(note => {
          return (
            <div key={count++} style={{padding: 10}}>
              {note.content} <button onClick={() => changeImportance(note)}>Change importance</button> <button onClick={() => deleteNote(note)}>Delete Note</button>
            </div>
            )
        })}
      </ul>
      <h1>Important notes</h1>
      <ul>
        {importantNotes.map(note => <li style={{color: 'red', fontWeight: 'bold'}}key={count++}>{note.content}</li>)}
      </ul>
    </div>
  );
}

export default App;

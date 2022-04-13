import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
    }, []);
  
  const addNew = (event) => {
    event.preventDefault();
    let aux = false;
    persons.map(person => {
      if(person.name === newPerson){
        alert(person.name + ' is already exist');
        aux = true;
      }
    });
    if(!aux){
      const newData = {
        name: newPerson,
        number: newNumber,
        id: persons.length + 1
      }
      let newList = persons.map(person => person);
      newList.push(newData);
      setPersons(newList);
    }
    setNewPerson("");
    setNewNumber("");
  }

  const addNewName = (event) => {
    setNewPerson(event.target.value);
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const namesFiltered = persons.filter(name => {
      return name.name.toLowerCase().includes(newFilter.toLowerCase());
  });

  const searchFilter = (event) => {
    setNewFilter(event.target.value);
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
      filter show with <input value={newFilter} onChange={searchFilter}></input>
      <h1>add a new</h1>
      <form onSubmit={addNew}>
        <div>name: <input value={newPerson} onChange={addNewName}></input></div>
        <div>number: <input value={newNumber} onChange={addNewNumber}></input></div>
        <div><button type="submit">add</button></div>
      </form>
      <h1>Numbers</h1>
      {namesFiltered.map(person => {
        return <p key={person.id}>{person.name} {person.number}</p>;
      })}
    </div>
  );
}

export default App;

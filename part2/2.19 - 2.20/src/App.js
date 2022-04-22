import axios from 'axios';
import { useState, useEffect } from 'react';
import Person from './components/Person';
import FormAdd from './components/FormAdd';
import FormSearch from './components/FormSearch';
import conect from "./services/conect";
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    conect
      .getAll()
      .then(initialData => setPersons(initialData));
    }, []);
  
  const addNew = (event) => {
    event.preventDefault();
    let aux = false;
    persons.map(person => {
      if(person.name === newPerson){
        aux = true;
        if(window.confirm(person.name + ' is already exist, replace the old number with the new number?')){
          const updateData = {
            name: newPerson,
            number: newNumber,
            id: person.id
          }
          conect
            .update(person.id, updateData)
            .then(updatePersons => {
              setPersons(persons.map(p => {
                if(p.id === person.id){
                  return updateData;
                }else{
                  return p;
                }
              }))
              setNewPerson("");
              setNewNumber("");
              setMessage(`${newPerson}'s number was successfully updated to the phonebook.`);
              setNotificationType("success");
              setTimeout(() => {
                setMessage(null)
              }, 5000);
          })
          .catch(updatePersons => {
            setMessage(`Information of ${newPerson} has already been removed from the phonebook.`);
            setNotificationType("error");
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
        }   
      }
    });
    
    if(!aux){
      const newData = {
        name: newPerson,
        number: newNumber,
      }
      conect
        .create(newData)
        .then(freshData => {
          setPersons(persons.concat(freshData));
          setNewPerson("");
          setNewNumber("");
          setMessage(`${newPerson} was successfully added to the phonebook.`);
          setNotificationType("success");
          setTimeout(() => {
            setMessage(null)
          }, 5000);
      })
    }

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

  const Del = id => {
    const nameTemp = persons.filter(p => p.id ===id);
    conect
        .delP(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setMessage(`Information of ${nameTemp[0].name} has been removed from the phonebook.`);
          setNotificationType("error");
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        });
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} typeMessage={notificationType}/>
      <FormSearch newFilter={newFilter} searchFilter={searchFilter}/>
      <FormAdd properties={[addNew, newPerson, addNewName, newNumber, addNewNumber]}/>
      <Person personsFiltered={namesFiltered} delPerson={Del}/>
    </div>
  );
}

export default App;

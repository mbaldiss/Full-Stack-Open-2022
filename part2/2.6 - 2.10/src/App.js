import { useState } from "react";

const names = [
        { name: "Marco Baldissone", number: "3804731415"},
        { name: "Jhon Mackenzie", number: "911"},
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ];

const Person = (props) => {
    return <p>{props.data.name} {props.data.number}</p>
}

const Form = (props) => {
    return (
        <form onSubmit={props.form}>
            <div>name: <input value={props.newName} onChange={props.inputName} required></input></div>
            <div>number: <input value={props.newNumber} onChange={props.inputNumber} required></input></div>
            <button type="submit">add</button>
        </form>
    )
}

const Filter = props =>  <input value={props.value} onChange={props.onChange}></input>;

const App = () => {
    const [, setNames] = useState(names);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const inputName = (event) => {
        setNewName(event.target.value);
    }

    const inputNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const form = (event) => {
        event.preventDefault();
        let aux = false;
        names.map(name => {
            if(newName === name.name) {
                alert(newName + " is already added to phonebook");
                aux = true;
            }
        })
        if(!aux){
            const newNames = {
                name: newName,
                number: newNumber
            }
            setNames(names.push(newNames));
        }
        setNewName("");
        setNewNumber("");
    }

    const filterName = (event) => {
        setFilter(event.target.value);
    }

    const namesFiltered = names.filter(name => {
        return name.name.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div>
            <h1>Phonebook</h1>
            filter show with <Filter value={filter} onChange={filterName}/>
            <h1>add a new</h1>
            <Form form={form} newName={newName} inputName={inputName} newNumber={newNumber} inputNumber={inputNumber}/>
            <h1>Numbers</h1>
            {namesFiltered.map(name => <Person key={name.name} data={name} />)}
        </div>
    )
}

export default App;
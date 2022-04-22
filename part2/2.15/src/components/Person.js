import Button from './Button';

let count = 0;

const Person = props => {
    return (
        <div>
            <h1>Numbers</h1>
            {props.personsFiltered.map(person => {
                return (
                    <p key={count++}>{person.name} {person.number} <Button props={[props.delPerson, person.id, person.name]}/></p>
                );
            })}
        </div>
    )
}

export default Person;
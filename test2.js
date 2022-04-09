// This
const dataPerson = {
    name: 'John',
    lastName: 'West',
    age: 36,
    sayHi: function(specialMessage){
        console.log("Hi! My name is " + this.name + ". " + specialMessage);
    }
}

const newSayHi = dataPerson.sayHi.bind(dataPerson);

dataPerson.sayHi("Goudogan");

newSayHi("Foden");

dataPerson.email = 'John@example.com';

console.log(dataPerson);

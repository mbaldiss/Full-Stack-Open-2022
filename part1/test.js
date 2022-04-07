// Arreglos
const arr1 = [1, 2, 3, 4, 5];
// Creamos un nuevo arreglo agregandole un nuevo valor al final
const newArr = arr1.concat(6);

console.log(newArr);
console.log(arr1);

// Reccoremos el arreglo
newArr.forEach(value =>  console.log(value));

// Creamos un nuevo arreglo modificando cada uno de sus elementos
const newArr2 = newArr.map(value => value * 3);
console.log(newArr2);

// Obtenemos el resto de un arreglo
const [first, second, ...rest] = newArr2;
console.log(first + second);
console.log(rest);

// Objetos
const obj1 = {
    name: "Marco",
    lastName: "Baldissone"
}
console.log(obj1);
// agregando propiedades
obj1.age = 38;
console.log(obj1);
// agregando propiedades pero con corchete porque la propiedad tiene espacio en su nombre
obj1["phone number"] = 3804731415;
console.log(obj1);

// Funciones flecha
const arrowFunction = (obj) => {
    console.log(obj.name);
    console.log(obj.age);
    return obj.age - 5;
}
console.log(arrowFunction(obj1));
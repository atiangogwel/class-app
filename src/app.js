// Define a person object
let personObject = {
    firstName: 'Mohamed',
    lastName: 'Hassan'
};

console.log('First Name: ', personObject.firstName); 
console.log('Last Name: ', personObject.lastName); 
console.log('Full Name:', personObject.firstName + ' ' + personObject.lastName);

// Define a Person class using class syntax
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

let personClass = new Person('Jane', 'Smith');
console.log(personClass.firstName); // Output: Jane

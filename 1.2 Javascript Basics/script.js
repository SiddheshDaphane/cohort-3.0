// Write a function called sum that finds the "sum" from 1 to number. 
function sum(num) {
  total = 0;
  for (let i=1; i<=num; i++) {
    total += i; 
  }
  return total;
}
result = sum(5);
console.log(result)

// Write a function that takes a "user" as an input and greets them with their name and age. 

function greet(user) {
  console.log(`Hello ${user.firstName} and with age ${user.age}!`)
}

obj = {
  firstName: "Siddhesh",
  age: 19
}

greet(obj)

// Write a function that takes a new object as input which has "name","age" and "gender" and greets the user with their gender (Hi Mr/Mrs/Others Siddhesh, your age is 21) and also tell the user if they are legal to vote or not
obj1 = {
  firstName: "Radhika",
  age: 15,
  gender: ""
}

function newGreet(name) {
  if (name.gender === "Male") {
    console.log(`Hi Mr ${name.firstName}. Your age is ${name.age}`);
  } else if (name.gender === "Female") {
    console.log(`Hi Mrs ${name.firstName}. Your age is ${name.age}`);
  } else {
    console.log(`Hi other ${name.firstName}. Your age is ${name.age}`);
  }

  if (name.age > 18) {
    console.log("You are legal to vote")
  } else {
    console.log("You are minor.")
  }
}

newGreet(obj1)


// Write a function that takes an array of numbers as input, and returns a new array with only even values. Use filter
// .filter expects "boolean" value in callback meaning in return. If the callback return true then element is kept in new array. 

const arr = [1,2,3,4,5]

function print(arr) {
  return arr%2 === 0
}

const ev = arr.filter(print);
console.log(ev)

// Write a function that takes an array of users as inputs and returns only the users who are more than 18 years old. 

const users = [
  { name: "Alice", age: 17 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 18 },
  { name: "David", age: 25 }
];

function older(num) {
  console.log(num);
  return num.age > 18;
}

const old = users.filter(older);
console.log(old);

// create a function that takes an array of objects as input, and return the users whose age > 18 and are male

const arrObj = [
  {name: "Siddhesh", age:27, gender: "Male"},
  {name:"Shubham", age:27, gender:"Male"},
  {name:"Neha", age:24, gender:"Female"},
  {name:"sneha", age:27, gender:"Female"}
]

function func(obj) {
  // console.log(obj)
  for (let i=0; i < obj.length; i++) {
    if (obj[i].age > 18 && obj[i].gender == "Male") {
      console.log(obj[i]);
    }
}
}

func(arrObj);
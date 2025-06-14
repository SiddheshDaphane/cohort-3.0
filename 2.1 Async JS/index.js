// This is Synchronous code

const fs = require('fs');

const data = fs.readFileSync('a.txt', 'utf8');
console.log(data);

const data1 = fs.readFileSync('b.txt', 'utf8');
console.log(data1);


// Functional arguments

// Write a calculator program that adds, subtracts, multiplies, divides two arguments


//// Approach 1
function sum(a,b) {
  return a+b;
}

function multiply(a,b) {
  return a*b;
}

function substract(a,b) {
  return a-b;
}

function divide(a,b) {
  return a/b;
}

function doOperations(a,b,op) {
  return op(a,b)
}

console.log(doOperations(2,3,sum))


// Asynchronous Function code. 
const fs = require("fs") 

function print(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
}

fs.readFile("a.txt", "utf-8", print);
fs.readFile("b.txt", "utf-8", print);

console.log("Done!")



// setTimeout to understand callback

console.log("Hi")

function timeout() {
  console.log("Click the button");
}

setTimeout(timeout, 5000);

console.log("Welcome to loupe!");


// Thought experiment. (Below, "My name is Siddhesh Daphane" will print at last because thread is busy in for loop. )

console.log("Hello World");

function callback() {
  console.log("My name is Siddhesh Daphane")
}

setTimeout(callback, 1000);

console.log("I am learning Javascript")

let c = 0;
for (let i; i < 100000000; i++) {
  c =+ 1;
}

console.log("Expersnive operation done!");


/// Another thought experiement

console.log("Hi");


function callback() {
  console.log("My name is Siddhesh Daphane")
}

setTimeout(callback, 4000);

let c = 0;
for (let i=0; i < 8; i++) {
  c++
}

console.log(c);
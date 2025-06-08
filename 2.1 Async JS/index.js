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
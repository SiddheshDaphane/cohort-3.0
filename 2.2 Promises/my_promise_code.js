// Callback functions
function greet(callback) {
  console.log("Hi!");
  callback();
}

function sayBye() {
  console.log("Bye!")
}

greet(sayBye);

console.log("----------------------------");

function greet1(callback) {
  callback();
  console.log("Hi!");
}

function sayBye1() {
  console.log("Bye!")
}

greet1(sayBye1);


console.log("----------------------------");

// Write a function that 1. Reads the contents of a file, 2) Trims the extra spcae from the left and right and 3. Write it back to the file

// Callback approach
const fs = require("fs");

function fileRead(filePath, cb) {
  fs.readFile(filePath, "utf-8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
    cb();
  })
}

function callback() {
  console.log("Callback is executed");
}

fileRead("a.txt", callback)


console.log("----------------------------");

// promise approach
const fs = require("fs");

function readingFile(resolve, filePath) {
  fs.readFile(filePath, "utf-8", function(err, data) {
    if(err) {
      console.log(err);
    } else {
      console.log(data);
    }
  })
}


let P = new Promise(readingFile);

function callbackFile() {
  
}

P.then(callbackFile)

// // Promisified "setTimeout" function

// function random(resolve) {
//   console.log("This is radom function");
//   setTimeout(resolve, 4000);
// }

// let p = new Promise(random)

// function callback() {
//   console.log("This is callback function");
// }

// p.then(callback); 

// // Promisified readFile function
// const fs = require("fs");

// function readTheFile(resolve) {
//   console.log("This is the read the file function")
//   fs.readFile("a.txt", "utf-8", function(err, data) {
//     if(err) {
//       console.log(err);
//     } else {
//       resolve(data);
//     }
//   })
// }

// let newPromise = new Promise(readTheFile)

// function callback1(contents) {
//   console.log(contents);
// }

// newPromise.then(callback1);
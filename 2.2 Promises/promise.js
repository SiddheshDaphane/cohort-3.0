// Wrapping setTimeout within function.

// function waitFor3s(resolve) {
//   console.log(resolve);
//   setTimeout(resolve,3000);
// }

// function main() {
//   console.log("main is called");
// }

// waitFor3s(main);


// Promisifying the function

/// Simpler promise code. 

    // Promise takes a function as an argument (here it is "random" and "random" has a function "resolve" as it's 1st argument. Whenever "resolve" get's called, promise if fulfilled. Then It tell whoever using promise that, you can call whatever inside .then() which is a function. (here it is callback() which will print "promise succeded" in the terminal. )) 
    // All 3 must be functions. (Function inside "Promsie" which is "random", function inside "random" which is "resolve" and function inside ".then()" which is "callback()". Then and then only promise will work otherwise it will not work.)

function random(resolve) { // "resolve" is a function.
  resolve(); 
}

let p = new Promise(random);

function callback() {
  console.log("promise succeded");
}

p.then(callback);


// //// Kirat code
// function waitFor4s(resolve) {
//   setTimeout(resolve,4000);
//   console.log(resolve);
//   return resolve;
// }

// function setTimeoutPromisified() {
//   return new Promise(waitFor4s(main))
// }

// function main() {
//   console.log("main is called");
// }

// setTimeoutPromisified().then(main)


// // My experiment
// function waitFor5s(resolve) {
//   setTimeout(resolve,5000);
//   console.log(resolve);
//   return resolve;
// }

// function setTimeoutPromisified() {
//   return new Promise(waitFor5s(main))
// }

// function main() {
//   console.log("main is called");
// }

// setTimeoutPromisified().then(main)
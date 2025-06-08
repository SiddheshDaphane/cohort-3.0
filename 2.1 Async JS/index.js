// This is Synchrinous code

const fs = require('fs');

const data = fs.readFileSync('a.txt', 'utf8');
console.log(data);

const data1 = fs.readFileSync('b.txt', 'utf8');
console.log(data1);


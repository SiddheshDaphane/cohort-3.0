// Create a "command line interface" that lets the user specify a file path and the nodejs process counts the number of words inside it. 

const fs = require("fs");
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.1.0')

program.command('count')
  .description('count number of words in the file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if(err) {
        console.log(err);
      } else {
        const word = data.split(' ').length;
        console.log(`There are ${word +1} words in ${file}.`)
      }
    })
  })

program.parse();

// function main(fileName) {
//   fs.readFile(fileName,'utf-8', (err, data) => {
//     let words = 0;
//     for (let i=0; i < data.length; i++) {
//       if(data[i] === " "){
//         words++;
//       }
//     }
//     console.log(`Number of words in this file is ${words + 1}`);
//   })
// }

// main("a.txt");
#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const config = require('./../config/config.json');

const actionHandler = (name, value) => functions[name](value);

const functions = {
  reverse: (str) => console.log(str.split('').reverse().join('')),
  transform: (str) => console.log(str.split('').join('-')),
  outputFile: (fileName) => fs.readFile(`./${config.path}${fileName}`, 'utf8', (err, data) => {
    if (err) console.log(err);
    console.log(data);
  })
}

program
  .version('0.1.0')
  .option('-a, --action <name> [value]', 'A function', actionHandler, 'test.csv')
  .parse(process.argv);
#!/usr/bin/env node
const fs = require('fs');
const repl = require('repl');
const program = require('commander');
const config = require('./../config/config.json');

const functions = {
  reverse: (str) => str.split('').reverse().join(''),
  transform: (str) => str.toUpperCase(),
  outputFile: (fileName) => fs.createReadStream(`./${config.path}${fileName}`)
}

const defineAction = name => {
  repl.start({
    prompt: `${name} actions: `,
    writer: functions[name]
  });
}

const defineFile = fileName => {

}

program
  .version('0.1.0')
  .option('-a, --action <name>', 'A function', defineAction)
  .option('-f, --file <name>', 'A file name', defineFile)
  .parse(process.argv);

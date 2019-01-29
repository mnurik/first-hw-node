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
  if (['reverse', 'transform'].includes(name)) {
    repl.start({
      prompt: `${name} actions: `,
      writer: functions[name]
    });
  }
  else {
    fileFunction = functions[name]; //outputFile
  }
}

const defineFile = fileName => {
  repl.start({
    prompt: `File actions: `,
    input: fileFunction(fileName),
    output: process.stdout
  });
}

const actionsFactory = registry => name => {
  if (typeof registry[name] !== 'function') {
    throw ReferenceError(`Unknown action "${name}"`)
  }

  return registry[name]
}

const getActionByName = actionsFactory(functions);

// 1. check if file exists
// 2. check if file is readable
// 3. create R stream
// 4. return R stream
openFile = fileName => {
  return // fileStream
}

program
  .version('0.1.0')
  .option('-a, --action <name> [someText]', 'A function', getActionByName2, "eval")
  .option('-f, --file <fileName>', 'A file name', openFile)
  .parse(process.argv);

console.log(program.args);

#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const csv = require('csvtojson');
const config = require('../../config/config.json');

const functions = {
  reverse: str => str.split('').reverse().join(''),
  transform: str => str.toUpperCase(),
  outputFile: readStream => readStream.on('data', console.log),
  convertFromFile: readStream => readStream.pipe(csv()).then(console.log),
  convertToFile: (readStream, fileName) => {
    const writeStream = fs.createWriteStream(`./${config.path}${fileName.replace('csv', 'json')}`, 'utf8');
    readStream.pipe(csv()).pipe(writeStream);
  },
};

const actionsFactory = registry => (name) => {
  if (typeof registry[name] !== 'function') {
    throw ReferenceError(`Unknown action "${name}"`);
  }

  return registry[name];
};

const getActionByName = actionsFactory(functions);
// 1. check if file exists
// 2. check if file is readable
// 3. create R stream
// 4. return R stream
const openFile = fileName => ({
  name: fileName,
  stream: fs.createReadStream(`./${config.path}${fileName}`, 'utf8'),
});

program
  .version('0.1.0')
  .option('-a, --action <name> [someText]', 'A function', getActionByName)
  .option('-f, --file <fileName>', 'A file name', openFile)
  .parse(process.argv);

if (program.action) {
  if (!program.file && program.args[0]) {
    console.log(program.action(program.args[0]));
  }

  if (program.file) {
    program.action(program.file.stream, program.file.name);
  }
}

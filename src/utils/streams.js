#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const csv = require('csvtojson');
const through2 = require('through2');
const config = require('../../config/config.json');

const actionList = {
  reverse: () => process.stdin.pipe(through2(str => str.toString().split('').reverse().join(''))).pipe(process.stdout),
  transform: () => process.stdin.pipe(through2(str => str.toUpperCase())).pipe(process.stdout),
  outputFile: readStream => readStream.pipe(process.stdout),
  convertFromFile: readStream => readStream.pipe(csv()).pipe(process.stdout),
  convertToFile: (readStream, fileName) => {
    const writeStream = fs.createWriteStream(`./${config.path}${fileName.replace('csv', 'json')}`, 'utf8');
    readStream.pipe(csv()).pipe(writeStream);
  },
  cssBundler: (path) => {
    console.log(path);
  }
};

const actionsFactory = registry => (name) => {
  if (typeof registry[name] !== 'function') {
    throw new ReferenceError(`Unknown action "${name}"`);
  }

  return registry[name];
};

const getActionByName = actionsFactory(actionList);

const openFile = (fileName) => {
  const path = `./${config.path}${fileName}`;

  if (!fs.existsSync(path)) {
    throw new Error(`${fileName} file doesn't exist`);
  }
  const reader = fs.createReadStream(path, 'utf8');

  reader.on('readable', () => {
    program.action(reader, fileName);
  });
};

program
  .version(config.version)
  .option('-a, --action <name> [someText]', 'A function', getActionByName)
  .option('-f, --file <fileName>', 'A file name', openFile)
  .option('-p, --path <path>', 'A file name')
  .parse(process.argv);

if (program.action) {
  if (!program.file && program.args.length) {
    program.action(program.args);
  }
  if (program.path) {
    program.action(program.path);
  }
}

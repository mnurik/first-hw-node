#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const csv = require('csvtojson');
const through2 = require('through2');
const config = require('../../config/config.json');

function reverseHandler(str, enc, callback) {
  this.push(str.toString().split('').reverse().join(''));
  return callback();
}

function transformHandler(str, enc, callback) {
  this.push(str.toString().toUpperCase());
  return callback();
}

const actionList = {
  reverse: () => process.stdin.pipe(through2(reverseHandler)).pipe(process.stdout),
  transform: () => process.stdin.pipe(through2(transformHandler)).pipe(process.stdout),
  outputFile: readStream => readStream.pipe(process.stdout),
  convertFromFile: readStream => readStream.pipe(csv()).pipe(process.stdout),
  convertToFile: (readStream, fileName) => {
    const writeStream = fs.createWriteStream(`./${config.path.csv}${fileName.replace('csv', 'json')}`, 'utf8');
    readStream.pipe(csv()).pipe(writeStream);
  },
  cssBundler: (path) => {
    const writeStream = fs.createWriteStream(`${path}/bundle.css`);
    fs.readdir(path, (err, files) => {
      if (err) console.log(err);
      
      fs.createReadStream(`${path}/${file}`).pipe();
    });
  },
};

const writeTo = writeStream => readStream => new Promise((resolve, reject) => {
  writeStream.on('finish', resolve); // ??? writing of read part finished
  readStream.pipe(writeStream);
});

const sequenceRun = promisedFunctions => promisedFunctions.reduce(
  (prevPromise, func) => prevPromise.then(result => func().then(res2 => result.concat(res2))),
  Promise.resolve([]),
);

const writeToBundle = writeTo(bundleFile);

fileWriters = cssFiles
  .map(file => () => writeToBundle(file))
  .reduce(
    (res, writer) => res.concat(
      writer,
      writeComment,
    ),
    [],
    )



sequenceRun(fileWriters)
  .then(() => writeToBundle(epamCssFile))
  .then(OK)
  .catch(KO)


const f1 = arg => () => Promise.resolve(arg);
const f2 = arg => () => Promise.resolve(arg);

sequenceRun([
  f1(1), f2(2), f1(3),
]);

const actionsFactory = registry => (name) => {
  if (typeof registry[name] !== 'function') {
    throw new ReferenceError(`Unknown action "${name}"`);
  }

  return registry[name];
};

const getActionByName = actionsFactory(actionList);

const openFile = (fileName) => {
  const path = `./${config.path.csv}${fileName}`;

  fs.stat(path, (err) => {
    if (err) {
      console.error(`${fileName} file doesn't exist`);
    } else {
      const reader = fs.createReadStream(path, 'utf8');
      reader.on('readable', () => {
        program.action(reader, fileName);
      });
    }
  });
};

const openLink = (folderName) => {
  const path = `${config.path.root}${folderName}`;

  fs.stat(path, (err) => {
    if (err) {
      console.error('Folder does not exist');
    } else {
      program.action(path);
    }
  });
};

program
  .version(config.version)
  .option('-a, --action <name> [someText]', 'A function', getActionByName)
  .option('-f, --file <fileName>', 'A file name', openFile)
  .option('-p, --path [path]', 'A file name', openLink, 'css')
  .parse(process.argv);

if (program.action && !program.file) {
  program.action();
}

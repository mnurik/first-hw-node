#!/usr/bin/env node
const program = require('commander');

const actionHandler = (name, val) => {
  console.log('====================================');
  console.log(name);
  console.log('====================================');
  functions[name](val)
};

const functions = {
  reverse: (str) => console.log(str.split('').reverse().join(''))
} 

program
  .version('0.0.1')
  .command('-a, --action = <str>', 'A function', actionHandler)
  // .option('-f, --float <n>', 'A float argument', parseFloat)
  // .option('-r, --range <a>..<b>', 'A range', range)
  // .option('-l, --list <items>', 'A list', list)
  // .option('-o, --optional [value]', 'An optional value')
  // .option('-c, --collect [value]', 'A repeatable value', collect, [])
  // .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .parse(process.argv);

// console.log(' float: %j', program.float);
// console.log(' optional: %j', program.optional);
// program.range = program.range || [];
// console.log(' range: %j..%j', program.range[0], program.range[1]);
// console.log(' list: %j', program.list);
// console.log(' collect: %j', program.collect);
// console.log(' verbosity: %j', program.verbose);
// console.log(' args: %j', program.args);
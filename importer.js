import fs from 'fs';
import csv from 'csvtojson';
import { promisify } from 'util';

const readAsync = promisify(fs.readFile);

export default class Importer {
  constructor() { }

  listener(event, callback) {
    event.on('dirwatcher:changed', callback);
  }

  import(csvFilePath) {
    // return csv().fromFile(`./data/${csvFilePath}`);
    return readAsync(`./data/${csvFilePath}`, 'utf8');
  }

  importSync(csvFilePath) {
    return require(path);
  }
}

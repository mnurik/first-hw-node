import fs from 'fs';
import csv from 'csvtojson';
import { promisify } from 'util';
import { path, eventName } from './config/config.json';

const readAsync = promisify(fs.readFile);

export default class Importer {
  constructor() { }

  listener(event, callback) {
    event.on(eventName, callback);
  }

  import(csvFilePath) {
    // return csv().fromFile(`./data/${csvFilePath}`);
    return readAsync(`${path}${csvFilePath}`, 'utf8');
  }

  importSync(csvFilePath) {
    return require(path);
  }
}

import fs from 'fs';
import { promisify } from 'util';
import { path, eventName } from '../config/config.json';

const readAsync = promisify(fs.readFile);

const Importer = {
  listener(event, callback) {
    event.on(eventName, callback);
  },
  import(csvFilePath) {
    // return csv().fromFile(`./data/${csvFilePath}`);
    return readAsync(`${path}${csvFilePath}`, 'utf8');
  },
  importSync(csvFilePath) {
    return require(csvFilePath);
  },
};

export default Importer;

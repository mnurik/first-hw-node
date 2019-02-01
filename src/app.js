import DirWatcher from './dirwatcher';
import Importer from './importer';
import { path, delay } from '../config/config.json';

const dirwatcher = new DirWatcher();
dirwatcher.watch(path, delay);

const importer = new Importer();
const callback = files => Promise.all(files.map(importer.import))
  .then(console.log)
  .catch(console.error);
importer.listener(dirwatcher.fileChangeEventEmitter, callback);

import DirWatcher from "./dirwatcher";
import Importer from "./importer";

const dirwatcher = new DirWatcher();
dirwatcher.watch('./data', 1000);

const importer = new Importer();
const callback = files => {
  return Promise.all(files.map(file => importer.import(file)))
    .then(value => console.log(value))
    .catch(console.error);
}
importer.listener(dirwatcher.fileChangeEventEmitter, callback);

import DirWatcher from "./dirwatcher";
import Importer from "./importer";

new DirWatcher();
const importer = new Importer();

importer.import('./data').then(importedData => console.log(importedData));

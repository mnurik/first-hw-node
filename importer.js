export default class Importer {
  constructor() {
    watcher('​dirwatcher:changed​');
  }

  import(path) {
    return new Promise(resolve => {
      resolve(getDataFromPath(path));
    });
  }

  importSync(path) {
    return getDataFromPath(path);
  }
}

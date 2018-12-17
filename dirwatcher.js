import fs from 'fs';
import EventEmitter from 'events';

export default class DirWatcher {
  constructor() {
    this.fileChangeEventEmitter = new EventEmitter();
  }

  watch(path, delay) {
    setInterval(() => {
      fs.readdir(path, {}, (eventType, files) => {
        this.fileChangeEventEmitter.emit('dirwatcher:changed', files);
      });
    }, delay);
    // fs.watch(path, {}, (eventType, filename) => {
    //   if (filename) {
    //     this.fileChangeEventEmitter.emit(eventType, filename);
    //   }
    // });
  }
}

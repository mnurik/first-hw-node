import fs from 'fs';
import EventEmitter from 'events';
import { eventName } from '../config/config.json';

export default class DirWatcher {
  constructor() {
    this.fileChangeEventEmitter = new EventEmitter();
  }

  watch(path, delay) {
    (function recursiveTimeout(context) {
      setTimeout(() => {
        fs.readdir(path, {}, (eventType, files) => {
          context.fileChangeEventEmitter.emit(eventName, files);
        });
        recursiveTimeout(context);
      }, delay);
    }(this));
    // fs.watch(path, {}, (eventType, filename) => {
    //   if (filename) {
    //     this.fileChangeEventEmitter.emit(eventType, filename);
    //   }
    // });
  }
}

export default class DirWatcher {
  watch(path, delay) {
    watch(path, delay);
    event.emit('changed');
  }
}

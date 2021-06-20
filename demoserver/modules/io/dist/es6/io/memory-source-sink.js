export class MemorySourceSink {
  constructor() {
    this.data = new Map();
  }

  readSync(name) {
    return this.data.get(name);
  }

  writeSync(name, data) {
    if (ArrayBuffer.isView(data) && data.length && data.buffer) {
      this.data.set(name, data.buffer);
    } else {
      this.data.set(name, data);
    }
  }

  existsSync(name) {
    return this.data.has(name);
  }

  close() {}

  entries() {
    return this.data.entries();
  }

  has(name) {
    return this.data.has(name);
  }

}
//# sourceMappingURL=memory-source-sink.js.map
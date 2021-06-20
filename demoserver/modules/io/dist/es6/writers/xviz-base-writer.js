export class XVIZBaseWriter {
  constructor(sink) {
    if (!sink) {
      throw new Error('Writer must be provided a sink');
    }

    this.sink = sink;
  }

  _checkValid() {
    if (!this.sink) {
      throw new Error('Cannot use this Writer after "close()" has been called.');
    }
  }

  close() {
    if (this.sink) {
      this.sink.close();
      this.sink = null;
    }
  }

}
//# sourceMappingURL=xviz-base-writer.js.map
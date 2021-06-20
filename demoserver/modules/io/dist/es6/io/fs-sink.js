export class FileSink {
  constructor(root) {
    this.fs = module.require('fs');
    this.path = module.require('path');
    this.root = root;
  }

  writeSync(name, data) {
    const path = this.path.join(this.root, name);
    this.fs.writeFileSync(path, data);
  }

  close() {}

}
//# sourceMappingURL=fs-sink.js.map
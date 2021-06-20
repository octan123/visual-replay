export class FileSource {
  constructor(root) {
    this.fs = module.require('fs');
    this.path = module.require('path');
    this.root = root;
  }

  readSync(name) {
    const path = this.path.join(this.root, name);

    if (this.fs.existsSync(path)) {
      return this.fs.readFileSync(path);
    }

    return undefined;
  }

  existsSync(name) {
    const path = this.path.join(this.root, name);
    return this.fs.existsSync(path);
  }

  close() {}

}
//# sourceMappingURL=fs-source.js.map
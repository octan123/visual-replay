export class XVIZSessionContext {
  constructor(state = {}) {
    this.map = new Map(Object.entries(state));
    this.activeTransforms = new Map();
  }

  set(name, val) {
    this.map.set(name, val);
  }

  get(name) {
    return this.map.get(name);
  }

  startTransform(id, state) {
    this.activeTransforms.set(id, state);
  }

  transforms() {
    return this.activeTransforms.keys();
  }

  transform(id) {
    return this.activeTransforms.get(id);
  }

  endTransform(id) {
    this.activeTransforms.delete(id);
  }

}
//# sourceMappingURL=xviz-session-context.js.map
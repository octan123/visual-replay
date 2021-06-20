import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
export default class LoaderInterface {
  constructor() {
    _defineProperty(this, "_update", () => {
      this._updateTimer = null;
      this.listeners.forEach(o => o(this._version));
    });

    _defineProperty(this, "_getDataVersion", () => this.get('dataVersion'));

    this.listeners = [];
    this.state = {};
    this._updates = 0;
    this._version = 0;
    this._updateTimer = null;
  }

  subscribe(instance) {
    this.listeners.push(instance);
  }

  unsubscribe(instance) {
    const index = this.listeners.findIndex(o => o === instance);

    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    if (this.state[key] !== value) {
      this.state[key] = value;
      this._version++;

      if (!this._updateTimer) {
        this._updateTimer = requestAnimationFrame(this._update);
      }
    }
  }

  _bumpDataVersion() {
    this._updates++;
    this.set('dataVersion', this._updates);
  }

}
//# sourceMappingURL=loader-interface.js.map
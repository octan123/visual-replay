export default class XVIZBaseUiBuilder {
  constructor({
    type,
    validateError,
    validateWarn
  }) {
    this._type = type;
    this._children = null;
    this._validateError = validateError;
    this._validateWarn = validateWarn;
  }

  child(child) {
    if (!this._children) {
      this._children = [];
    }

    this._children.push(child);

    return child;
  }

  _validate() {}

  getUI() {
    const obj = {
      type: this._type
    };

    if (this._children && this._children.length) {
      obj.children = this._children.map(child => child.getUI());
    }

    return obj;
  }

}
//# sourceMappingURL=xviz-base-ui-builder.js.map
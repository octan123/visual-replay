import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import XVIZBaseBuilder from './xviz-base-builder';
export default class XVIZLinkBuilder extends XVIZBaseBuilder {
  constructor(props) {
    super(_objectSpread({}, props));
    this._links = null;
    this._targetStream = null;
  }

  parent(targetStream) {
    this._targetStream = targetStream;
  }

  _flush() {
    if (!this._links) {
      this._links = {};
    }

    const data = {};

    if (this._targetStream) {
      data.target_pose = this._targetStream;
      this._links[this._streamId] = data;
    }
  }

  reset() {
    super.reset();
    this._targetStream = null;
  }

  getData() {
    if (this._streamId) {
      this._flush();
    }

    return this._links;
  }

}
//# sourceMappingURL=xviz-link-builder.js.map
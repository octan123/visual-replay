import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import XVIZPrimitiveBuilder from './xviz-primitive-builder';
import { insertTimestamp } from '../utils';
import { CATEGORY } from './constant';
export default class XVIZFutureInstanceBuilder extends XVIZPrimitiveBuilder {
  constructor(props) {
    super(_objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.FUTURE_INSTANCE
    }));
    this.reset();
    this._futures = {};
  }

  _timestamp(timestamp) {
    this._ts = timestamp;
    return this;
  }

  _flush() {
    let future = this._futures[this._streamId];

    if (!future) {
      future = {
        timestamps: [],
        primitives: []
      };
      this._futures[this._streamId] = future;
    }

    const primitive = this._formatPrimitive();

    const {
      timestamps,
      primitives
    } = future;
    const update = {};
    update["".concat(this._type, "s")] = [primitive];
    insertTimestamp(timestamps, primitives, this._ts, "".concat(this._type, "s"), primitive);
    this.reset();
  }

  getData() {
    if (this._type) {
      this._flush();
    }

    if (Object.keys(this._futures).length === 0) {
      return null;
    }

    return this._futures;
  }

  reset() {
    super.reset();
  }

}
//# sourceMappingURL=xviz-future-instance-builder.js.map
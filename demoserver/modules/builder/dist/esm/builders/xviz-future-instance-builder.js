import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import XVIZPrimitiveBuilder from './xviz-primitive-builder';
import { insertTimestamp } from '../utils';
import { CATEGORY } from './constant';

var XVIZFutureInstanceBuilder = function (_XVIZPrimitiveBuilder) {
  _inherits(XVIZFutureInstanceBuilder, _XVIZPrimitiveBuilder);

  var _super = _createSuper(XVIZFutureInstanceBuilder);

  function XVIZFutureInstanceBuilder(props) {
    var _this;

    _classCallCheck(this, XVIZFutureInstanceBuilder);

    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.FUTURE_INSTANCE
    }));

    _this.reset();

    _this._futures = {};
    return _this;
  }

  _createClass(XVIZFutureInstanceBuilder, [{
    key: "_timestamp",
    value: function _timestamp(timestamp) {
      this._ts = timestamp;
      return this;
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var future = this._futures[this._streamId];

      if (!future) {
        future = {
          timestamps: [],
          primitives: []
        };
        this._futures[this._streamId] = future;
      }

      var primitive = this._formatPrimitive();

      var _future = future,
          timestamps = _future.timestamps,
          primitives = _future.primitives;
      var update = {};
      update["".concat(this._type, "s")] = [primitive];
      insertTimestamp(timestamps, primitives, this._ts, "".concat(this._type, "s"), primitive);
      this.reset();
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this._type) {
        this._flush();
      }

      if (Object.keys(this._futures).length === 0) {
        return null;
      }

      return this._futures;
    }
  }, {
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(XVIZFutureInstanceBuilder.prototype), "reset", this).call(this);
    }
  }]);

  return XVIZFutureInstanceBuilder;
}(XVIZPrimitiveBuilder);

export { XVIZFutureInstanceBuilder as default };
//# sourceMappingURL=xviz-future-instance-builder.js.map
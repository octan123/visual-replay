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

import XVIZBaseBuilder from './xviz-base-builder';

var XVIZLinkBuilder = function (_XVIZBaseBuilder) {
  _inherits(XVIZLinkBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZLinkBuilder);

  function XVIZLinkBuilder(props) {
    var _this;

    _classCallCheck(this, XVIZLinkBuilder);

    _this = _super.call(this, _objectSpread({}, props));
    _this._links = null;
    _this._targetStream = null;
    return _this;
  }

  _createClass(XVIZLinkBuilder, [{
    key: "parent",
    value: function parent(targetStream) {
      this._targetStream = targetStream;
    }
  }, {
    key: "_flush",
    value: function _flush() {
      if (!this._links) {
        this._links = {};
      }

      var data = {};

      if (this._targetStream) {
        data.target_pose = this._targetStream;
        this._links[this._streamId] = data;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      _get(_getPrototypeOf(XVIZLinkBuilder.prototype), "reset", this).call(this);

      this._targetStream = null;
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this._streamId) {
        this._flush();
      }

      return this._links;
    }
  }]);

  return XVIZLinkBuilder;
}(XVIZBaseBuilder);

export { XVIZLinkBuilder as default };
//# sourceMappingURL=xviz-link-builder.js.map
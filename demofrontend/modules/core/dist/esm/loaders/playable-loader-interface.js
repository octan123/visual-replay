import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import LoaderInterface from './loader-interface';

var PlayableLoaderInterface = function (_LoaderInterface) {
  _inherits(PlayableLoaderInterface, _LoaderInterface);

  var _super = _createSuper(PlayableLoaderInterface);

  function PlayableLoaderInterface() {
    var _this;

    _classCallCheck(this, PlayableLoaderInterface);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getCurrentTime", function () {
      return _this.get('timestamp');
    });

    _defineProperty(_assertThisInitialized(_this), "getLookAhead", function () {
      return _this.get('lookAhead');
    });

    return _this;
  }

  _createClass(PlayableLoaderInterface, [{
    key: "seek",
    value: function seek(timestamp) {
      throw new Error('Not implemented');
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return false;
    }
  }, {
    key: "connect",
    value: function connect() {
      throw new Error('not implemented');
    }
  }, {
    key: "close",
    value: function close() {
      throw new Error('Not implemented');
    }
  }, {
    key: "setLookAhead",
    value: function setLookAhead(lookAhead) {
      this.set('lookAhead', lookAhead);
    }
  }, {
    key: "getLogStartTime",
    value: function getLogStartTime() {
      throw new Error('Not implemented');
    }
  }, {
    key: "getLogEndTime",
    value: function getLogEndTime() {
      throw new Error('Not implemented');
    }
  }, {
    key: "getBufferedTimeRanges",
    value: function getBufferedTimeRanges() {
      throw new Error('Not implemented');
    }
  }]);

  return PlayableLoaderInterface;
}(LoaderInterface);

export { PlayableLoaderInterface as default };
//# sourceMappingURL=playable-loader-interface.js.map
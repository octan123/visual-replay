"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var LoaderInterface = function () {
  function LoaderInterface() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, LoaderInterface);
    (0, _defineProperty2["default"])(this, "_update", function () {
      _this._updateTimer = null;

      _this.listeners.forEach(function (o) {
        return o(_this._version);
      });
    });
    (0, _defineProperty2["default"])(this, "_getDataVersion", function () {
      return _this.get('dataVersion');
    });
    this.listeners = [];
    this.state = {};
    this._updates = 0;
    this._version = 0;
    this._updateTimer = null;
  }

  (0, _createClass2["default"])(LoaderInterface, [{
    key: "subscribe",
    value: function subscribe(instance) {
      this.listeners.push(instance);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(instance) {
      var index = this.listeners.findIndex(function (o) {
        return o === instance;
      });

      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.state[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (this.state[key] !== value) {
        this.state[key] = value;
        this._version++;

        if (!this._updateTimer) {
          this._updateTimer = requestAnimationFrame(this._update);
        }
      }
    }
  }, {
    key: "_bumpDataVersion",
    value: function _bumpDataVersion() {
      this._updates++;
      this.set('dataVersion', this._updates);
    }
  }]);
  return LoaderInterface;
}();

exports["default"] = LoaderInterface;
//# sourceMappingURL=loader-interface.js.map
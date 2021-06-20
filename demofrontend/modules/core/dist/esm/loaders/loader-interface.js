import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var LoaderInterface = function () {
  function LoaderInterface() {
    var _this = this;

    _classCallCheck(this, LoaderInterface);

    _defineProperty(this, "_update", function () {
      _this._updateTimer = null;

      _this.listeners.forEach(function (o) {
        return o(_this._version);
      });
    });

    _defineProperty(this, "_getDataVersion", function () {
      return _this.get('dataVersion');
    });

    this.listeners = [];
    this.state = {};
    this._updates = 0;
    this._version = 0;
    this._updateTimer = null;
  }

  _createClass(LoaderInterface, [{
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

export { LoaderInterface as default };
//# sourceMappingURL=loader-interface.js.map
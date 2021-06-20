import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { Vector2 } from 'math.gl';
import BaseObject from './base-object';
import { getCentroid } from '../utils/geometry';
var defaultCollection = null;
var serialIndex = 0;

var XVIZObject = function (_BaseObject) {
  _inherits(XVIZObject, _BaseObject);

  var _super = _createSuper(XVIZObject);

  _createClass(XVIZObject, null, [{
    key: "setDefaultCollection",
    value: function setDefaultCollection(collection) {
      defaultCollection = collection;
    }
  }]);

  function XVIZObject(_ref) {
    var _this;

    var id = _ref.id,
        timestamp = _ref.timestamp;

    _classCallCheck(this, XVIZObject);

    _this = _super.call(this);
    _this.id = id;
    _this.index = serialIndex++;
    _this.state = {};
    _this.startTime = timestamp;
    _this.endTime = timestamp;
    _this._props = new Map();
    _this._streams = new Map();
    _this._geometry = null;
    return _this;
  }

  _createClass(XVIZObject, [{
    key: "getBearingToObject",
    value: function getBearingToObject(object) {
      var myPosition = this.position;
      var otherPosition = object.position;

      if (myPosition && otherPosition) {
        var bearing = Math.atan2(otherPosition[1] - myPosition[1], otherPosition[0] - myPosition[0]) / Math.PI * 180;
        return bearing;
      }

      return null;
    }
  }, {
    key: "getDistanceToObject",
    value: function getDistanceToObject(object) {
      var myPosition = this.position;
      var otherPosition = object.position;
      var distance = null;

      if (myPosition && otherPosition) {
        distance = new Vector2(myPosition).distance(otherPosition);
        distance = Math.round(distance * 10) / 10;
      }

      return distance;
    }
  }, {
    key: "getProp",
    value: function getProp(name) {
      return this._props.get(name);
    }
  }, {
    key: "getFeature",
    value: function getFeature(streamName) {
      return this._streams.get(streamName);
    }
  }, {
    key: "_observe",
    value: function _observe(timestamp) {
      this.startTime = Math.min(this.startTime, timestamp);
      this.endTime = Math.max(this.endTime, timestamp);
    }
  }, {
    key: "_addFeature",
    value: function _addFeature(streamName, feature) {
      this._streams.set(streamName, feature);

      feature.index = this.index;
      feature.state = this.state;

      var _iterator = _createForOfIteratorHelper(this._props),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          feature[entry[0]] = entry[1];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var p = feature.center || feature.vertices;

      if (!p || !Array.isArray(p)) {
        return;
      }

      if (Number.isFinite(p[0])) {
        p[2] = p[2] || 0;
      } else if (this._geometry) {
        return;
      }

      this._geometry = p;
    }
  }, {
    key: "_setState",
    value: function _setState(name, value) {
      if (name) {
        this.state[name] = value;
      }
    }
  }, {
    key: "_setProp",
    value: function _setProp(name, value) {
      this._props.set(name, value);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      if (this._props.size) {
        this._props.clear();
      }

      if (this._streams.size) {
        this._streams.clear();
      }

      this._geometry = null;
    }
  }, {
    key: "position",
    get: function get() {
      var p = this._geometry;

      if (!p) {
        return null;
      }

      if (Number.isFinite(p[0])) {
        return p;
      }

      this._geometry = getCentroid(p);
      return this._geometry;
    }
  }, {
    key: "isValid",
    get: function get() {
      return Boolean(this._geometry);
    }
  }, {
    key: "streamNames",
    get: function get() {
      return this._streams.keys();
    }
  }], [{
    key: "observe",
    value: function observe(id, timestamp) {
      return defaultCollection && defaultCollection.observe(id, timestamp);
    }
  }, {
    key: "get",
    value: function get(id) {
      return defaultCollection && defaultCollection.get(id);
    }
  }, {
    key: "clear",
    value: function clear() {
      return defaultCollection && defaultCollection.clear();
    }
  }, {
    key: "count",
    value: function count() {
      return defaultCollection && defaultCollection.count();
    }
  }, {
    key: "resetAll",
    value: function resetAll() {
      return defaultCollection && defaultCollection.resetAll();
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return defaultCollection && defaultCollection.getAll();
    }
  }, {
    key: "getAllInCurrentFrame",
    value: function getAllInCurrentFrame() {
      return defaultCollection && defaultCollection.getAllInCurrentFrame();
    }
  }, {
    key: "prune",
    value: function prune(startTime, endTime) {
      return defaultCollection && defaultCollection.prune(startTime, endTime);
    }
  }]);

  return XVIZObject;
}(BaseObject);

export { XVIZObject as default };
//# sourceMappingURL=xviz-object.js.map
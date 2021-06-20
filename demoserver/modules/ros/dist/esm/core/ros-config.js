import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

export var ROSConfig = function () {
  function ROSConfig() {
    var rosConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ROSConfig);

    this.rosConfig = rosConfig;
    this._topics = null;
    this._needsTopicTypes = false;

    this._gatherTopics();
  }

  _createClass(ROSConfig, [{
    key: "_gatherTopics",
    value: function _gatherTopics() {
      var rosConfig = this.rosConfig;

      if (rosConfig && rosConfig.topicConfig) {
        this._topics = new Set();

        var _iterator = _createForOfIteratorHelper(rosConfig.topicConfig),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
                topic = _step$value.topic,
                type = _step$value.type,
                converter = _step$value.converter;
            var typeSet = type !== '' && type !== undefined && type !== null;
            var converterSet = converter !== '' && converter !== undefined && converter !== null;

            if (!typeSet && !converterSet) {
              this._needsTopicTypes = true;
            }

            this._topics.add(topic);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        this._needsTopicTypes = true;
      }
    }
  }, {
    key: "needsTopicTypes",
    value: function needsTopicTypes() {
      return this._needsTopicTypes;
    }
  }, {
    key: "topics",
    get: function get() {
      if (this._topics) {
        return Array.from(this._topics.values());
      }

      return null;
    }
  }, {
    key: "topicConfig",
    get: function get() {
      return this.rosConfig.topicConfig;
    }
  }, {
    key: "entryCount",
    get: function get() {
      if (this.rosConfig.topicConfig) {
        return this.rosConfig.topicConfig.length;
      }

      return 0;
    }
  }]);

  return ROSConfig;
}();
//# sourceMappingURL=ros-config.js.map
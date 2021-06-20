"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SensorPointCloud2 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _converter = _interopRequireDefault(require("./converter"));

var _lodash = _interopRequireDefault(require("lodash"));

var _parseLidarPoints = require("./lib/parse-lidar-points");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SensorPointCloud2 = function (_Converter) {
  (0, _inherits2["default"])(SensorPointCloud2, _Converter);

  var _super = _createSuper(SensorPointCloud2);

  function SensorPointCloud2(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, SensorPointCloud2);
    _this = _super.call(this, config);
    _this.previousData = {};
    return _this;
  }

  (0, _createClass2["default"])(SensorPointCloud2, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._buildPoints(frame, xvizBuilder, {
                  topic: this.topic,
                  color: '#00ff00aa'
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function convertMessage(_x, _x2) {
        return _convertMessage.apply(this, arguments);
      }

      return convertMessage;
    }()
  }, {
    key: "_buildPoints",
    value: function _buildPoints(frame, xvizBuilder, _ref) {
      var color = _ref.color,
          topic = _ref.topic;
      var data = frame[topic];

      if (!data) {
        data = this.previousData[topic];

        if (!data) {
          return;
        }
      }

      this.previousData[topic] = data;

      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var message = _step.value.message;
          var pointsSize = message.data.length / (message.height * message.width);

          var _loadProcessedLidarDa = (0, _parseLidarPoints.loadProcessedLidarData)(message.data, pointsSize),
              positions = _loadProcessedLidarDa.positions;

          xvizBuilder.primitive(this.xvizStream).points(positions).style({
            fill_color: color
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "getMetadata",
    value: function getMetadata(xvizMetaBuilder, context) {
      var frameIdToPoseMap = context.frameIdToPoseMap;
      var streamMetadata = xvizMetaBuilder.stream(this.xvizStream).category('primitive').type('point').streamStyle({
        fill_color: '#00a',
        radiusPixels: 3
      });
      var frameId = this.config.frameId || 'velodyne';
      var pose = (frameIdToPoseMap || {})[frameId];

      if (pose) {
        streamMetadata.pose(_lodash["default"].pick(pose, ['x', 'y', 'z']), _lodash["default"].pick(pose, ['pitch', 'roll', 'yaw'])).coordinate('VEHICLE_RELATIVE');
      }
    }
  }], [{
    key: "name",
    get: function get() {
      return 'SensorPointCloud2';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'sensor_msgs/PointCloud2';
    }
  }]);
  return SensorPointCloud2;
}(_converter["default"]);

exports.SensorPointCloud2 = SensorPointCloud2;
//# sourceMappingURL=sensor-pointcloud2-converter.js.map
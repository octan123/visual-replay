"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SensorNavSatFix = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _converter = _interopRequireDefault(require("./converter"));

var _quaternion = require("../common/quaternion");

var _rosbag = require("rosbag");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SensorNavSatFix = function (_Converter) {
  (0, _inherits2["default"])(SensorNavSatFix, _Converter);

  var _super = _createSuper(SensorNavSatFix);

  function SensorNavSatFix(config) {
    (0, _classCallCheck2["default"])(this, SensorNavSatFix);
    return _super.call(this, config);
  }

  (0, _createClass2["default"])(SensorNavSatFix, [{
    key: "_getOrientationFromIMU",
    value: function _getOrientationFromIMU(frame, xvizBuilder) {
      if (!this.config.imuTopic) {
        return null;
      }

      var msg = frame[this.config.imuTopic];

      if (!msg) {
        return null;
      }

      var message = msg[msg.length - 1].message;
      var rotation = (0, _quaternion.quaternionToEuler)(message.orientation);
      return {
        rotation: rotation
      };
    }
  }, {
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        var msg, _msg, timestamp, message, state, ts, poseBuilder, rotation;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                msg = frame[this.topic];

                if (msg) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _msg = msg[msg.length - 1], timestamp = _msg.timestamp, message = _msg.message;
                state = this._getOrientationFromIMU(frame, xvizBuilder);
                ts = _rosbag.TimeUtil.toDate(timestamp).getTime() / 1e3;
                poseBuilder = xvizBuilder.pose(this.xvizStream).mapOrigin(message.longitude, message.latitude, message.altitude).timestamp(ts).position(0, 0, 0);

                if (state && state.rotation) {
                  rotation = state.rotation;
                  poseBuilder.orientation(rotation.roll, rotation.pitch, rotation.yaw);
                }

              case 8:
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
    key: "getMetadata",
    value: function getMetadata(xvizMetaBuilder, context) {
      xvizMetaBuilder.stream(this.xvizStream).category('pose');
    }
  }], [{
    key: "name",
    get: function get() {
      return 'SensorNavSatFix';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'sensor_msgs/NavSatFix';
    }
  }]);
  return SensorNavSatFix;
}(_converter["default"]);

exports.SensorNavSatFix = SensorNavSatFix;
//# sourceMappingURL=sensor-navsatfix-converter.js.map
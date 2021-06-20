"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeometryPoseStamped = void 0;

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

var GeometryPoseStamped = function (_Converter) {
  (0, _inherits2["default"])(GeometryPoseStamped, _Converter);

  var _super = _createSuper(GeometryPoseStamped);

  function GeometryPoseStamped(config) {
    (0, _classCallCheck2["default"])(this, GeometryPoseStamped);
    return _super.call(this, config);
  }

  (0, _createClass2["default"])(GeometryPoseStamped, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        var msg, _msg, timestamp, message, rotation, position, poseBuilder, origin;

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
                rotation = (0, _quaternion.quaternionToEuler)(message.pose.orientation);
                position = message.pose.position;
                poseBuilder = xvizBuilder.pose(this.xvizStream).position(position.x, position.y, 0).orientation(rotation.roll, rotation.pitch, rotation.yaw).timestamp(_rosbag.TimeUtil.toDate(timestamp).getTime() / 1e3);

                if (this.config.origin) {
                  origin = this.config.origin;
                  poseBuilder.mapOrigin(origin.longitude, origin.latitude, origin.altitude);
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
    value: function getMetadata(xvizMetaBuilder) {
      xvizMetaBuilder.stream(this.xvizStream).category('pose');
    }
  }], [{
    key: "name",
    get: function get() {
      return 'GeometryPoseStamped';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'geometry_msgs/PoseStamped';
    }
  }]);
  return GeometryPoseStamped;
}(_converter["default"]);

exports.GeometryPoseStamped = GeometryPoseStamped;
//# sourceMappingURL=geometry-posestamped-converter.js.map
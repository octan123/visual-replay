import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Converter from './converter';
import { quaternionToEuler } from '../common/quaternion';
import { TimeUtil } from 'rosbag';
export var GeometryPoseStamped = function (_Converter) {
  _inherits(GeometryPoseStamped, _Converter);

  var _super = _createSuper(GeometryPoseStamped);

  function GeometryPoseStamped(config) {
    _classCallCheck(this, GeometryPoseStamped);

    return _super.call(this, config);
  }

  _createClass(GeometryPoseStamped, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame, xvizBuilder) {
        var msg, _msg, timestamp, message, rotation, position, poseBuilder, origin;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                rotation = quaternionToEuler(message.pose.orientation);
                position = message.pose.position;
                poseBuilder = xvizBuilder.pose(this.xvizStream).position(position.x, position.y, 0).orientation(rotation.roll, rotation.pitch, rotation.yaw).timestamp(TimeUtil.toDate(timestamp).getTime() / 1e3);

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
}(Converter);
//# sourceMappingURL=geometry-posestamped-converter.js.map
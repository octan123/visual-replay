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
export var SensorNavSatFix = function (_Converter) {
  _inherits(SensorNavSatFix, _Converter);

  var _super = _createSuper(SensorNavSatFix);

  function SensorNavSatFix(config) {
    _classCallCheck(this, SensorNavSatFix);

    return _super.call(this, config);
  }

  _createClass(SensorNavSatFix, [{
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
      var rotation = quaternionToEuler(message.orientation);
      return {
        rotation: rotation
      };
    }
  }, {
    key: "convertMessage",
    value: function () {
      var _convertMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame, xvizBuilder) {
        var msg, _msg, timestamp, message, state, ts, poseBuilder, rotation;

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
                state = this._getOrientationFromIMU(frame, xvizBuilder);
                ts = TimeUtil.toDate(timestamp).getTime() / 1e3;
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
}(Converter);
//# sourceMappingURL=sensor-navsatfix-converter.js.map
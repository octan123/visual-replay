import _regeneratorRuntime from "@babel/runtime/regenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Converter from './converter';
import { TimeUtil } from 'rosbag';
export var XVIZFakePose = function (_Converter) {
  _inherits(XVIZFakePose, _Converter);

  var _super = _createSuper(XVIZFakePose);

  function XVIZFakePose(config) {
    _classCallCheck(this, XVIZFakePose);

    return _super.call(this, config);
  }

  _createClass(XVIZFakePose, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame, xvizBuilder) {
        var _xvizBuilder$pose;

        var position, msg, timestamp;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                position = this.config.position || [0, 0, 0];
                msg = frame[this.topic];

                if (msg) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                timestamp = msg[msg.length - 1].timestamp;

                (_xvizBuilder$pose = xvizBuilder.pose(this.xvizStream)).position.apply(_xvizBuilder$pose, _toConsumableArray(position)).timestamp(TimeUtil.toDate(timestamp).getTime() / 1e3);

              case 6:
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
      return 'XVIZFakePose';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'xviz_msgs/FakePose';
    }
  }]);

  return XVIZFakePose;
}(Converter);
//# sourceMappingURL=xviz-fake-pose-converter.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZFakePose = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _converter = _interopRequireDefault(require("./converter"));

var _rosbag = require("rosbag");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZFakePose = function (_Converter) {
  (0, _inherits2["default"])(XVIZFakePose, _Converter);

  var _super = _createSuper(XVIZFakePose);

  function XVIZFakePose(config) {
    (0, _classCallCheck2["default"])(this, XVIZFakePose);
    return _super.call(this, config);
  }

  (0, _createClass2["default"])(XVIZFakePose, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        var _xvizBuilder$pose;

        var position, msg, timestamp;
        return _regenerator["default"].wrap(function _callee$(_context) {
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

                (_xvizBuilder$pose = xvizBuilder.pose(this.xvizStream)).position.apply(_xvizBuilder$pose, (0, _toConsumableArray2["default"])(position)).timestamp(_rosbag.TimeUtil.toDate(timestamp).getTime() / 1e3);

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
}(_converter["default"]);

exports.XVIZFakePose = XVIZFakePose;
//# sourceMappingURL=xviz-fake-pose-converter.js.map
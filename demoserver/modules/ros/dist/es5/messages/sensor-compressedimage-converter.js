"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SensorCompressedImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _converter = _interopRequireDefault(require("./converter"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SensorCompressedImage = function (_Converter) {
  (0, _inherits2["default"])(SensorCompressedImage, _Converter);

  var _super = _createSuper(SensorCompressedImage);

  function SensorCompressedImage(config) {
    (0, _classCallCheck2["default"])(this, SensorCompressedImage);
    return _super.call(this, config);
  }

  (0, _createClass2["default"])(SensorCompressedImage, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        var msgs, message, format, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                msgs = frame[this.topic];

                if (msgs) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                if (msgs.length) {
                  message = msgs[msgs.length - 1].message;
                  format = message.format, data = message.data;
                  xvizBuilder.primitive(this.xvizStream).image(nodeBufferToTypedArray(data), format);
                }

              case 4:
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
      var xb = xvizMetaBuilder;
      xb.stream(this.xvizStream).category('primitive').type('image');
    }
  }], [{
    key: "name",
    get: function get() {
      return 'SensorCompressedImage';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'sensor_msgs/CompressedImage';
    }
  }]);
  return SensorCompressedImage;
}(_converter["default"]);

exports.SensorCompressedImage = SensorCompressedImage;

function nodeBufferToTypedArray(buffer) {
  var typedArray = new Uint8Array(buffer);
  return typedArray;
}
//# sourceMappingURL=sensor-compressedimage-converter.js.map
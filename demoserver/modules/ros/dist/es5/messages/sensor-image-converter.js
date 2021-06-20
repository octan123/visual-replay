"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SensorImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _converter = _interopRequireDefault(require("./converter"));

var _sharp = _interopRequireDefault(require("sharp"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SensorImage = function (_Converter) {
  (0, _inherits2["default"])(SensorImage, _Converter);

  var _super = _createSuper(SensorImage);

  function SensorImage(config) {
    (0, _classCallCheck2["default"])(this, SensorImage);
    return _super.call(this, config);
  }

  (0, _createClass2["default"])(SensorImage, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        var msgs, message, width, height, data, imgData;
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
                if (!msgs.length) {
                  _context.next = 10;
                  break;
                }

                message = msgs[msgs.length - 1].message;
                width = message.width, height = message.height, data = message.data;
                _context.next = 8;
                return (0, _sharp["default"])(data, {
                  raw: {
                    width: width,
                    height: height,
                    channels: 3
                  }
                }).resize(400).toFormat('png').toBuffer();

              case 8:
                imgData = _context.sent;
                xvizBuilder.primitive(this.xvizStream).image(nodeBufferToTypedArray(imgData), 'png').dimensions(width, height);

              case 10:
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
      return 'SensorImage';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'sensor_msgs/Image';
    }
  }]);
  return SensorImage;
}(_converter["default"]);

exports.SensorImage = SensorImage;

function nodeBufferToTypedArray(buffer) {
  var typedArray = new Uint8Array(buffer);
  return typedArray;
}
//# sourceMappingURL=sensor-image-converter.js.map
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
import sharp from 'sharp';
export var SensorImage = function (_Converter) {
  _inherits(SensorImage, _Converter);

  var _super = _createSuper(SensorImage);

  function SensorImage(config) {
    _classCallCheck(this, SensorImage);

    return _super.call(this, config);
  }

  _createClass(SensorImage, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame, xvizBuilder) {
        var msgs, message, width, height, data, imgData;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                return sharp(data, {
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
}(Converter);

function nodeBufferToTypedArray(buffer) {
  var typedArray = new Uint8Array(buffer);
  return typedArray;
}
//# sourceMappingURL=sensor-image-converter.js.map
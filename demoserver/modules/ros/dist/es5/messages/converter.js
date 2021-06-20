"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Converter = function () {
  function Converter(config) {
    (0, _classCallCheck2["default"])(this, Converter);
    this.config = config;

    this._setup();
  }

  (0, _createClass2["default"])(Converter, [{
    key: "_setup",
    value: function _setup() {
      if (!this.config.topic) {
        throw new Error('ROS Message converter must have a topic to convert');
      }

      if (!this.config.xvizStream) {
        this.config.xvizStream = this.config.topic;
      }
    }
  }, {
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('Implement me');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function convertMessage(_x, _x2) {
        return _convertMessage.apply(this, arguments);
      }

      return convertMessage;
    }()
  }, {
    key: "getMetadata",
    value: function getMetadata(xvizMetaBuilder, aux) {
      throw new Error('Implement me');
    }
  }, {
    key: "topic",
    get: function get() {
      return this.config.topic;
    }
  }, {
    key: "xvizStream",
    get: function get() {
      return this.config.xvizStream;
    }
  }]);
  return Converter;
}();

exports["default"] = Converter;
//# sourceMappingURL=converter.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZBaseProvider = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizData = require("../common/xviz-data");

var MessageIterator = function () {
  function MessageIterator(start, end) {
    var increment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    (0, _classCallCheck2["default"])(this, MessageIterator);
    this.start = start;
    this.end = end;
    this.increment = increment;
    this.current = start;
  }

  (0, _createClass2["default"])(MessageIterator, [{
    key: "valid",
    value: function valid() {
      return this.current <= this.end;
    }
  }, {
    key: "value",
    value: function value() {
      return this.current;
    }
  }, {
    key: "next",
    value: function next() {
      var valid = this.valid();

      if (!valid) {
        return {
          valid: valid
        };
      }

      var data = this.current;
      this.current += this.increment;
      return {
        valid: valid,
        data: data
      };
    }
  }]);
  return MessageIterator;
}();

var XVIZBaseProvider = function () {
  function XVIZBaseProvider(_ref) {
    var reader = _ref.reader,
        options = _ref.options;
    (0, _classCallCheck2["default"])(this, XVIZBaseProvider);
    this.reader = reader;
    this.options = options;
    this.metadata = null;
    this._valid = false;
  }

  (0, _createClass2["default"])(XVIZBaseProvider, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
        var _this$reader$timeRang, startTime, endTime;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.reader) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _this$reader$timeRang = this.reader.timeRange(), startTime = _this$reader$timeRang.startTime, endTime = _this$reader$timeRang.endTime;
                this.metadata = this._readMetadata();

                if (this.metadata && Number.isFinite(startTime) && Number.isFinite(endTime) && this.reader.checkMessage(0)) {
                    this._valid = true;
                  }

                if (!(this.metadata && (!Number.isFinite(startTime) || !Number.isFinite(endTime)))) {
                  _context.next = 7;
                  break;
                }

                throw new Error('The data source is missing the data index');

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "valid",
    value: function valid() {
      return this._valid;
    }
  }, {
    key: "xvizMetadata",
    value: function xvizMetadata() {
      return this.metadata;
    }
  }, {
    key: "xvizMessage",
    value: function () {
      var _xvizMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(iterator) {
        var _iterator$next, valid, data, message;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iterator$next = iterator.next(), valid = _iterator$next.valid, data = _iterator$next.data;

                if (valid) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", null);

              case 3:
                message = this._readMessage(data);
                return _context2.abrupt("return", message);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function xvizMessage(_x) {
        return _xvizMessage.apply(this, arguments);
      }

      return xvizMessage;
    }()
  }, {
    key: "getMessageIterator",
    value: function getMessageIterator() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          startTime = _ref2.startTime,
          endTime = _ref2.endTime;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _this$reader$timeRang2 = this.reader.timeRange(),
          start = _this$reader$timeRang2.startTime,
          end = _this$reader$timeRang2.endTime;

      if (!Number.isFinite(startTime)) {
        startTime = start;
      }

      if (!Number.isFinite(endTime)) {
        endTime = end;
      }

      if (startTime > endTime) {
        return null;
      }

      var startMessages = this.reader.findMessage(startTime);
      var endMessages = this.reader.findMessage(endTime);

      if (startMessages !== undefined && endMessages !== undefined) {
        return new MessageIterator(startMessages.first, endMessages.last);
      }

      return null;
    }
  }, {
    key: "_readMessage",
    value: function _readMessage(message) {
      var data = this.reader.readMessage(message);

      if (data) {
        return new _xvizData.XVIZData(data);
      }

      return undefined;
    }
  }, {
    key: "_readMetadata",
    value: function _readMetadata() {
      var data = this.reader.readMetadata();

      if (data) {
        return new _xvizData.XVIZData(data);
      }

      return undefined;
    }
  }]);
  return XVIZBaseProvider;
}();

exports.XVIZBaseProvider = XVIZBaseProvider;
//# sourceMappingURL=xviz-base-provider.js.map
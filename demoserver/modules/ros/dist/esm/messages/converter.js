import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

var Converter = function () {
  function Converter(config) {
    _classCallCheck(this, Converter);

    this.config = config;

    this._setup();
  }

  _createClass(Converter, [{
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
      var _convertMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame, xvizBuilder) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
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

export { Converter as default };
//# sourceMappingURL=converter.js.map
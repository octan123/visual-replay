import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZBuilder } from '@xviz/builder';
export var ROS2XVIZConverter = function () {
  function ROS2XVIZConverter(converters, rosConfig) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ROS2XVIZConverter);

    this.options = options;
    this.converters = converters;
    this.rosConfig = rosConfig;
    this.instances = [];
  }

  _createClass(ROS2XVIZConverter, [{
    key: "verbose",
    value: function verbose(msg) {
      var logger = this.options.logger;

      if (logger && logger.verbose) {
        logger.verbose(msg);
      }
    }
  }, {
    key: "_makeConvertersForTopic",
    value: function _makeConvertersForTopic(entry, topicMessageTypes, aux) {
      var topic = entry.topic,
          type = entry.type,
          converter = entry.converter,
          config = entry.config;
      var converters = this.converters;
      var ConverterClass = null;

      if (converter) {
        this.verbose("ROS2XVIZConverter setting up converter by name for '".concat(topic, "'"));
        ConverterClass = converters.find(function (conv) {
          return conv.name === converter;
        });

        if (!ConverterClass) {
          this.verbose("ROS2XVIZConverter cannot find the converter with name '".concat(converter, "' for topic '").concat(topic, "'"));
        }
      } else {
        var msgType = type || topicMessageTypes[topic];

        if (!msgType) {
          this.verbose("ROS2XVIZConverter does not have a type for the '".concat(topic, "', skipping"));
        } else {
          this.verbose("ROS2XVIZConverter setting up converter by type '".concat(msgType, "' for '").concat(topic, "'"));
          ConverterClass = converters.find(function (conv) {
            return conv.messageType === msgType;
          });

          if (!ConverterClass) {
            this.verbose("ROS2XVIZConverter cannot find the converter for message type '".concat(msgType, "' for topic '").concat(topic, "'"));
          }
        }
      }

      if (ConverterClass) {
        var converterConfig = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.options), aux), config), {}, {
          topic: topic
        });

        this.instances.push(new ConverterClass(converterConfig));
      }
    }
  }, {
    key: "initializeConverters",
    value: function initializeConverters(topicMessageTypes, aux) {
      var rosConfig = this.rosConfig;
      var count = rosConfig.entryCount;

      if (count > 0) {
        var _iterator = _createForOfIteratorHelper(rosConfig.topicConfig),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;

            this._makeConvertersForTopic(entry, topicMessageTypes, aux);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        for (var key in topicMessageTypes) {
          this._makeConvertersForTopic({
            topic: key,
            type: topicMessageTypes[key]
          }, topicMessageTypes, aux);
        }
      }

      if (this.instances.length === 0) {
        throw new Error('No converters where created. Check that the configuration is correct and the Converter classes are properly registered.');
      }
    }
  }, {
    key: "buildMetadata",
    value: function buildMetadata(metadataBuilder, aux) {
      var _iterator2 = _createForOfIteratorHelper(this.instances),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var instance = _step2.value;
          instance.getMetadata(metadataBuilder, aux);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.metadata = metadataBuilder.getMetadata();
    }
  }, {
    key: "buildMessage",
    value: function () {
      var _buildMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame) {
        var xvizBuilder, _iterator3, _step3, instance, frm;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                xvizBuilder = new XVIZBuilder(this.metadata, this.disableStreams, {});
                _iterator3 = _createForOfIteratorHelper(this.instances);
                _context.prev = 2;

                _iterator3.s();

              case 4:
                if ((_step3 = _iterator3.n()).done) {
                  _context.next = 10;
                  break;
                }

                instance = _step3.value;
                _context.next = 8;
                return instance.convertMessage(frame, xvizBuilder);

              case 8:
                _context.next = 4;
                break;

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](2);

                _iterator3.e(_context.t0);

              case 15:
                _context.prev = 15;

                _iterator3.f();

                return _context.finish(15);

              case 18:
                _context.prev = 18;
                frm = xvizBuilder.getMessage();
                return _context.abrupt("return", frm);

              case 23:
                _context.prev = 23;
                _context.t1 = _context["catch"](18);
                return _context.abrupt("return", null);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 12, 15, 18], [18, 23]]);
      }));

      function buildMessage(_x) {
        return _buildMessage.apply(this, arguments);
      }

      return buildMessage;
    }()
  }]);

  return ROS2XVIZConverter;
}();
//# sourceMappingURL=ros-2-xviz.js.map
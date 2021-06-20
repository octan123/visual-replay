import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { XVIZData, XVIZEnvelope } from '@xviz/io';
import { XVIZMetadataBuilder } from '@xviz/builder';
import { ROSBag } from '../core/ros-bag';
import { ROSConfig } from '../core/ros-config';

var MessageIterator = function () {
  function MessageIterator(start, end) {
    var increment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    _classCallCheck(this, MessageIterator);

    this.start = start;
    this.end = end;
    this.increment = increment;
    this.current = start;
  }

  _createClass(MessageIterator, [{
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

      var val = this.current;
      this.current += this.increment;
      return {
        valid: valid,
        data: {
          start: val,
          end: this.current
        }
      };
    }
  }]);

  return MessageIterator;
}();

export var ROSBagProvider = function () {
  function ROSBagProvider(_ref) {
    var root = _ref.root,
        options = _ref.options;

    _classCallCheck(this, ROSBagProvider);

    this.bagPath = root.endsWith('.bag') ? root : "".concat(root, ".bag");
    this.BagClass = options && options.BagClass || ROSBag;
    this.ros2xvizFactory = options && options.ros2xvizFactory;
    this.rosConfig = options && options.rosConfig && new ROSConfig(options.rosConfig);
    this.options = options || {};
    this.metadata = null;
    this.ros2xviz = null;
    this.isValid = false;

    if (!this.ros2xvizFactory) {
      throw new Error('The ROSBagProvider requires a ROS2XVIZFactory instance');
    }
  }

  _createClass(ROSBagProvider, [{
    key: "log",
    value: function log(msg) {
      var logger = this.options.logger;

      if (logger && logger.info) {
        logger.info(msg);
      }
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.ros2xviz = this.ros2xvizFactory.create(this.rosConfig, this.options);
                this.bag = new this.BagClass(this.bagPath, this.rosConfig, this.options);

                if (!this.bag) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return this.bag.init(this.ros2xviz);

              case 6:
                this.isValid = _context.sent;

                if (this.isValid) {
                  this._getMetadata();
                }

              case 8:
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "valid",
    value: function valid() {
      return this.isValid;
    }
  }, {
    key: "_getMetadata",
    value: function _getMetadata() {
      if (this.valid) {
        var xvizMetadataBuilder = new XVIZMetadataBuilder();
        this.bag.getMetadata(xvizMetadataBuilder, this.ros2xviz);
        var rawMetadata = xvizMetadataBuilder.getMetadata();
        this.metadata = XVIZEnvelope.Metadata(rawMetadata);
      }
    }
  }, {
    key: "xvizMetadata",
    value: function xvizMetadata() {
      if (!this.metadata) {
        this._getMetadata();
      }

      if (this.metadata) {
        return new XVIZData(this.metadata);
      }

      return null;
    }
  }, {
    key: "getMessageIterator",
    value: function getMessageIterator() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          startTime = _ref2.startTime,
          endTime = _ref2.endTime;

      var _this$metadata$data$l = this.metadata.data.log_info,
          start = _this$metadata$data$l.start_time,
          end = _this$metadata$data$l.end_time;

      if (startTime) {
        if (startTime >= start && startTime <= end) {
          start = startTime;
        }
      }

      if (endTime) {
        if (endTime >= start && endTime <= end) {
          end = endTime;
        } else {
          end = start + 30;
        }
      }

      return new MessageIterator(start, end, 0.1);
    }
  }, {
    key: "xvizMessage",
    value: function () {
      var _xvizMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(iterator) {
        var _iterator$next, valid, _iterator$next$data, start, end, dataset, msg;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iterator$next = iterator.next(), valid = _iterator$next.valid, _iterator$next$data = _iterator$next.data, start = _iterator$next$data.start, end = _iterator$next$data.end;

                if (valid) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", null);

              case 3:
                _context2.next = 5;
                return this.bag.readMessages(start, end);

              case 5:
                dataset = _context2.sent;
                _context2.next = 8;
                return this.ros2xviz.buildMessage(dataset);

              case 8:
                msg = _context2.sent;

                if (!msg) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", new XVIZData(XVIZEnvelope.StateUpdate(msg)));

              case 11:
                return _context2.abrupt("return", null);

              case 12:
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
  }]);

  return ROSBagProvider;
}();
//# sourceMappingURL=rosbag-provider.js.map
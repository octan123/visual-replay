"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROSBag = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _rosbag = require("rosbag");

var _quaternion = require("../common/quaternion");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ROSBag = function () {
  function ROSBag(bagPath, rosConfig) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, ROSBag);
    this.bagPath = bagPath;
    this.rosConfig = rosConfig;
    this.options = options;
    this.bagContext = {};
    this.topicMessageTypes = {};
  }

  (0, _createClass2["default"])(ROSBag, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(ros2xviz) {
        var bag;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._openBag();

              case 2:
                bag = _context.sent;
                _context.next = 5;
                return this._initBag(bag);

              case 5:
                if (this.rosConfig.needsTopicTypes()) {
                  this._gatherTopicsTypes(bag);
                }

                this._initTopics(ros2xviz);

                return _context.abrupt("return", true);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "_openBag",
    value: function () {
      var _openBag2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _rosbag.open)(this.bagPath);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _openBag() {
        return _openBag2.apply(this, arguments);
      }

      return _openBag;
    }()
  }, {
    key: "_initBag",
    value: function () {
      var _initBag2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(bag) {
        var TF, TF_STATIC, frameIdToPoseMap;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                TF = '/tf';
                TF_STATIC = '/tf_static';
                this.bagContext.start_time = _rosbag.TimeUtil.toDate(bag.startTime).getTime() / 1e3;
                this.bagContext.end_time = _rosbag.TimeUtil.toDate(bag.endTime).getTime() / 1e3;
                frameIdToPoseMap = {};
                _context3.next = 7;
                return bag.readMessages({
                  topics: [TF, TF_STATIC]
                }, function (_ref) {
                  var topic = _ref.topic,
                      message = _ref.message;
                  message.transforms.forEach(function (t) {
                    frameIdToPoseMap[t.child_frame_id] = _objectSpread(_objectSpread({}, t.transform.translation), (0, _quaternion.quaternionToEuler)(t.transform.rotation));
                  });
                });

              case 7:
                this.bagContext.frameIdToPoseMap = frameIdToPoseMap;

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _initBag(_x2) {
        return _initBag2.apply(this, arguments);
      }

      return _initBag;
    }()
  }, {
    key: "_gatherTopicsTypes",
    value: function _gatherTopicsTypes(bag) {
      var topics = this.rosConfig.topics;

      for (var conn in bag.connections) {
        var _bag$connections$conn = bag.connections[conn],
            topic = _bag$connections$conn.topic,
            type = _bag$connections$conn.type;

        if (!topics || topics.includes(topic)) {
          if (this.topicMessageTypes[topic] && this.topicMessageTypes[topic] !== type) {
            throw new Error("Unexpected change in topic type ".concat(topic, " has ").concat(this.topicMessageTypes[topic], " with new type ").concat(type));
          } else if (!this.topicMessageTypes[topic]) {
            this.topicMessageTypes[topic] = type;
          }
        }
      }
    }
  }, {
    key: "_initTopics",
    value: function _initTopics(ros2xviz) {
      ros2xviz.initializeConverters(this.topicMessageTypes, this.bagContext);
    }
  }, {
    key: "getMetadata",
    value: function getMetadata(metadataBuilder, ros2xviz) {
      ros2xviz.buildMetadata(metadataBuilder, this.bagContext);
      metadataBuilder.startTime(this.bagContext.start_time);
      metadataBuilder.endTime(this.bagContext.end_time);
    }
  }, {
    key: "readMessages",
    value: function () {
      var _readMessages = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5(start, end) {
        var bag, frame, options;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._openBag();

              case 2:
                bag = _context5.sent;
                frame = {};
                options = {
                  topics: this.rosConfig.topics
                };

                if (start) {
                  options.startTime = _rosbag.TimeUtil.fromDate(new Date(start * 1e3));
                }

                if (end) {
                  options.endTime = _rosbag.TimeUtil.fromDate(new Date(end * 1e3));
                }

                _context5.next = 9;
                return bag.readMessages(options, function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(result) {
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (result.message.data) {
                              result.message.data = Buffer.from(result.message.data);
                            }

                            frame[result.topic] = frame[result.topic] || [];
                            frame[result.topic].push(result);

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x5) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 9:
                return _context5.abrupt("return", frame);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function readMessages(_x3, _x4) {
        return _readMessages.apply(this, arguments);
      }

      return readMessages;
    }()
  }]);
  return ROSBag;
}();

exports.ROSBag = ROSBag;
//# sourceMappingURL=ros-bag.js.map
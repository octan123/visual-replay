"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bagdumpArgs = bagdumpArgs;
exports.bagdumpCmd = bagdumpCmd;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rosbag = require("rosbag");

var _common = require("./common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bagdumpArgs(inArgs) {
  var cmd = 'bagdump <bag>';
  return inArgs.command(cmd, 'Display information about a ROS bag', _objectSpread(_objectSpread({}, _common.StartEndOptions), {}, {
    topic: {
      alias: 't',
      description: 'The topic to inspect'
    },
    dumpTime: {
      type: 'boolean',
      description: 'Show start and end time of the bag'
    },
    dumpTopics: {
      type: 'boolean',
      description: 'Show start and end time of the bag'
    },
    dumpMessages: {
      type: 'boolean',
      description: 'Will dump messages, if a topic is provided only those will be dumped'
    },
    dumpDefs: {
      type: 'boolean',
      description: 'Will dump message definitions'
    }
  }), bagdumpCmd);
}

function bagdumpCmd(_x) {
  return _bagdumpCmd.apply(this, arguments);
}

function _bagdumpCmd() {
  _bagdumpCmd = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(args) {
    var source, mainTopic, bag, seen, conn, _bag$connections$conn, messageDefinition, topic, type;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = args.bag, mainTopic = args.topic;
            _context.next = 3;
            return (0, _rosbag.open)(source);

          case 3:
            bag = _context.sent;

            if (args.dumpTime) {
              console.log("start_time: ".concat(_rosbag.TimeUtil.toDate(bag.startTime).getTime() / 1e3));
              console.log("end_time: ".concat(_rosbag.TimeUtil.toDate(bag.endTime).getTime() / 1e3));
            }

            if (args.dumpTopics) {
              seen = [];

              for (conn in bag.connections) {
                _bag$connections$conn = bag.connections[conn], messageDefinition = _bag$connections$conn.messageDefinition, topic = _bag$connections$conn.topic, type = _bag$connections$conn.type;

                if (!seen[topic]) {
                  seen[topic] = true;
                  console.log(topic, type);

                  if (args.dumpDefs) {
                    console.log(messageDefinition);
                  }
                }
              }
            }

            if (!args.dumpMessages) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return bag.readMessages({}, function (_ref) {
              var topic = _ref.topic,
                  message = _ref.message;

              if (!mainTopic || topic === mainTopic) {
                console.log(JSON.stringify(message, null, 2));
              }
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _bagdumpCmd.apply(this, arguments);
}
//# sourceMappingURL=bagdump.js.map
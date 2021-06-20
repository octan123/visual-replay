"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertArgs = convertArgs;
exports.convertCmd = convertCmd;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _io = require("@xviz/io");

var _node = require("@xviz/io/node");

var _common = require("./common");

var _process = _interopRequireDefault(require("process"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function convertArgs(inArgs) {
  var cmd = 'convert [-d output] <bag>';
  return inArgs.command(cmd, 'Convert a rosbag to xviz', _objectSpread(_objectSpread({}, _common.StartEndOptions), {}, {
    directory: {
      alias: 'd',
      describe: 'Directory to save XVIZ data',
      type: 'string',
      required: true
    },
    rosConfig: {
      describe: 'Path to ROS Bag JSON configuration',
      type: 'string',
      required: true
    },
    format: {
      describe: 'Output data format',
      "default": 'BINARY_GLB',
      choices: ['JSON_STRING', 'BINARY_GLB'],
      nargs: 1
    }
  }), convertCmd);
}

function convertCmd(_x) {
  return _convertCmd.apply(this, arguments);
}

function _convertCmd() {
  _convertCmd = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(args) {
    var bag, directory, start, end, format, source, provider, sink, iterator, writer, md, frameSequence, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bag = args.bag, directory = args.directory, start = args.start, end = args.end, format = args.format;

            try {
              deleteDirRecursive(directory);
            } catch (err) {}

            createDir(directory);
            source = new _node.FileSource(bag);
            _context.next = 6;
            return _io.XVIZProviderFactory.open({
              options: _objectSpread({}, args),
              source: source,
              root: bag
            });

          case 6:
            provider = _context.sent;

            if (provider) {
              _context.next = 9;
              break;
            }

            throw new Error('Failed to create ROSBagProvider');

          case 9:
            sink = new _node.FileSink(directory);
            iterator = provider.getMessageIterator({
              startTime: start,
              endTime: end
            });

            if (iterator.valid()) {
              _context.next = 13;
              break;
            }

            throw new Error('Error creating and iterator');

          case 13:
            writer = new _io.XVIZFormatWriter(sink, {
              format: format
            });
            md = provider.xvizMetadata();
            setMetadataTimes(md.message().data, start, end);
            writer.writeMetadata(md);
            signalWriteIndexOnInterrupt(writer);
            frameSequence = 0;

          case 19:
            if (!iterator.valid()) {
              _context.next = 26;
              break;
            }

            _context.next = 22;
            return provider.xvizMessage(iterator);

          case 22:
            data = _context.sent;

            if (data) {
              _process["default"].stdout.write("Writing frame ".concat(frameSequence, "\r"));

              writer.writeMessage(frameSequence, data);
              frameSequence += 1;
            } else {
              console.log("No data for frame ".concat(frameSequence));
            }

            _context.next = 19;
            break;

          case 26:
            writer.close();

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _convertCmd.apply(this, arguments);
}

function setMetadataTimes(metadata, start, end) {
  if (start || end) {
    if (start) {
      var logInfo = metadata.log_info || {};
      logInfo.start_time = start;
    }

    if (end) {
      var _logInfo = metadata.log_info || {};

      _logInfo.end_time = end;
    }
  }
}

function signalWriteIndexOnInterrupt(writer) {
  _process["default"].on('SIGINT', function () {
    console.log('Aborting, writing index file.');
    writer.close();

    _process["default"].exit(0);
  });
}

function createDir(dirPath) {
  if (!_fs["default"].existsSync(dirPath)) {
    var parent = _path["default"].dirname(dirPath);

    createDir(parent);

    _fs["default"].mkdirSync(dirPath);
  }
}

function deleteDirRecursive(parentDir) {
  var files = _fs["default"].readdirSync(parentDir);

  files.forEach(function (file) {
    var currPath = _path["default"].join(parentDir, file);

    if (_fs["default"].lstatSync(currPath).isDirectory()) {
      deleteDirRecursive(currPath);
    } else {
      _fs["default"].unlinkSync(currPath);
    }
  });

  _fs["default"].rmdirSync(parentDir);
}
//# sourceMappingURL=convert.js.map
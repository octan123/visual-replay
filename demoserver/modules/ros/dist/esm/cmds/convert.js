import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZFormatWriter } from '@xviz/io';
import { FileSource, FileSink } from '@xviz/io/node';
import { XVIZProviderFactory } from '@xviz/io';
import { StartEndOptions } from './common';
import process from 'process';
import fs from 'fs';
import path from 'path';
export function convertArgs(inArgs) {
  var cmd = 'convert [-d output] <bag>';
  return inArgs.command(cmd, 'Convert a rosbag to xviz', _objectSpread(_objectSpread({}, StartEndOptions), {}, {
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
export function convertCmd(_x) {
  return _convertCmd.apply(this, arguments);
}

function _convertCmd() {
  _convertCmd = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(args) {
    var bag, directory, start, end, format, source, provider, sink, iterator, writer, md, frameSequence, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bag = args.bag, directory = args.directory, start = args.start, end = args.end, format = args.format;

            try {
              deleteDirRecursive(directory);
            } catch (err) {}

            createDir(directory);
            source = new FileSource(bag);
            _context.next = 6;
            return XVIZProviderFactory.open({
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
            sink = new FileSink(directory);
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
            writer = new XVIZFormatWriter(sink, {
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
              process.stdout.write("Writing frame ".concat(frameSequence, "\r"));
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
  process.on('SIGINT', function () {
    console.log('Aborting, writing index file.');
    writer.close();
    process.exit(0);
  });
}

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    var parent = path.dirname(dirPath);
    createDir(parent);
    fs.mkdirSync(dirPath);
  }
}

function deleteDirRecursive(parentDir) {
  var files = fs.readdirSync(parentDir);
  files.forEach(function (file) {
    var currPath = path.join(parentDir, file);

    if (fs.lstatSync(currPath).isDirectory()) {
      deleteDirRecursive(currPath);
    } else {
      fs.unlinkSync(currPath);
    }
  });
  fs.rmdirSync(parentDir);
}
//# sourceMappingURL=convert.js.map
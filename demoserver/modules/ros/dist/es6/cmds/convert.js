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
  const cmd = 'convert [-d output] <bag>';
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
      default: 'BINARY_GLB',
      choices: ['JSON_STRING', 'BINARY_GLB'],
      nargs: 1
    }
  }), convertCmd);
}
export async function convertCmd(args) {
  const {
    bag,
    directory,
    start,
    end,
    format
  } = args;

  try {
    deleteDirRecursive(directory);
  } catch (err) {}

  createDir(directory);
  const source = new FileSource(bag);
  const provider = await XVIZProviderFactory.open({
    options: _objectSpread({}, args),
    source,
    root: bag
  });

  if (!provider) {
    throw new Error('Failed to create ROSBagProvider');
  }

  const sink = new FileSink(directory);
  const iterator = provider.getMessageIterator({
    startTime: start,
    endTime: end
  });

  if (!iterator.valid()) {
    throw new Error('Error creating and iterator');
  }

  const writer = new XVIZFormatWriter(sink, {
    format
  });
  const md = provider.xvizMetadata();
  setMetadataTimes(md.message().data, start, end);
  writer.writeMetadata(md);
  signalWriteIndexOnInterrupt(writer);
  let frameSequence = 0;

  while (iterator.valid()) {
    const data = await provider.xvizMessage(iterator);

    if (data) {
      process.stdout.write("Writing frame ".concat(frameSequence, "\r"));
      writer.writeMessage(frameSequence, data);
      frameSequence += 1;
    } else {
      console.log("No data for frame ".concat(frameSequence));
    }
  }

  writer.close();
}

function setMetadataTimes(metadata, start, end) {
  if (start || end) {
    if (start) {
      const logInfo = metadata.log_info || {};
      logInfo.start_time = start;
    }

    if (end) {
      const logInfo = metadata.log_info || {};
      logInfo.end_time = end;
    }
  }
}

function signalWriteIndexOnInterrupt(writer) {
  process.on('SIGINT', () => {
    console.log('Aborting, writing index file.');
    writer.close();
    process.exit(0);
  });
}

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    const parent = path.dirname(dirPath);
    createDir(parent);
    fs.mkdirSync(dirPath);
  }
}

function deleteDirRecursive(parentDir) {
  const files = fs.readdirSync(parentDir);
  files.forEach(file => {
    const currPath = path.join(parentDir, file);

    if (fs.lstatSync(currPath).isDirectory()) {
      deleteDirRecursive(currPath);
    } else {
      fs.unlinkSync(currPath);
    }
  });
  fs.rmdirSync(parentDir);
}
//# sourceMappingURL=convert.js.map
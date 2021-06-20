import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { open, TimeUtil } from 'rosbag';
import { StartEndOptions } from './common';
export function bagdumpArgs(inArgs) {
  const cmd = 'bagdump <bag>';
  return inArgs.command(cmd, 'Display information about a ROS bag', _objectSpread(_objectSpread({}, StartEndOptions), {}, {
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
export async function bagdumpCmd(args) {
  const {
    bag: source,
    topic: mainTopic
  } = args;
  const bag = await open(source);

  if (args.dumpTime) {
    console.log("start_time: ".concat(TimeUtil.toDate(bag.startTime).getTime() / 1e3));
    console.log("end_time: ".concat(TimeUtil.toDate(bag.endTime).getTime() / 1e3));
  }

  if (args.dumpTopics) {
    const seen = [];

    for (const conn in bag.connections) {
      const {
        messageDefinition,
        topic,
        type
      } = bag.connections[conn];

      if (!seen[topic]) {
        seen[topic] = true;
        console.log(topic, type);

        if (args.dumpDefs) {
          console.log(messageDefinition);
        }
      }
    }
  }

  if (args.dumpMessages) {
    await bag.readMessages({}, ({
      topic,
      message
    }) => {
      if (!mainTopic || topic === mainTopic) {
        console.log(JSON.stringify(message, null, 2));
      }
    });
  }
}
//# sourceMappingURL=bagdump.js.map
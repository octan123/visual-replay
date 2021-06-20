import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import { open } from 'rosbag';
export function configArgs(inArgs) {
  var cmd = 'config <bag>';
  return inArgs.command(cmd, 'Extracts basic information and outputs a configuration for the XVIZROSProvider', {}, configCmd);
}
export function configCmd(_x) {
  return _configCmd.apply(this, arguments);
}

function _configCmd() {
  _configCmd = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(args) {
    var source, bag, seen, topics, conn, _bag$connections$conn, topic, type, config;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = args.bag;
            _context.next = 3;
            return open(source);

          case 3:
            bag = _context.sent;
            seen = [];
            topics = [];

            for (conn in bag.connections) {
              _bag$connections$conn = bag.connections[conn], topic = _bag$connections$conn.topic, type = _bag$connections$conn.type;

              if (!seen[topic]) {
                seen[topic] = true;
                topics.push({
                  topic: topic,
                  type: type
                });
              }
            }

            config = {
              topicConfig: topics
            };
            console.log(JSON.stringify(config, null, 2));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _configCmd.apply(this, arguments);
}
//# sourceMappingURL=config.js.map
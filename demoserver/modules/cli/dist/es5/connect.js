"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openSource = openSource;
exports.webSocketFromArgs = webSocketFromArgs;
exports.isLive = isLive;
exports.urlFromArgs = urlFromArgs;
exports.createWebSocket = createWebSocket;

var _middleware = require("./middleware");

var _websocket = require("./websocket");

var _core = require("./core");

var W3CWebSocket = require('websocket').w3cwebsocket;

function openSource(args, middlewares) {
  if (!isLive(args)) {
    middlewares.push(new _core.TransformLogFlow(null, args));
  }

  if (args.metadata) {
    middlewares.push(new _core.OnlyMetadata(null));
  }

  var socket = webSocketFromArgs(args);
  var stackedMiddleware = new _middleware.XVIZMiddlewareStack(middlewares);
  var client = new _websocket.WebSocketInterface({
    middleware: stackedMiddleware,
    socket: socket
  });

  for (var i = 0; i < middlewares.length; ++i) {
    var middleware = middlewares[i];

    if (middleware.client === null) {
      middleware.client = client;
    }
  }

  var sigintCount = 0;
  process.on('SIGINT', function () {
    if (sigintCount === 0) {
      console.log('Closing');
      socket.close();
    } else {
      console.log('Aborting');
      process.exit(1);
    }

    sigintCount++;
  });
  return client;
}

function webSocketFromArgs(args) {
  var url = urlFromArgs(args);
  return createWebSocket(url);
}

function isLive(args) {
  return args.log === undefined;
}

function urlFromArgs(args) {
  var extraArgs = isLive(args) ? 'session_type=live' : "log=".concat(args.log);
  var url = "".concat(args.host, "?version=2.0&").concat(extraArgs);
  return url;
}

function createWebSocket(url) {
  var client = new W3CWebSocket(url, null, null, null, null, {
    maxReceivedFrameSize: 64 * 1024 * 1024,
    maxReceivedMessageSize: 64 * 1024 * 1024
  });
  return client;
}
//# sourceMappingURL=connect.js.map
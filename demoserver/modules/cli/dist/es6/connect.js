import { XVIZMiddlewareStack } from './middleware';
import { WebSocketInterface } from './websocket';
import { TransformLogFlow, OnlyMetadata } from './core';

const W3CWebSocket = require('websocket').w3cwebsocket;

export function openSource(args, middlewares) {
  if (!isLive(args)) {
    middlewares.push(new TransformLogFlow(null, args));
  }

  if (args.metadata) {
    middlewares.push(new OnlyMetadata(null));
  }

  const socket = webSocketFromArgs(args);
  const stackedMiddleware = new XVIZMiddlewareStack(middlewares);
  const client = new WebSocketInterface({
    middleware: stackedMiddleware,
    socket
  });

  for (let i = 0; i < middlewares.length; ++i) {
    const middleware = middlewares[i];

    if (middleware.client === null) {
      middleware.client = client;
    }
  }

  let sigintCount = 0;
  process.on('SIGINT', () => {
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
export function webSocketFromArgs(args) {
  const url = urlFromArgs(args);
  return createWebSocket(url);
}
export function isLive(args) {
  return args.log === undefined;
}
export function urlFromArgs(args) {
  const extraArgs = isLive(args) ? 'session_type=live' : "log=".concat(args.log);
  const url = "".concat(args.host, "?version=2.0&").concat(extraArgs);
  return url;
}
export function createWebSocket(url) {
  const client = new W3CWebSocket(url, null, null, null, null, {
    maxReceivedFrameSize: 64 * 1024 * 1024,
    maxReceivedMessageSize: 64 * 1024 * 1024
  });
  return client;
}
//# sourceMappingURL=connect.js.map
export function loadUri(uri) {
  var rootFolder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

  var path = module.require('path');

  var fs = module.require('fs');

  if (uri.startsWith('http:') || uri.startsWith('https:')) {
    return Promise.reject(new Error('request based loading of URIs not implemented'));
  }

  if (uri.startsWith('data:')) {
    return Promise.resolve(parseDataUri(uri));
  }

  var filePath = path.join(rootFolder = '.', uri);
  return fs.readFileAsync(filePath).then(function (buffer) {
    return {
      buffer: buffer
    };
  });
}
export function parseDataUri(uri) {
  var dataIndex = uri.indexOf(',');
  var buffer;
  var mimeType;

  if (uri.slice(dataIndex - 7, dataIndex) === ';base64') {
    buffer = new Buffer(uri.slice(dataIndex + 1), 'base64');
    mimeType = uri.slice(5, dataIndex - 7).trim();
  } else {
    buffer = new Buffer(decodeURIComponent(uri.slice(dataIndex + 1)));
    mimeType = uri.slice(5, dataIndex).trim();
  }

  if (!mimeType) {
    mimeType = 'text/plain;charset=US-ASCII';
  } else if (mimeType[0] === ';') {
    mimeType = "text/plain".concat(mimeType);
  }

  return {
    buffer: buffer,
    mimeType: mimeType
  };
}
//# sourceMappingURL=load-uri.js.map
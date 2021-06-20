const mimeTypeMap = new Map([['image/png', getPngSize], ['image/jpeg', getJpegSize], ['image/gif', getGifSize], ['image/bmp', getBmpSize]]);
export function getImageSize(contents, mimeType) {
  const ERR_INVALID_TYPE = "Invalid MIME type. Supported MIME types are: ".concat(Array.from(mimeTypeMap.keys()).join(', '));

  if (mimeType) {
    const handler = mimeTypeMap.get(mimeType);

    if (!handler) {
      throw new Error(ERR_INVALID_TYPE);
    }

    const result = handler(contents);

    if (!result) {
      throw new Error("invalid image data for type: ".concat(mimeType));
    }

    return result;
  }

  for (const [supportedMimeType, handler] of mimeTypeMap.entries()) {
    const result = handler(contents);

    if (result) {
      result.mimeType = supportedMimeType;
      return result;
    }
  }

  throw new Error(ERR_INVALID_TYPE);
}

function getPngSize(contents) {
  if (contents.readUInt32BE(0) !== 0x89504e47) {
    return null;
  }

  const width = contents.readUInt32BE(16);
  const height = contents.readUInt32BE(20);
  return {
    width,
    height
  };
}

function getJpegSize(contents) {
  if (contents.readUInt16BE(0) !== 0xffd8) {
    return null;
  }

  const {
    tableMarkers,
    sofMarkers
  } = getJpegMarkers();
  let i = 2;

  while (i < contents.length) {
    const marker = contents.readUInt16BE(i);

    if (sofMarkers.has(marker)) {
      const height = contents.readUInt16BE(i + 5);
      const width = contents.readUInt16BE(i + 7);
      return {
        width,
        height
      };
    }

    if (!tableMarkers.has(marker)) {
      return null;
    }

    i += 2;
    i += contents.readUInt16BE(i);
  }

  return null;
}

function getJpegMarkers() {
  const tableMarkers = new Set([0xffdb, 0xffc4, 0xffcc, 0xffdd, 0xfffe]);

  for (let i = 0xffe0; i < 0xfff0; ++i) {
    tableMarkers.add(i);
  }

  const sofMarkers = new Set([0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf, 0xffde]);
  return {
    tableMarkers,
    sofMarkers
  };
}

function getGifSize(contents) {
  if (contents.readUInt32BE(0) !== 0x47494638) {
    return null;
  }

  const width = contents.readUInt16LE(6);
  const height = contents.readUInt16LE(8);
  return {
    width,
    height
  };
}

function getBmpSize(contents) {
  if (contents.readUInt16BE(0) !== 0x424d) {
    return null;
  }

  const width = contents.readUInt32LE(18);
  const height = contents.readUInt32LE(22);
  return {
    width,
    height
  };
}
//# sourceMappingURL=get-image-size.js.map
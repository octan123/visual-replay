function loadRawLidarData(uint8Array, pointSize) {
  var pointsCount = uint8Array.length / pointSize;
  var buf = Buffer.from(uint8Array);
  var positions = new Float32Array(3 * pointsCount);
  var reflectance = new Float32Array(pointsCount);

  for (var i = 0; i < pointsCount; i++) {
    positions[i * 3 + 0] = buf.readFloatLE(i * pointSize);
    positions[i * 3 + 1] = buf.readFloatLE(i * pointSize + 4);
    positions[i * 3 + 2] = buf.readFloatLE(i * pointSize + 8);
    reflectance[i] = buf.readFloatLE(i * pointSize + 16);
  }

  return {
    positions: positions,
    reflectance: reflectance
  };
}

function loadProcessedLidarData(uint8Array, pointSize) {
  var pointsCount = uint8Array.length / pointSize;
  var buf = Buffer.from(uint8Array);
  var positions = new Float32Array(3 * pointsCount);
  var reflectance = new Float32Array(pointsCount);

  for (var i = 0; i < pointsCount; i++) {
    positions[i * 3 + 0] = buf.readFloatLE(i * pointSize);
    positions[i * 3 + 1] = buf.readFloatLE(i * pointSize + 4);
    positions[i * 3 + 2] = buf.readFloatLE(i * pointSize + 8);
    reflectance[i] = buf.readFloatLE(i * pointSize + 12);
  }

  return {
    positions: positions,
    reflectance: reflectance
  };
}

module.exports = {
  loadRawLidarData: loadRawLidarData,
  loadProcessedLidarData: loadProcessedLidarData
};
//# sourceMappingURL=parse-lidar-points.js.map
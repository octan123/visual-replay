function loadRawLidarData(uint8Array, pointSize) {
  const pointsCount = uint8Array.length / pointSize;
  const buf = Buffer.from(uint8Array);
  const positions = new Float32Array(3 * pointsCount);
  const reflectance = new Float32Array(pointsCount);

  for (let i = 0; i < pointsCount; i++) {
    positions[i * 3 + 0] = buf.readFloatLE(i * pointSize);
    positions[i * 3 + 1] = buf.readFloatLE(i * pointSize + 4);
    positions[i * 3 + 2] = buf.readFloatLE(i * pointSize + 8);
    reflectance[i] = buf.readFloatLE(i * pointSize + 16);
  }

  return {
    positions,
    reflectance
  };
}

function loadProcessedLidarData(uint8Array, pointSize) {
  const pointsCount = uint8Array.length / pointSize;
  const buf = Buffer.from(uint8Array);
  const positions = new Float32Array(3 * pointsCount);
  const reflectance = new Float32Array(pointsCount);

  for (let i = 0; i < pointsCount; i++) {
    positions[i * 3 + 0] = buf.readFloatLE(i * pointSize);
    positions[i * 3 + 1] = buf.readFloatLE(i * pointSize + 4);
    positions[i * 3 + 2] = buf.readFloatLE(i * pointSize + 8);
    reflectance[i] = buf.readFloatLE(i * pointSize + 12);
  }

  return {
    positions,
    reflectance
  };
}

module.exports = {
  loadRawLidarData,
  loadProcessedLidarData
};
//# sourceMappingURL=parse-lidar-points.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n#define SHADER_NAME imagery-layer-vertex-shader\n\nattribute vec2 texCoords;\n\nuniform bool hasHeightMap;\nuniform sampler2D heightMapTexture;\nuniform vec4 heightMapBounds;\nuniform vec2 heightRange;\nuniform vec4 imageryBounds;\n\nvarying vec2 vTexCoord;\n\n// HACK/ib - Expose vWorldHeight to enable derivatives in fragment shader\nvarying float vWorldHeight;\n\nvec2 getUV(vec4 bounds, vec2 coords) {\n  return vec2(\n    (coords.x - bounds[0]) / (bounds[2] - bounds[0]),\n    (coords.y - bounds[1]) / (bounds[3] - bounds[1])\n  );\n}\n\nvoid main(void) {\n  // Calculate vertex position\n  vec2 position = vec2(\n    mix(imageryBounds[0], imageryBounds[2], texCoords.x),\n    mix(imageryBounds[1], imageryBounds[3], texCoords.y)\n  );\n\n  float z = 0.0;\n  // Handle heightMap if provided\n  if (hasHeightMap) {\n    vec4 heightMapColor = texture2D(heightMapTexture, getUV(heightMapBounds, position));\n    float relativeHeight = heightMapColor.b;\n    z = mix(heightRange[0], heightRange[1], relativeHeight);\n  }\n\n  vWorldHeight = z;\n  vTexCoord = texCoords;\n\n  gl_Position = project_position_to_clipspace(vec3(position, z), vec3(0.0), vec3(0.0));\n\n  picking_setPickingColor(vec3(0., 0., 1.));\n}\n";
exports["default"] = _default;
//# sourceMappingURL=imagery-layer-vertex.js.map
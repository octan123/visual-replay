"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n#define SHADER_NAME traffic-light-layer-fs\n\n#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform bool useInstanceColor;\nuniform sampler2D lightShapeTexture;\n\nvarying vec4 vColor;\nvarying vec2 vTexCoord;\n\nvoid main(void) {\n  if (useInstanceColor) {\n    vec4 mask = texture2D(lightShapeTexture, vTexCoord);\n    gl_FragColor = vec4(vColor.rgb * mask.rgb, vColor.a);\n  } else {\n    gl_FragColor = vColor;\n  }\n\n  // use highlight color if this fragment belongs to the selected object.\n  gl_FragColor = picking_filterHighlightColor(gl_FragColor);\n\n  // use picking color if rendering to picking FBO.\n  gl_FragColor = picking_filterPickingColor(gl_FragColor);\n}\n";
exports["default"] = _default;
//# sourceMappingURL=traffic-light-layer-fragment.glsl.js.map
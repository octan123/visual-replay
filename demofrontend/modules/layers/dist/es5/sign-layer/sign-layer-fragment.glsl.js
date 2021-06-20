"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "#define SHADER_NAME sign-layer-fragment-shader\n\nprecision highp float;\n\nuniform float render3D;\nuniform float opacity;\nuniform sampler2D iconsTexture;\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\n\nconst float MIN_ALPHA = 0.05;\n\nvoid main(void) {\n  vec4 texColor = texture2D(iconsTexture, vTextureCoords);\n\n  // front of the sign, uses pixel color from the texture\n  // back of the sign uses texture as transparency mask\n  vec3 color = render3D < 0.5 || gl_FrontFacing ? texColor.rgb : vColor.rgb;\n  float a = texColor.a * opacity;\n\n  if (a < MIN_ALPHA) {\n    discard;\n  }\n\n  gl_FragColor = vec4(color, a);\n\n  gl_FragColor = picking_filterHighlightColor(gl_FragColor);\n\n  gl_FragColor = picking_filterPickingColor(gl_FragColor);\n}\n";
exports["default"] = _default;
//# sourceMappingURL=sign-layer-fragment.glsl.js.map
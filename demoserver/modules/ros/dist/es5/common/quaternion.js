"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quaternionToEuler = quaternionToEuler;

function quaternionToEuler(_ref) {
  var w = _ref.w,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z;
  var ysqr = y * y;
  var t0 = -2.0 * (ysqr + z * z) + 1.0;
  var t1 = +2.0 * (x * y + w * z);
  var t2 = -2.0 * (x * z - w * y);
  var t3 = +2.0 * (y * z + w * x);
  var t4 = -2.0 * (x * x + ysqr) + 1.0;
  t2 = t2 > 1.0 ? 1.0 : t2;
  t2 = t2 < -1.0 ? -1.0 : t2;
  var ans = {};
  ans.pitch = Math.asin(t2);
  ans.roll = Math.atan2(t3, t4);
  ans.yaw = Math.atan2(t1, t0);
  return ans;
}
//# sourceMappingURL=quaternion.js.map
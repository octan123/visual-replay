"use strict";

if (typeof TextDecoder === 'undefined') {
  require('fast-text-encoding');
}

module.exports = {
  TextEncoder: TextEncoder,
  TextDecoder: TextDecoder
};
//# sourceMappingURL=text-encoding.js.map
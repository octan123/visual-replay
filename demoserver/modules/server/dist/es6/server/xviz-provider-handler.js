import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { default as path } from 'path';
import { XVIZProviderSession } from './xviz-provider-session';
import { FileSource } from '@xviz/io/node';
export class XVIZProviderHandler {
  constructor(factory, options) {
    this.factory = factory;
    this.options = options;
    this.sessionCount = 0;
  }

  async newSession(socket, req) {
    let provider = null;
    const dirs = Array.isArray(this.options.d) ? this.options.d : [this.options.d];

    for (let i = 0; i < dirs.length; i++) {
      const root = path.join(dirs[i], req.path);
      const source = new FileSource(root);
      provider = await this.factory.open({
        source,
        options: _objectSpread(_objectSpread({}, req.params), {}, {
          logger: this.options.logger
        }),
        root
      });

      if (provider) {
        break;
      }
    }

    if (provider) {
      return new XVIZProviderSession(socket, req, provider, _objectSpread(_objectSpread({}, this.options), {}, {
        id: this.sessionCount++
      }));
    }

    return null;
  }

}
//# sourceMappingURL=xviz-provider-handler.js.map
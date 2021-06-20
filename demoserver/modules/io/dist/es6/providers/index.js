import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { XVIZJSONProvider } from './xviz-json-provider';
import { XVIZBinaryProvider } from './xviz-binary-provider';
import { XVIZProtobufProvider } from './xviz-protobuf-provider';

async function createXVIZProvider(ProviderClass, args) {
  let provider = null;
  provider = new ProviderClass(args);
  await provider.init();

  if (provider.valid()) {
    return provider;
  }

  return null;
}

export class XVIZProviderFactoryClass {
  constructor() {
    this.providerClasses = [{
      className: XVIZJSONProvider
    }, {
      className: XVIZBinaryProvider
    }, {
      className: XVIZProtobufProvider
    }];
  }

  addProviderClass(className, args) {
    this.providerClasses.push({
      className,
      args
    });
  }

  async open(args) {
    for (const providerEntry of this.providerClasses) {
      const options = _objectSpread(_objectSpread({}, args.options), providerEntry.args);

      const loader = await createXVIZProvider(providerEntry.className, _objectSpread(_objectSpread({}, args), {}, {
        options
      }));

      if (loader) {
        return loader;
      }
    }

    return null;
  }

}
export const XVIZProviderFactory = new XVIZProviderFactoryClass();
//# sourceMappingURL=index.js.map
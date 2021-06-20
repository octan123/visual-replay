import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { default as path } from 'path';
import { XVIZProviderSession } from './xviz-provider-session';
import { FileSource } from '@xviz/io/node';
export var XVIZProviderHandler = function () {
  function XVIZProviderHandler(factory, options) {
    _classCallCheck(this, XVIZProviderHandler);

    this.factory = factory;
    this.options = options;
    this.sessionCount = 0;
  }

  _createClass(XVIZProviderHandler, [{
    key: "newSession",
    value: function () {
      var _newSession = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(socket, req) {
        var provider, dirs, i, root, source;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                provider = null;
                dirs = Array.isArray(this.options.d) ? this.options.d : [this.options.d];
                i = 0;

              case 3:
                if (!(i < dirs.length)) {
                  _context.next = 14;
                  break;
                }

                root = path.join(dirs[i], req.path);
                source = new FileSource(root);
                _context.next = 8;
                return this.factory.open({
                  source: source,
                  options: _objectSpread(_objectSpread({}, req.params), {}, {
                    logger: this.options.logger
                  }),
                  root: root
                });

              case 8:
                provider = _context.sent;

                if (!provider) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("break", 14);

              case 11:
                i++;
                _context.next = 3;
                break;

              case 14:
                if (!provider) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", new XVIZProviderSession(socket, req, provider, _objectSpread(_objectSpread({}, this.options), {}, {
                  id: this.sessionCount++
                })));

              case 16:
                return _context.abrupt("return", null);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function newSession(_x, _x2) {
        return _newSession.apply(this, arguments);
      }

      return newSession;
    }()
  }]);

  return XVIZProviderHandler;
}();
//# sourceMappingURL=xviz-provider-handler.js.map
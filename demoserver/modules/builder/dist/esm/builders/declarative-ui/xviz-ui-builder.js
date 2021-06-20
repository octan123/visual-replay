import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import XVIZPanelBuilder from './xviz-panel-builder';
import XVIZContainerBuilder from './xviz-container-builder';
import XVIZMetricBuilder from './xviz-metric-builder';
import XVIZPlotBuilder from './xviz-plot-builder';
import XVIZSelectBuilder from './xviz-select-builder';
import XVIZTableBuilder from './xviz-table-builder';
import XVIZTreeTableBuilder from './xviz-tree-table-builder';
import XVIZVideoBuilder from './xviz-video-builder';
import { snakeToCamel } from './utils';
var defaultValidateWarn = console.warn;
var defaultValidateError = console.error;
var UI_BUILDER_MAP = {
  panel: XVIZPanelBuilder,
  container: XVIZContainerBuilder,
  metric: XVIZMetricBuilder,
  plot: XVIZPlotBuilder,
  select: XVIZSelectBuilder,
  table: XVIZTableBuilder,
  treetable: XVIZTreeTableBuilder,
  video: XVIZVideoBuilder
};

var XVIZUIBuilder = function () {
  function XVIZUIBuilder() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZUIBuilder);

    this._validateWarn = options.validateWarn || defaultValidateWarn;
    this._validateError = options.validateError || defaultValidateError;
    this._children = [];
    Object.keys(UI_BUILDER_MAP).map(function (type) {
      var camelType = snakeToCamel(type);

      _this[camelType] = function (props) {
        return _this._createUIBuilder(type, props);
      };
    });
  }

  _createClass(XVIZUIBuilder, [{
    key: "getUI",
    value: function getUI() {
      return this._children.reduce(function (ui, child) {
        var childConfig = child.getUI();
        ui[childConfig.name] = childConfig;
        return ui;
      }, {});
    }
  }, {
    key: "child",
    value: function child(_child) {
      if (!(_child instanceof XVIZPanelBuilder)) {
        this._validateError('Top level UI element should be `Panel`');
      }

      this._children.push(_child);

      return _child;
    }
  }, {
    key: "_createUIBuilder",
    value: function _createUIBuilder(type, props) {
      return new UI_BUILDER_MAP[type](_objectSpread(_objectSpread({}, props), {}, {
        validateWarn: this._validateWarn,
        validateError: this._validateError,
        root: this
      }));
    }
  }]);

  return XVIZUIBuilder;
}();

export { XVIZUIBuilder as default };
//# sourceMappingURL=xviz-ui-builder.js.map
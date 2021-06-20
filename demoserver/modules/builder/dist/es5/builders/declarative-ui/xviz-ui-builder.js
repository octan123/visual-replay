"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizPanelBuilder = _interopRequireDefault(require("./xviz-panel-builder"));

var _xvizContainerBuilder = _interopRequireDefault(require("./xviz-container-builder"));

var _xvizMetricBuilder = _interopRequireDefault(require("./xviz-metric-builder"));

var _xvizPlotBuilder = _interopRequireDefault(require("./xviz-plot-builder"));

var _xvizSelectBuilder = _interopRequireDefault(require("./xviz-select-builder"));

var _xvizTableBuilder = _interopRequireDefault(require("./xviz-table-builder"));

var _xvizTreeTableBuilder = _interopRequireDefault(require("./xviz-tree-table-builder"));

var _xvizVideoBuilder = _interopRequireDefault(require("./xviz-video-builder"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultValidateWarn = console.warn;
var defaultValidateError = console.error;
var UI_BUILDER_MAP = {
  panel: _xvizPanelBuilder["default"],
  container: _xvizContainerBuilder["default"],
  metric: _xvizMetricBuilder["default"],
  plot: _xvizPlotBuilder["default"],
  select: _xvizSelectBuilder["default"],
  table: _xvizTableBuilder["default"],
  treetable: _xvizTreeTableBuilder["default"],
  video: _xvizVideoBuilder["default"]
};

var XVIZUIBuilder = function () {
  function XVIZUIBuilder() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, XVIZUIBuilder);
    this._validateWarn = options.validateWarn || defaultValidateWarn;
    this._validateError = options.validateError || defaultValidateError;
    this._children = [];
    Object.keys(UI_BUILDER_MAP).map(function (type) {
      var camelType = (0, _utils.snakeToCamel)(type);

      _this[camelType] = function (props) {
        return _this._createUIBuilder(type, props);
      };
    });
  }

  (0, _createClass2["default"])(XVIZUIBuilder, [{
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
      if (!(_child instanceof _xvizPanelBuilder["default"])) {
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

exports["default"] = XVIZUIBuilder;
//# sourceMappingURL=xviz-ui-builder.js.map
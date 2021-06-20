import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import { clamp } from 'math.gl';
import BaseWidget from './base-widget';
var GuageArc = styled.path(function (props) {
  return _objectSpread({
    stroke: props.theme.controlColorDisabled,
    strokeCap: 'round'
  }, evaluateStyle(props.userStyle, props));
});
var ZeroMarker = styled.circle(function (props) {
  return _objectSpread({
    fill: props.theme.textColorPrimary
  }, evaluateStyle(props.userStyle, props));
});
var CmdMarker = styled.path(function (props) {
  return _objectSpread({
    fill: props.theme.controlColorActive
  }, evaluateStyle(props.userStyle, props));
});
var GuageHand = styled.line(function (props) {
  return _objectSpread({
    stroke: props.theme.textColorPrimary,
    strokeCap: 'round',
    strokeWidth: 2
  }, evaluateStyle(props.userStyle, props));
});
var CmdValue = styled.div(function (props) {
  return _objectSpread({
    textAlign: 'right',
    flex: 1,
    padding: props.theme.spacingTiny,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: props.theme.controlColorDisabled,
    color: props.warning ? props.theme.textColorWarning : props.theme.textColorPrimary,
    fontSize: props.theme.fontSize * 2,
    lineHeight: '1em'
  }, evaluateStyle(props.userStyle, props));
});
var MsrValue = styled.div(function (props) {
  return _objectSpread({
    textAlign: props.isOnlyValue ? 'center' : 'left',
    flex: 1,
    padding: props.theme.spacingTiny,
    fontSize: props.theme.fontSize * 2,
    color: props.warning ? props.theme.textColorWarning : props.theme.textColorPrimary,
    lineHeight: '1em'
  }, evaluateStyle(props.userStyle, props));
});
var LabelComponent = styled.div(function (props) {
  return _objectSpread({
    fontSize: props.theme.fontSize,
    color: props.theme.textColorSecondary,
    lineHeight: '1em'
  }, evaluateStyle(props.userStyle, props));
});
var UnitsComponent = styled.div(function (props) {
  return _objectSpread({
    textAlign: 'center',
    fontSize: props.theme.fontSize * 0.9,
    color: props.theme.textColorSecondary
  }, evaluateStyle(props.userStyle, props));
});
var Warning = styled.span(function (props) {
  return _objectSpread({
    position: 'absolute',
    marginLeft: props.theme.spacingTiny,
    fontSize: props.theme.fontSize * 0.9,
    lineHeight: '1em',
    padding: props.theme.spacingTiny,
    borderRadius: 2,
    background: props.theme.warning400,
    color: props.theme.textColorInvert
  }, evaluateStyle(props.userStyle, props));
});

function getTransform(centerX, centerY, angle) {
  return "translate(".concat(centerX, " ").concat(centerY, ") rotate(").concat(angle, ") translate(").concat(-centerX, " ").concat(-centerY, ")");
}

function formatValue(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var transformValue = arguments.length > 2 ? arguments[2] : undefined;

  if (!Number.isFinite(value)) {
    return '';
  }

  value = transformValue(value);
  var digits = value ? Math.max(1, Math.floor(Math.log10(Math.abs(value)) + 1)) : 1;
  return "".concat(value.toFixed(Math.max(0, precision - digits)));
}

var MeterWidget = function (_PureComponent) {
  _inherits(MeterWidget, _PureComponent);

  var _super = _createSuper(MeterWidget);

  function MeterWidget() {
    var _this;

    _classCallCheck(this, MeterWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_render", function (_ref) {
      var theme = _ref.theme,
          streams = _ref.streams;
      return React.createElement("div", null, _this._renderGauge(streams.cmd, streams.msr, theme), _this._renderMetric(streams.cmd, streams.msr, theme));
    });

    return _this;
  }

  _createClass(MeterWidget, [{
    key: "_renderGauge",
    value: function _renderGauge(cmdData, msrData, theme) {
      var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max,
          transformValue = _this$props.transformValue,
          style = _this$props.style;
      var _style$arcRadius = style.arcRadius,
          r = _style$arcRadius === void 0 ? 50 : _style$arcRadius,
          _style$arcWidth = style.arcWidth,
          w = _style$arcWidth === void 0 ? 8 : _style$arcWidth;
      var padding = 8;

      if (r <= w / 2) {
        return null;
      }

      var cmdValue = transformValue(cmdData && cmdData.data && cmdData.data.variable || 0);
      var msrValue = transformValue(msrData.data && msrData.data.variable || 0);
      var msr = clamp((msrValue - min) / (max - min), 0, 1);
      var cmd = clamp((cmdValue - min) / (max - min), 0, 1);
      var zero = clamp((0 - min) / (max - min), 0, 1);
      var msrTransform = getTransform(r + padding, r + padding, msr * 180 - 90);
      var cmdTransform = getTransform(r + padding, r + padding, cmd * 180 - 90);
      var zeroTransform = getTransform(r + padding, r + padding, zero * 180 - 90);
      return React.createElement("svg", {
        width: (r + padding) * 2,
        height: r + padding * 2
      }, React.createElement(GuageArc, {
        d: "M ".concat(padding + w / 2, " ").concat(r + padding, " a ").concat(r - w / 2, " ").concat(r - w / 2, " 1 1 1 ").concat(r * 2 - w, " 0"),
        fill: "none",
        strokeWidth: w,
        theme: theme,
        userStyle: style.arc
      }), React.createElement("g", {
        transform: zeroTransform
      }, React.createElement(ZeroMarker, {
        cx: r + padding,
        cy: padding - 4,
        r: 2,
        theme: theme,
        userStyle: style.zeroMarker
      })), cmdData && React.createElement("g", {
        transform: cmdTransform
      }, React.createElement(CmdMarker, {
        transform: "translate(".concat(r + padding, " ").concat(padding, ")"),
        d: "M0,".concat(w, " L").concat(-w / 2, ",0 L").concat(w / 2, ",0z"),
        theme: theme,
        userStyle: style.cmdMarker
      })), msrData && React.createElement("g", {
        transform: msrTransform
      }, React.createElement(GuageHand, {
        x1: r + padding,
        y1: r + padding,
        x2: r + padding,
        y2: padding + w + 4,
        theme: theme,
        userStyle: style.hand
      })));
    }
  }, {
    key: "_renderMetric",
    value: function _renderMetric(cmdData, msrData, theme) {
      var _this$props2 = this.props,
          label = _this$props2.label,
          _this$props2$units = _this$props2.units,
          units = _this$props2$units === void 0 ? msrData.units : _this$props2$units,
          transformValue = _this$props2.transformValue,
          precision = _this$props2.precision,
          getWarning = _this$props2.getWarning,
          style = _this$props2.style;
      var cmdValue = cmdData && cmdData.data && cmdData.data.variable;
      var msrValue = msrData.data && msrData.data.variable;
      var cmdWarning = getWarning(cmdValue);
      var msrWarning = getWarning(msrValue);
      return React.createElement("div", null, React.createElement("div", {
        style: {
          display: 'flex'
        }
      }, cmdData && React.createElement(CmdValue, {
        theme: theme,
        warning: cmdWarning,
        userStyle: style.cmdValue
      }, React.createElement(LabelComponent, {
        theme: theme,
        warning: cmdWarning,
        userStyle: style.label
      }, "Cmd."), React.createElement("div", null, formatValue(cmdValue, precision, transformValue) || '-')), React.createElement(MsrValue, {
        theme: theme,
        warning: msrWarning,
        isOnlyValue: !cmdData,
        userStyle: style.msrValue
      }, React.createElement(LabelComponent, {
        theme: theme,
        warning: msrWarning,
        userStyle: style.label
      }, label), React.createElement("div", null, formatValue(msrValue, precision, transformValue) || '-'))), React.createElement(UnitsComponent, {
        theme: theme,
        userStyle: style.units
      }, units, (cmdWarning || msrWarning) && React.createElement(Warning, {
        theme: theme,
        userStyle: style.warning
      }, cmdWarning || msrWarning)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          log = _this$props3.log,
          style = _this$props3.style,
          cmdStreamName = _this$props3.cmdStreamName,
          streamName = _this$props3.streamName;
      return React.createElement(BaseWidget, {
        log: log,
        style: style,
        streamNames: {
          cmd: cmdStreamName,
          msr: streamName
        }
      }, this._render);
    }
  }]);

  return MeterWidget;
}(PureComponent);

_defineProperty(MeterWidget, "propTypes", {
  log: PropTypes.object.isRequired,
  style: PropTypes.object,
  precision: PropTypes.number,
  units: PropTypes.string,
  cmdStreamName: PropTypes.string,
  streamName: PropTypes.string.isRequired,
  label: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  transformValue: PropTypes.func,
  getWarning: PropTypes.func
});

_defineProperty(MeterWidget, "defaultProps", {
  precision: 3,
  style: {},
  transformValue: function transformValue(x) {
    return x;
  },
  getWarning: function getWarning(_) {
    return null;
  }
});

export { MeterWidget as default };
//# sourceMappingURL=meter-widget.js.map
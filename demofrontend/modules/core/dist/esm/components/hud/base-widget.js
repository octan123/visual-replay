import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
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
import { evaluateStyle, withTheme } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import connectToLog from '../connect';
var WrapperComponent = styled.div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    padding: props.theme.spacingSmall,
    display: 'inline-block'
  }, evaluateStyle(props.userStyle, props));
});

var BaseWidget = function (_PureComponent) {
  _inherits(BaseWidget, _PureComponent);

  var _super = _createSuper(BaseWidget);

  function BaseWidget(props) {
    var _this;

    _classCallCheck(this, BaseWidget);

    _this = _super.call(this, props);
    _this.state = {
      streams: _this._extractStreams(props)
    };
    return _this;
  }

  _createClass(BaseWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.streamNames !== this.props.streamNames || nextProps.streamsMetadata !== this.props.streamsMetadata || nextProps.frame !== this.props.frame) {
        this.setState({
          streams: this._extractStreams(nextProps)
        });
      }
    }
  }, {
    key: "_extractStreams",
    value: function _extractStreams(_ref) {
      var streamNames = _ref.streamNames,
          streamsMetadata = _ref.streamsMetadata,
          frame = _ref.frame;
      var result = {};

      for (var key in streamNames) {
        var streamName = streamNames[key];

        if (streamName) {
          result[key] = _objectSpread(_objectSpread({}, streamsMetadata[streamName]), {}, {
            data: frame && frame.streams[streamName]
          });
        }
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          children = _this$props.children;
      var streams = this.state.streams;
      return React.createElement(WrapperComponent, {
        theme: theme,
        userStyle: style.wrapper
      }, children({
        theme: theme,
        streams: streams
      }));
    }
  }]);

  return BaseWidget;
}(PureComponent);

_defineProperty(BaseWidget, "propTypes", {
  style: PropTypes.object,
  streamNames: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  streamsMetadata: PropTypes.object,
  frame: PropTypes.object
});

_defineProperty(BaseWidget, "defaultProps", {
  style: {}
});

var getLogState = function getLogState(log) {
  return {
    streamsMetadata: log.getStreamsMetadata(),
    frame: log.getCurrentFrame()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: withTheme(BaseWidget)
});
//# sourceMappingURL=base-widget.js.map
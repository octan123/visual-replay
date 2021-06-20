import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setObjectState } from '../../utils/object-state';
import Core3DViewer from './core-3d-viewer';
import HoverTooltip from './hover-tooltip';
import connectToLog from '../connect';
import { DEFAULT_VIEW_STATE } from '../../constants';

var noop = function noop() {};

var preventDefault = function preventDefault(evt) {
  return evt.preventDefault();
};

var LogViewer = function (_PureComponent) {
  _inherits(LogViewer, _PureComponent);

  var _super = _createSuper(LogViewer);

  function LogViewer(props) {
    var _this;

    _classCallCheck(this, LogViewer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onViewStateChange", function (_ref) {
      var viewState = _ref.viewState,
          viewOffset = _ref.viewOffset;

      _this.setState({
        viewState: viewState,
        viewOffset: viewOffset
      });

      _this.props.onViewStateChange({
        viewState: viewState,
        viewOffset: viewOffset
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onHoverObject", function (info, evt) {
      if (_this.props.showTooltip && info && info.object) {
        _this.setState({
          hoverInfo: info
        });
      } else if (_this.state.hoverInfo) {
        _this.setState({
          hoverInfo: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClickObject", function (info, evt) {
      _this.props.onClick(info, evt);

      var objectId = info && info.object && info.object.id;

      if (objectId && !_this.props.onSelectObject(info, evt)) {
        var objectStates = _this.state.objectStates;
        var isObjectSelected = objectStates.selected && objectStates.selected[objectId];
        objectStates = setObjectState(objectStates, {
          stateName: 'selected',
          id: objectId,
          value: !isObjectSelected
        });

        _this.setState({
          objectStates: objectStates
        });

        _this.props.onObjectStateChange(objectStates);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onContextMenu", function (info, evt) {
      _this.props.onContextMenu(info, evt);
    });

    _this.state = {
      viewState: _objectSpread(_objectSpread({
        width: 1,
        height: 1,
        longitude: 0,
        latitude: 0
      }, DEFAULT_VIEW_STATE), props.viewMode.initialViewState),
      viewOffset: {
        x: 0,
        y: 0,
        bearing: 0
      },
      objectStates: {},
      hoverInfo: null
    };
    return _this;
  }

  _createClass(LogViewer, [{
    key: "_renderTooltip",
    value: function _renderTooltip() {
      var _this$props = this.props,
          showTooltip = _this$props.showTooltip,
          style = _this$props.style,
          renderTooltip = _this$props.renderTooltip;
      var hoverInfo = this.state.hoverInfo;
      return showTooltip && hoverInfo && React.createElement(HoverTooltip, {
        info: hoverInfo,
        style: style.tooltip,
        renderContent: renderTooltip
      });
    }
  }, {
    key: "render",
    value: function render() {
      var viewState = this.props.viewState || this.state.viewState;
      var viewOffset = this.props.viewOffset || this.state.viewOffset;
      var objectStates = this.props.objectStates || this.state.objectStates;
      return React.createElement("div", {
        onContextMenu: preventDefault
      }, React.createElement(Core3DViewer, _extends({}, this.props, {
        onViewStateChange: this._onViewStateChange,
        onClick: this._onClickObject,
        onHover: this._onHoverObject,
        onContextMenu: this._onContextMenu,
        viewState: viewState,
        viewOffset: viewOffset,
        objectStates: objectStates
      }), this._renderTooltip()));
    }
  }]);

  return LogViewer;
}(PureComponent);

_defineProperty(LogViewer, "propTypes", _objectSpread(_objectSpread({}, Core3DViewer.propTypes), {}, {
  renderTooltip: PropTypes.func,
  style: PropTypes.object,
  onSelectObject: PropTypes.func,
  onContextMenu: PropTypes.func,
  onViewStateChange: PropTypes.func,
  onObjectStateChange: PropTypes.func,
  viewState: PropTypes.object,
  viewOffset: PropTypes.object,
  objectStates: PropTypes.object
}));

_defineProperty(LogViewer, "defaultProps", _objectSpread(_objectSpread({}, Core3DViewer.defaultProps), {}, {
  style: {},
  onViewStateChange: noop,
  onObjectStateChange: noop,
  onSelectObject: noop,
  onContextMenu: noop,
  getTransformMatrix: function getTransformMatrix(streamName, context) {
    return null;
  }
}));

var getLogState = function getLogState(log) {
  return {
    frame: log.getCurrentFrame(),
    metadata: log.getMetadata(),
    streamsMetadata: log.getStreamsMetadata()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: LogViewer
});
//# sourceMappingURL=index.js.map
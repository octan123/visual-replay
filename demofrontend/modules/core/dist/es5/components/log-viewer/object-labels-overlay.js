"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _perspectivePopup = _interopRequireDefault(require("./perspective-popup"));

var _transform = require("../../utils/transform");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var renderDefaultObjectLabel = function renderDefaultObjectLabel(_ref) {
  var id = _ref.id,
      isSelected = _ref.isSelected;
  return isSelected && _react["default"].createElement("div", null, "ID: ", id);
};

var ObjectLabelsOverlay = function (_PureComponent) {
  (0, _inherits2["default"])(ObjectLabelsOverlay, _PureComponent);

  var _super = _createSuper(ObjectLabelsOverlay);

  function ObjectLabelsOverlay(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ObjectLabelsOverlay);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderPerspectivePopup", function (object) {
      var _this$props = _this.props,
          objectSelection = _this$props.objectSelection,
          xvizStyleParser = _this$props.xvizStyleParser,
          style = _this$props.style,
          renderObjectLabel = _this$props.renderObjectLabel;
      var isSelected = Boolean(objectSelection[object.id]);
      var styleProps = {
        id: object.id,
        isSelected: isSelected,
        object: object,
        xvizStyles: xvizStyleParser
      };
      var labelContent = renderObjectLabel(styleProps);

      if (!labelContent) {
        return null;
      }

      var trackingPoint;
      var objectHeight;

      var _iterator = _createForOfIteratorHelper(object.streamNames),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var streamName = _step.value;
          var feature = object.getFeature(streamName);

          if (!trackingPoint && (feature.center || feature.vertices)) {
            trackingPoint = (0, _transform.positionToLngLat)(object.position, _this._getCoordinateProps(streamName));
          }

          if (!objectHeight && feature.vertices) {
            objectHeight = xvizStyleParser.getStylesheet(streamName).getProperty('height', feature);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      trackingPoint[2] += objectHeight || 0;
      return _react["default"].createElement(_perspectivePopup["default"], {
        key: object.id,
        longitude: trackingPoint[0],
        latitude: trackingPoint[1],
        altitude: trackingPoint[2],
        anchor: "bottom-left",
        dynamicPosition: true,
        styleProps: styleProps,
        style: style,
        sortByDepth: true,
        closeButton: false,
        closeOnClick: false
      }, labelContent);
    });
    _this.state = {
      coordinateProps: {}
    };
    return _this;
  }

  (0, _createClass2["default"])(ObjectLabelsOverlay, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var frame = nextProps.frame;

      if (frame && frame !== this.props.frame) {
        this.setState({
          coordinateProps: {}
        });
      }
    }
  }, {
    key: "_getCoordinateProps",
    value: function _getCoordinateProps(streamName) {
      var coordinateProps = this.state.coordinateProps;
      var result = coordinateProps[streamName];

      if (result) {
        return result;
      }

      var _this$props2 = this.props,
          frame = _this$props2.frame,
          streamsMetadata = _this$props2.streamsMetadata,
          getTransformMatrix = _this$props2.getTransformMatrix;
      result = (0, _transform.resolveCoordinateTransform)(frame, streamName, streamsMetadata[streamName], getTransformMatrix);
      coordinateProps[streamName] = result;
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          frame = _this$props3.frame,
          renderObjectLabel = _this$props3.renderObjectLabel;

      if (!frame || !renderObjectLabel) {
        return null;
      }

      return Object.values(frame.objects).map(this._renderPerspectivePopup);
    }
  }]);
  return ObjectLabelsOverlay;
}(_react.PureComponent);

exports["default"] = ObjectLabelsOverlay;
(0, _defineProperty2["default"])(ObjectLabelsOverlay, "propTypes", {
  objectSelection: _propTypes["default"].object,
  frame: _propTypes["default"].object,
  streamsMetadata: _propTypes["default"].object,
  xvizStyleParser: _propTypes["default"].object,
  renderObjectLabel: _propTypes["default"].func,
  style: _propTypes["default"].object,
  getTransformMatrix: _propTypes["default"].func
});
(0, _defineProperty2["default"])(ObjectLabelsOverlay, "defaultProps", {
  objectSelection: {},
  renderObjectLabel: renderDefaultObjectLabel,
  style: {}
});
//# sourceMappingURL=object-labels-overlay.js.map
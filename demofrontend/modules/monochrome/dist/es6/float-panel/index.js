import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Draggable from '../shared/draggable';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../shared/theme';
export const Container = styled.div(props => _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
  position: 'absolute',
  boxSizing: 'content-box',
  boxShadow: props.theme.shadow,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: props.isMoving || props.isResizing ? props.theme.controlColorActive : props.theme.backgroundAlt
}, evaluateStyle(props.userStyle, props)));
export const ContentComponent = styled.div(props => _objectSpread({
  overflow: 'hidden',
  lineHeight: 0,
  boxSizing: 'content-box',
  position: 'relative'
}, evaluateStyle(props.userStyle, props)));
export const TitleComponent = styled.div(props => _objectSpread({
  background: props.isMoving || props.isResizing ? props.theme.controlColorActive : props.theme.backgroundAlt,
  color: props.isMoving || props.isResizing ? props.theme.textColorInvert : props.theme.textColorPrimary,
  textAlign: 'center',
  fontWeight: 'bold',
  lineHeight: 2
}, evaluateStyle(props.userStyle, props)));
export const Resizer = styled.div(props => ({
  position: 'absolute',
  width: 12,
  height: 12,
  right: 0,
  bottom: 0,
  zIndex: 1
}));

class FloatPanel extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onMoveStart", () => {
      const {
        x,
        y,
        width,
        height,
        minimized
      } = this.props;
      this.setState({
        isMoving: true,
        startProps: {
          x,
          y,
          width,
          height,
          minimized
        }
      });
    });

    _defineProperty(this, "_onMoveDrag", ({
      deltaX,
      deltaY
    }) => {
      const {
        startProps
      } = this.state;
      this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
        x: Math.max(0, startProps.x + deltaX),
        y: Math.max(0, startProps.y + deltaY)
      }));
    });

    _defineProperty(this, "_onMoveEnd", ({
      hasDragged
    }) => {
      if (this.props.minimizable && this.props.title && !hasDragged) {
        const {
          startProps
        } = this.state;
        this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
          minimized: !startProps.minimized
        }));
      }

      this.setState({
        isMoving: false
      });
      this.props.onMoveEnd();
    });

    _defineProperty(this, "_onResizeStart", () => {
      const {
        x,
        y,
        width,
        height,
        minimized
      } = this.props;
      this.setState({
        isResizing: true,
        startProps: {
          x,
          y,
          width,
          height,
          minimized
        }
      });
    });

    _defineProperty(this, "_onResizeDrag", ({
      deltaX,
      deltaY
    }) => {
      const {
        startProps
      } = this.state;
      this.props.onUpdate(_objectSpread(_objectSpread({}, startProps), {}, {
        width: Math.max(0, startProps.width + deltaX),
        height: Math.max(0, startProps.height + deltaY)
      }));
    });

    _defineProperty(this, "_onResizeEnd", () => {
      this.setState({
        isResizing: false
      });
      this.props.onResizeEnd();
    });

    this.state = {
      isMoving: false,
      isResizing: false,
      startProps: null
    };
  }

  renderMover(children) {
    const {
      movable
    } = this.props;

    if (movable) {
      return React.createElement(Draggable, {
        onDragStart: this._onMoveStart,
        onDrag: this._onMoveDrag,
        onDragEnd: this._onMoveEnd
      }, children);
    }

    return children;
  }

  renderContent(styleProps) {
    const {
      style,
      height,
      minimized,
      minimizable,
      resizable
    } = this.props;

    if (minimizable && minimized) {
      return null;
    }

    return React.createElement(ContentComponent, _extends({}, styleProps, {
      userStyle: style.content,
      style: {
        height
      }
    }), this.props.children, resizable && React.createElement(Draggable, {
      onDragStart: this._onResizeStart,
      onDrag: this._onResizeDrag,
      onDragEnd: this._onResizeEnd,
      style: {
        cursor: 'nwse-resize'
      }
    }, React.createElement(Resizer, _extends({}, styleProps, {
      userStyle: style.resizer
    }))));
  }

  render() {
    const {
      theme,
      style,
      title,
      x,
      y,
      width,
      height,
      className,
      parentWidth,
      parentHeight
    } = this.props;
    const {
      isMoving,
      isResizing
    } = this.state;
    const styleProps = {
      theme,
      isMoving,
      isResizing
    };
    const wrapperStyle = {
      left: Math.min(x, Math.max(0, parentWidth - width)),
      top: Math.min(y, Math.max(0, parentHeight - height)),
      width
    };
    return React.createElement(Container, _extends({
      className: className
    }, styleProps, {
      userStyle: style.wrapper,
      style: wrapperStyle
    }), title ? this.renderMover(React.createElement(TitleComponent, _extends({}, styleProps, {
      userStyle: style.title
    }), title)) : this.renderMover(this.renderContent(styleProps)), title && this.renderContent(styleProps));
  }

}

_defineProperty(FloatPanel, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  parentWidth: PropTypes.number,
  parentHeight: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minimized: PropTypes.bool,
  movable: PropTypes.bool,
  resizable: PropTypes.bool,
  minimizable: PropTypes.bool,
  onUpdate: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onResizeEnd: PropTypes.func
});

_defineProperty(FloatPanel, "defaultProps", {
  style: {},
  parentWidth: Infinity,
  parentHeight: Infinity,
  className: '',
  title: '',
  minimized: false,
  movable: true,
  resizable: false,
  minimizable: true,
  onUpdate: () => {},
  onMoveEnd: () => {},
  onResizeEnd: () => {}
});

export default withTheme(FloatPanel);
//# sourceMappingURL=index.js.map
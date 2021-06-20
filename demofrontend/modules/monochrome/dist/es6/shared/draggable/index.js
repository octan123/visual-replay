import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { evaluateStyle } from '../theme';
const ContainerComponent = styled.div(props => _objectSpread({
  margin: -props.tolerance,
  padding: props.tolerance,
  cursor: props.isActive ? 'grabbing' : props.isEnabled ? 'grab' : 'inherit'
}, evaluateStyle(props.userStyle, props)));
const BACKDROP_STYLES = {
  position: 'fixed',
  zIndex: 999,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

function noop() {}

export default class Draggable extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_getEventData", (evt, offset = this.state.offset) => {
      const {
        dragStartPos,
        hasDragged
      } = this.state;
      const result = {
        srcEvent: evt,
        x: evt.clientX,
        y: evt.clientY,
        offsetX: evt.clientX - offset.left,
        offsetY: evt.clientY - offset.top,
        hasDragged
      };

      if (dragStartPos) {
        result.deltaX = result.x - dragStartPos.x;
        result.deltaY = result.y - dragStartPos.y;
      } else {
        result.deltaX = 0;
        result.deltaY = 0;
      }

      return result;
    });

    _defineProperty(this, "_onMouseDown", evt => {
      if (!this.props.isEnabled) {
        return;
      }

      evt.stopPropagation();

      const offset = this._element.getBoundingClientRect();

      const eventData = this._getEventData(evt, offset);

      this.setState({
        isMouseDown: true,
        hasDragged: false,
        offset,
        dragStartPos: {
          x: eventData.x,
          y: eventData.y
        }
      });
      this.props.onDragStart(eventData);
    });

    _defineProperty(this, "_onMouseMove", evt => {
      if (!this.props.isEnabled) {
        return;
      }

      evt.stopPropagation();

      if (this.state.isMouseDown) {
        const eventData = this._getEventData(evt);

        const {
          deltaX,
          deltaY
        } = eventData;

        if (!this.state.hasDragged) {
          if (deltaX || deltaY) {
            this.setState({
              hasDragged: true
            });
          } else {
            return;
          }
        }

        this.props.onDrag(eventData);
      }
    });

    _defineProperty(this, "_onMouseUp", evt => {
      if (this.state.isMouseDown) {
        this.setState({
          isMouseDown: false,
          dragStartPos: null
        });
        this.props.onDragEnd(this._getEventData(evt));
      }
    });

    this.state = {
      isMouseDown: false,
      dragStartPos: null,
      hasDragged: false
    };
  }

  render() {
    const {
      style,
      isEnabled,
      className,
      tolerance
    } = this.props;
    const {
      isMouseDown
    } = this.state;
    return React.createElement(ContainerComponent, {
      className: className,
      ref: _ref => {
        this._element = _ref;
      },
      tolerance: tolerance,
      isEnabled: isEnabled,
      isActive: isMouseDown,
      userStyle: style,
      onMouseDown: this._onMouseDown,
      onMouseMove: this._onMouseMove,
      onMouseLeave: this._onMouseUp,
      onMouseUp: this._onMouseUp
    }, isMouseDown && React.createElement("div", {
      style: BACKDROP_STYLES
    }), this.props.children);
  }

}

_defineProperty(Draggable, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  tolerance: PropTypes.number,
  isEnabled: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
});

_defineProperty(Draggable, "defaultProps", {
  className: '',
  isEnabled: true,
  tolerance: 0,
  onDragStart: noop,
  onDrag: noop,
  onDragEnd: noop
});
//# sourceMappingURL=index.js.map
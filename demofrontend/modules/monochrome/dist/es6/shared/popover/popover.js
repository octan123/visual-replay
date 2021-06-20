import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Popper from 'popper.js';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import { capitalize, getOppositePosition, generateTriangleStyles, nodeHasParent, positionsToPopperPlacement } from './utils';
const isBrowser = typeof document !== 'undefined' && Boolean(document.createElement);
export const POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  AUTO: 'auto'
};
export const TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover'
};
const DEFAULT_ARROW_SIZE = 6;
const DEFAULT_BORDER_WIDTH = 1;
const PopoverComponent = styled.div(props => _objectSpread({
  display: 'inline-flex'
}, evaluateStyle(props.userStyle, props)));
const PopoverTarget = styled.div(props => _objectSpread({}, evaluateStyle(props.userStyle, props)));
const PopoverContent = styled.div(props => _objectSpread({}, evaluateStyle(props.userStyle, props)));
const PopoverBody = styled.div(props => {
  let style = null;

  if (props.position && props.position !== POSITIONS.AUTO && props.arrowSize) {
    style = {
      ["margin".concat(capitalize(getOppositePosition(props.position)))]: props.arrowSize
    };
  }

  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, props.theme.__reset__), style), {}, {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    background: props.background || props.theme.background,
    borderStyle: 'solid',
    borderWidth: props.borderWidth,
    borderColor: props.borderColor || props.theme.controlColorPrimary,
    boxShadow: props.theme.shadow,
    fontFamily: props.theme.fontFamily,
    fontSize: props.theme.fontSize,
    fontWeight: 'normal'
  }, props.popperStyles), evaluateStyle(props.userStyle, props));
});
const OuterArrow = styled.div(props => {
  const {
    position,
    arrowSize,
    popperOffsets
  } = props;

  if (!arrowSize) {
    return null;
  }

  const arrowOffsets = popperOffsets.arrow || {};
  const style = {
    borderColor: props.borderColor || props.theme.controlColorPrimary,
    [getOppositePosition(position)]: -arrowSize
  };

  if (arrowOffsets.top) {
    style.top = arrowOffsets.top;
  }

  if (arrowOffsets.left) {
    style.left = arrowOffsets.left;
  }

  return Object.assign(style, evaluateStyle(props.userStyle, props), generateTriangleStyles(position, arrowSize));
});
const InnerArrow = styled.div(props => {
  const {
    position,
    arrowSize
  } = props;

  if (!arrowSize) {
    return null;
  }

  const isVertical = position === POSITIONS.TOP || position === POSITIONS.BOTTOM;
  const style = {
    borderColor: props.background || props.theme.background
  };

  if (isVertical) {
    style.left = -arrowSize;
    style.top = position === POSITIONS.TOP ? -arrowSize : 0;
    style.marginTop = (position === POSITIONS.TOP ? -1 : 1) * props.borderWidth;
  } else {
    style.top = -arrowSize;
    style.left = position === POSITIONS.LEFT ? -arrowSize : 0;
    style.marginLeft = (position === POSITIONS.LEFT ? -1 : 1) * props.borderWidth;
  }

  return Object.assign(style, evaluateStyle(props.userStyle, props), generateTriangleStyles(position, arrowSize));
});
const POSITIONS_PROP_TYPE = PropTypes.oneOf([POSITIONS.TOP, POSITIONS.RIGHT, POSITIONS.BOTTOM, POSITIONS.LEFT, POSITIONS.AUTO]);

class Popover extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_handleTargetClick", () => {
      this._togglePopover();
    });

    _defineProperty(this, "_handleTargetMouseEnter", () => {
      clearTimeout(this.hideTimer);

      this._showPopover();
    });

    _defineProperty(this, "_handleTargetMouseLeave", () => {
      this._hidePopoverWithDelay();
    });

    _defineProperty(this, "_handlePopoverMouseEnter", () => {
      clearTimeout(this.hideTimer);
    });

    _defineProperty(this, "_handlePopoverMouseLeave", () => {
      this._hidePopoverWithDelay();
    });

    _defineProperty(this, "_handleKeyPress", evt => {
      if (evt.key === 'Escape') {
        this._hidePopover();
      }
    });

    _defineProperty(this, "_handlePopperUpdate", data => {
      this.setState({
        popperOffsets: data.offsets,
        popperPlacement: data.placement,
        popperStyles: data.styles
      });
      return data;
    });

    _defineProperty(this, "_hidePopover", () => {
      this.setState(this._getDefaultState(this.props));

      this._destroyPopover();
    });

    _defineProperty(this, "_handleDocumentClick", evt => {
      if (!this.$popper || nodeHasParent(evt.target, this.$popper) || nodeHasParent(evt.target, this.$target)) {
        return;
      }

      this._hidePopover();
    });

    this.state = this._getDefaultState(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isVisible && !prevState.isVisible) {
      const PopperClass = this.props.popperClass;
      this.popper = new PopperClass(this.$target, this.$popper, {
        placement: this.state.popperPlacement,
        modifiers: {
          arrow: {
            element: this.$arrow,
            enabled: true
          },
          applyStyle: {
            enabled: false
          },
          applyReactStyle: {
            enabled: true,
            fn: this._handlePopperUpdate,
            order: 900
          }
        }
      });

      if (this.props.trigger === TRIGGERS.CLICK) {
        this._addClickEvents();
      }
    }
  }

  componentWillUnmount() {
    this._destroyPopover();

    this._removeClickEvents();
  }

  _getDefaultState(props) {
    return {
      isVisible: false,
      popperOffsets: {},
      popperPlacement: positionsToPopperPlacement(props.position, props.arrowPosition),
      popperStyles: {}
    };
  }

  _showPopover() {
    this.setState({
      isVisible: true
    });
  }

  _hidePopoverWithDelay() {
    const {
      onMouseOutDelay
    } = this.props;

    if (onMouseOutDelay) {
      this.hideTimer = setTimeout(this._hidePopover, onMouseOutDelay);
      return;
    }

    this._hidePopover();
  }

  _addClickEvents() {
    if (!isBrowser) {
      return;
    }

    document.addEventListener('mousedown', this._handleDocumentClick);
    document.addEventListener('keyup', this._handleKeyPress);
  }

  _removeClickEvents() {
    if (!isBrowser) {
      return;
    }

    document.removeEventListener('mousedown', this._handleDocumentClick);
    document.removeEventListener('keyup', this._handleKeyPress);
  }

  _togglePopover() {
    const isVisible = !this.state.isVisible;
    this.setState({
      isVisible
    });

    if (!isVisible) {
      this._destroyPopover();
    }
  }

  _destroyPopover() {
    if (this.popper) {
      this.popper.destroy();
      delete this.popper;
    }

    if (this.props.trigger === TRIGGERS.CLICK) {
      this._removeClickEvents();
    }
  }

  _renderTarget(styleProps) {
    const {
      trigger,
      style
    } = this.props;
    const interactionProps = {};

    if (trigger === TRIGGERS.HOVER) {
      interactionProps.onMouseEnter = this._handleTargetMouseEnter;
      interactionProps.onMouseLeave = this._handleTargetMouseLeave;
    } else if (trigger === TRIGGERS.CLICK) {
      interactionProps.onClick = this._handleTargetClick;
    }

    return React.createElement(PopoverTarget, _extends({}, interactionProps, {
      userStyle: style.target
    }, styleProps, {
      ref: el => {
        this.$target = el;
      }
    }), this.props.children);
  }

  _renderArrow(styleProps) {
    const {
      style
    } = this.props;
    return React.createElement(OuterArrow, _extends({
      userStyle: style.arrowBorder
    }, styleProps, {
      ref: el => {
        this.$arrow = el;
      }
    }), React.createElement(InnerArrow, _extends({
      userStyle: style.arrow
    }, styleProps)));
  }

  _renderBody(styleProps) {
    const {
      className,
      style,
      trigger
    } = this.props;
    const interactionProps = {};

    if (trigger === TRIGGERS.HOVER) {
      interactionProps.onMouseEnter = this._handlePopoverMouseEnter;
      interactionProps.onMouseLeave = this._handlePopoverMouseLeave;
    }

    return React.createElement(PopoverBody, _extends({
      className: className
    }, interactionProps, {
      userStyle: style.body
    }, styleProps, {
      ref: el => {
        this.$popper = el;
      }
    }), this._renderContent(styleProps), this._renderArrow(styleProps));
  }

  _renderContent(styleProps) {
    const content = typeof this.props.content === 'function' ? this.props.content() : this.props.content;
    return React.createElement(PopoverContent, _extends({
      userStyle: this.props.style.content
    }, styleProps), content);
  }

  render() {
    const {
      theme,
      style
    } = this.props;
    const {
      isVisible,
      popperPlacement,
      popperStyles,
      popperOffsets
    } = this.state;
    const [position] = popperPlacement.split('-');
    const arrowPosition = position === POSITIONS.AUTO ? POSITIONS.TOP : position;
    const styleProps = {
      theme,
      arrowSize: 'arrowSize' in style ? style.arrowSize : DEFAULT_ARROW_SIZE,
      background: style.background,
      borderWidth: 'borderWidth' in style ? style.borderWidth : DEFAULT_BORDER_WIDTH,
      borderColor: style.borderColor,
      position,
      arrowPosition,
      popperStyles,
      popperOffsets,
      isActive: isVisible
    };
    return React.createElement(PopoverComponent, _extends({
      userStyle: style.popover
    }, styleProps), this._renderTarget(styleProps), isVisible && this._renderBody(styleProps));
  }

}

_defineProperty(Popover, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  position: POSITIONS_PROP_TYPE,
  arrowPosition: POSITIONS_PROP_TYPE,
  onMouseOutDelay: PropTypes.number,
  trigger: PropTypes.oneOf([TRIGGERS.HOVER, TRIGGERS.CLICK]),
  popperClass: PropTypes.func
});

_defineProperty(Popover, "defaultProps", {
  className: '',
  style: {},
  trigger: TRIGGERS.CLICK,
  onMouseOutDelay: 0,
  popperClass: Popper
});

const ThemedPopover = withTheme(Popover);
Object.assign(ThemedPopover, POSITIONS);
Object.assign(ThemedPopover, TRIGGERS);
export default ThemedPopover;
//# sourceMappingURL=popover.js.map
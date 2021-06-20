import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import Draggable from '../shared/draggable';
import { ListItemContainer, ListItemTitle, ListItemPlaceholder } from './styled-components';

const noop = () => {};

const TRANSITION = 300;
export default class DragDropListItem extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isHovered: false,
      isDragging: false,
      isActive: false,
      width: 0,
      height: 0,
      dragStartOffset: {
        left: 0,
        top: 0
      },
      dragPos: {
        deltaX: 0,
        deltaY: 0
      }
    });

    _defineProperty(this, "_container", void 0);

    _defineProperty(this, "_timer", null);

    _defineProperty(this, "_onMouseEnter", () => this.setState({
      isHovered: true
    }));

    _defineProperty(this, "_onMouseLeave", () => this.setState({
      isHovered: false
    }));

    _defineProperty(this, "_onDragStart", evt => {
      const container = this._container;
      this.setState({
        isDragging: true,
        isActive: true,
        width: container.offsetWidth,
        height: container.offsetHeight,
        dragStartOffset: container.getBoundingClientRect(),
        dragPos: evt
      });
      this.props.onDragStart(evt);
    });

    _defineProperty(this, "_onDragMove", evt => {
      this.setState({
        dragPos: evt
      });
      this.props.onDragMove(evt);
    });

    _defineProperty(this, "_onDragEnd", evt => {
      this.setState({
        isDragging: false,
        dragStartOffset: this._container.getBoundingClientRect(),
        dragPos: {
          deltaX: 0,
          deltaY: 0
        }
      });

      if (this.props.removed) {
        this.props.onDragEnd(evt);
      } else {
        this._timer = window.setTimeout(() => {
          this.setState({
            isActive: false
          });
          this.props.onDragEnd(evt);
        }, TRANSITION);
      }
    });
  }

  componentWillUnmount() {
    window.clearTimeout(this._timer);
  }

  getBoundingBox() {
    return this._container.getBoundingClientRect();
  }

  renderTitle() {
    const {
      title
    } = this.props;
    return typeof title === 'function' ? title() : title;
  }

  renderMover(children) {
    return React.createElement(Draggable, {
      onDragStart: this._onDragStart,
      onDrag: this._onDragMove,
      onDragEnd: this._onDragEnd
    }, children);
  }

  renderContent() {
    const {
      className,
      removed,
      theme,
      style
    } = this.props;
    const {
      isHovered,
      isDragging,
      isActive,
      width,
      height,
      dragPos,
      dragStartOffset
    } = this.state;
    const styleProps = {
      theme,
      isRemoved: removed,
      isHovered,
      isDragging,
      isActive
    };
    const title = this.renderTitle();
    const itemStyle = isActive ? {
      left: dragStartOffset.left + dragPos.deltaX,
      top: dragStartOffset.top + dragPos.deltaY,
      width,
      height
    } : null;
    return title ? React.createElement(ListItemContainer, _extends({
      className: className
    }, styleProps, {
      userStyle: style.item,
      style: itemStyle
    }), this.renderMover(React.createElement(ListItemTitle, _extends({}, styleProps, {
      userStyle: style.title,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave
    }), title)), this.props.children) : this.renderMover(React.createElement(ListItemContainer, _extends({
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      className: className
    }, styleProps, {
      userStyle: style.item,
      style: itemStyle
    }), this.props.children));
  }

  render() {
    const {
      theme,
      removed,
      style
    } = this.props;
    const {
      isHovered,
      isDragging,
      isActive,
      width,
      height
    } = this.state;
    const styleProps = {
      theme,
      isRemoved: removed,
      isHovered,
      isDragging,
      isActive
    };
    const placeholderStyle = {
      width,
      height: removed ? 0 : height
    };
    return React.createElement("div", {
      ref: _ref => {
        this._container = _ref;
      }
    }, this.renderContent(), isActive && React.createElement(ListItemPlaceholder, _extends({}, styleProps, {
      userStyle: style.placeholder,
      style: placeholderStyle
    })));
  }

}

_defineProperty(DragDropListItem, "propTypes", {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  removed: PropTypes.bool,
  style: PropTypes.object.isRequired,
  onDragStart: PropTypes.func,
  onDragMove: PropTypes.func,
  onDragEnd: PropTypes.func
});

_defineProperty(DragDropListItem, "defaultProps", {
  className: '',
  removed: false,
  onDragStart: noop,
  onDragMove: noop,
  onDragEnd: noop
});
//# sourceMappingURL=drag-drop-list-item.js.map
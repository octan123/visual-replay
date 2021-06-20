import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XVIZLoaderInterface from '../loaders/xviz-loader-interface';
export default function connectToLog({
  getLogState,
  Component
}) {
  class WrappedComponent extends PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        logVersion: -1
      });

      _defineProperty(this, "_update", logVersion => {
        this.setState({
          logVersion
        });
      });
    }

    componentDidMount() {
      const {
        log
      } = this.props;

      if (log) {
        log.subscribe(this._update);
      }
    }

    componentWillReceiveProps(nextProps) {
      const {
        log
      } = this.props;
      const nextLog = nextProps.log;

      if (log !== nextLog) {
        if (log) {
          log.unsubscribe(this._update);
        }

        if (nextLog) {
          nextLog.subscribe(this._update);
        }
      }
    }

    componentWillUnmount() {
      const {
        log
      } = this.props;

      if (log) {
        log.unsubscribe(this._update);
      }
    }

    render() {
      const _this$props = this.props,
            {
        log
      } = _this$props,
            otherProps = _objectWithoutProperties(_this$props, ["log"]);

      const logState = log && getLogState(log, otherProps);
      return React.createElement(Component, _extends({}, otherProps, logState, {
        log: log
      }));
    }

  }

  _defineProperty(WrappedComponent, "propTypes", {
    log: PropTypes.instanceOf(XVIZLoaderInterface)
  });

  return WrappedComponent;
}
//# sourceMappingURL=connect.js.map
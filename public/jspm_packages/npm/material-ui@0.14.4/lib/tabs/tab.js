/* */ 
'use strict';
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _stylePropable = require('../mixins/style-propable');
var _stylePropable2 = _interopRequireDefault(_stylePropable);
var _getMuiTheme = require('../styles/getMuiTheme');
var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
var _enhancedButton = require('../enhanced-button');
var _enhancedButton2 = _interopRequireDefault(_enhancedButton);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
}
var Tab = _react2.default.createClass({
  displayName: 'Tab',
  propTypes: {
    className: _react2.default.PropTypes.string,
    icon: _react2.default.PropTypes.node,
    label: _react2.default.PropTypes.node,
    onActive: _react2.default.PropTypes.func,
    onTouchTap: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    style: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.any,
    width: _react2.default.PropTypes.string
  },
  contextTypes: {muiTheme: _react2.default.PropTypes.object},
  childContextTypes: {muiTheme: _react2.default.PropTypes.object},
  mixins: [_stylePropable2.default],
  getInitialState: function getInitialState() {
    return {muiTheme: this.context.muiTheme || (0, _getMuiTheme2.default)()};
  },
  getChildContext: function getChildContext() {
    return {muiTheme: this.state.muiTheme};
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },
  _handleTouchTap: function _handleTouchTap(event) {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(this.props.value, event, this);
    }
  },
  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var onActive = _props.onActive;
    var onTouchTap = _props.onTouchTap;
    var selected = _props.selected;
    var style = _props.style;
    var value = _props.value;
    var width = _props.width;
    var icon = _props.icon;
    var other = _objectWithoutProperties(_props, ['label', 'onActive', 'onTouchTap', 'selected', 'style', 'value', 'width', 'icon']);
    var textColor = selected ? this.state.muiTheme.tabs.selectedTextColor : this.state.muiTheme.tabs.textColor;
    var styles = this.mergeStyles({
      padding: '0px 12px',
      height: label && icon ? 72 : 48,
      color: textColor,
      fontWeight: 500,
      fontSize: 14,
      width: width,
      textTransform: 'uppercase'
    }, style);
    var iconElement = undefined;
    if (icon && _react2.default.isValidElement(icon)) {
      var params = {style: {
          fontSize: 24,
          marginBottom: label ? 5 : 0,
          display: label ? 'block' : 'inline-block',
          color: textColor
        }};
      if (icon.type.displayName !== 'FontIcon') {
        params.color = textColor;
      }
      iconElement = _react2.default.cloneElement(icon, params);
    }
    var rippleColor = styles.color;
    var rippleOpacity = 0.3;
    return _react2.default.createElement(_enhancedButton2.default, _extends({}, other, {
      style: styles,
      focusRippleColor: rippleColor,
      touchRippleColor: rippleColor,
      focusRippleOpacity: rippleOpacity,
      touchRippleOpacity: rippleOpacity,
      onTouchTap: this._handleTouchTap
    }), iconElement, label);
  }
});
exports.default = Tab;
module.exports = exports['default'];

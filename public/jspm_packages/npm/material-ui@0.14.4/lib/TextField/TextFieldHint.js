/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _transitions = require('../styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _styles = require('../utils/styles');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var propTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  show: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object,
  text: _react2.default.PropTypes.node
};
var defaultProps = {show: true};
var TextFieldHint = function TextFieldHint(props) {
  var muiTheme = props.muiTheme;
  var show = props.show;
  var style = props.style;
  var text = props.text;
  var hintColor = muiTheme.textField.hintColor;
  var styles = {root: {
      position: 'absolute',
      opacity: show ? 1 : 0,
      color: hintColor,
      transition: _transitions2.default.easeOut(),
      bottom: 12
    }};
  return _react2.default.createElement('div', {style: (0, _styles.prepareStyles)(muiTheme, (0, _styles.mergeStyles)(styles.root, style))}, text);
};
TextFieldHint.propTypes = propTypes;
TextFieldHint.defaultProps = defaultProps;
exports.default = TextFieldHint;
module.exports = exports['default'];

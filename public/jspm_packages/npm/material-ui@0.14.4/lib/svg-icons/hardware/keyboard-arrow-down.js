/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');
var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);
var _svgIcon = require('../../svg-icon');
var _svgIcon2 = _interopRequireDefault(_svgIcon);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var HardwareKeyboardArrowDown = _react2.default.createClass({
  displayName: 'HardwareKeyboardArrowDown',
  mixins: [_reactAddonsPureRenderMixin2.default],
  render: function render() {
    return _react2.default.createElement(_svgIcon2.default, this.props, _react2.default.createElement('path', {d: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z'}));
  }
});
exports.default = HardwareKeyboardArrowDown;
module.exports = exports['default'];

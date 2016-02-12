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
var ActionSwapHoriz = _react2.default.createClass({
  displayName: 'ActionSwapHoriz',
  mixins: [_reactAddonsPureRenderMixin2.default],
  render: function render() {
    return _react2.default.createElement(_svgIcon2.default, this.props, _react2.default.createElement('path', {d: 'M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z'}));
  }
});
exports.default = ActionSwapHoriz;
module.exports = exports['default'];

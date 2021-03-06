/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _events = require('./events');
var _events2 = _interopRequireDefault(_events);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
exports.default = {
  _testSupportedProps: function _testSupportedProps(props) {
    var i = undefined;
    var el = document.createElement('div');
    for (i in props) {
      if (props.hasOwnProperty(i) && el.style[i] !== undefined) {
        return props[i];
      }
    }
  },
  transitionEndEventName: function transitionEndEventName() {
    return this._testSupportedProps({
      'transition': 'transitionend',
      'OTransition': 'otransitionend',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    });
  },
  animationEndEventName: function animationEndEventName() {
    return this._testSupportedProps({
      'animation': 'animationend',
      '-o-animation': 'oAnimationEnd',
      '-moz-animation': 'animationend',
      '-webkit-animation': 'webkitAnimationEnd'
    });
  },
  onTransitionEnd: function onTransitionEnd(el, callback) {
    var transitionEnd = this.transitionEndEventName();
    _events2.default.once(el, transitionEnd, function() {
      return callback();
    });
  },
  onAnimationEnd: function onAnimationEnd(el, callback) {
    var animationEnd = this.animationEndEventName();
    _events2.default.once(el, animationEnd, function() {
      return callback();
    });
  }
};
module.exports = exports['default'];

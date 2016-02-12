/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, '__esModule', {value: true});
  exports['default'] = function() {
    if (process.env.NODE_ENV !== 'production') {
      console.warn.apply(console, arguments);
    }
  };
  module.exports = exports['default'];
})(require('process'));

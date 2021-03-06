/* */ 
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calc;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calc(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var browserInfo = pluginInterface.browserInfo;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;
  var forceRun = pluginInterface.forceRun;
  var browser = browserInfo.browser;
  var version = browserInfo.version;

  if (typeof value === 'string' && value.indexOf('calc(') > -1 && (forceRun || browser === 'firefox' && version < 15 || browser === 'chrome' && version < 25 || browser === 'safari' && version < 6.1 || browser === 'ios_saf' && version < 7)) {
    var newValue = forceRun ?
    // prefix all
    ['-webkit-', '-moz-'].map(function (prefix) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    }).join(';' + property + ':') :
    // default
    value.replace(/calc\(/g, prefix.css + 'calc(');
    return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + property + ':' + value : ''));
  }
}

module.exports = exports['default'];
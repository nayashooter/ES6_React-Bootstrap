/* */ 
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cursor;
var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var browserInfo = pluginInterface.browserInfo;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;
  var forceRun = pluginInterface.forceRun;
  var browser = browserInfo.browser;
  var version = browserInfo.version;

  if (property === 'cursor' && values[value] && (forceRun || browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
    var newValue = forceRun ?
    // prefix all
    ['-webkit-', '-moz-'].map(function (prefix) {
      return prefix + value;
    }).join(';' + property + ':') :
    // default
    prefix.css + value;
    return {
      cursor: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    };
  }
}

module.exports = exports['default'];
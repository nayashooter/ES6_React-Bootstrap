/* */ 
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = flex;
var values = { flex: true, 'inline-flex': true };

function flex(pluginInterface) {
  var property = pluginInterface.property;
  var value = pluginInterface.value;
  var browserInfo = pluginInterface.browserInfo;
  var prefix = pluginInterface.prefix;
  var keepUnprefixed = pluginInterface.keepUnprefixed;
  var forceRun = pluginInterface.forceRun;
  var browser = browserInfo.browser;
  var version = browserInfo.version;

  if (property === 'display' && values[value] && (forceRun || browser === 'chrome' && version < 29 && version > 20 || (browser === 'safari' || browser === 'ios_saf') && version < 9 && version > 6 || browser === 'opera' && (version == 15 || version == 16))) {
    var newValue = forceRun ?
    // prefix all
    ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value].join(';' + property + ':') :
    // default
    '-webkit-' + value;
    return {
      display: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
    };
  }
}

module.exports = exports['default'];
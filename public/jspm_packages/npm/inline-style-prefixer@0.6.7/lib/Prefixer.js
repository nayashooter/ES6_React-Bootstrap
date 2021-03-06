/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
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
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
var _utilsGetBrowserInformation = require('./utils/getBrowserInformation');
var _utilsGetBrowserInformation2 = _interopRequireDefault(_utilsGetBrowserInformation);
var _utilsGetPrefixedKeyframes = require('./utils/getPrefixedKeyframes');
var _utilsGetPrefixedKeyframes2 = _interopRequireDefault(_utilsGetPrefixedKeyframes);
var _utilsCapitalizeString = require('./utils/capitalizeString');
var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);
var _utilsAssign = require('./utils/assign');
var _utilsAssign2 = _interopRequireDefault(_utilsAssign);
var _utilsWarn = require('./utils/warn');
var _utilsWarn2 = _interopRequireDefault(_utilsWarn);
var _caniuseData = require('./caniuseData');
var _caniuseData2 = _interopRequireDefault(_caniuseData);
var _Plugins = require('./Plugins');
var _Plugins2 = _interopRequireDefault(_Plugins);
var browserWhitelist = ['phantom'];
var Prefixer = (function() {
  function Prefixer() {
    var _this = this;
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    _classCallCheck(this, Prefixer);
    var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
    this._userAgent = options.userAgent || defaultUserAgent;
    this._keepUnprefixed = options.keepUnprefixed || false;
    this._browserInfo = (0, _utilsGetBrowserInformation2['default'])(this._userAgent);
    if (this._browserInfo && this._browserInfo.prefix) {
      this.cssPrefix = this._browserInfo.prefix.css;
      this.jsPrefix = this._browserInfo.prefix.inline;
      this.prefixedKeyframes = (0, _utilsGetPrefixedKeyframes2['default'])(this._browserInfo);
    } else {
      this._hasPropsRequiringPrefix = false;
      (0, _utilsWarn2['default'])('Either the global navigator was undefined or an invalid userAgent was provided.', 'Using a valid userAgent? Please let us know and create an issue at https://github.com/rofrischmann/inline-style-prefixer/issues');
      return false;
    }
    var data = this._browserInfo.browser && _caniuseData2['default'][this._browserInfo.browser];
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(function(key) {
        return data[key] >= _this._browserInfo.version;
      }).reduce(function(result, name) {
        return _extends({}, result, _defineProperty({}, name, true));
      }, {});
      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
    } else {
      browserWhitelist.forEach(function(browser) {
        if (_this._browserInfo[browser]) {
          _this._isWhitelisted = true;
        }
      });
      this._hasPropsRequiringPrefix = false;
      if (this._isWhitelisted) {
        return true;
      }
      (0, _utilsWarn2['default'])('Your userAgent seems to be not supported by inline-style-prefixer. Feel free to open an issue.');
      return false;
    }
  }
  _createClass(Prefixer, [{
    key: 'prefix',
    value: function prefix(styles) {
      var _this2 = this;
      if (!this._hasPropsRequiringPrefix) {
        return styles;
      }
      styles = (0, _utilsAssign2['default'])({}, styles);
      Object.keys(styles).forEach(function(property) {
        var value = styles[property];
        if (value instanceof Object) {
          styles[property] = _this2.prefix(value);
        } else {
          if (_this2._requiresPrefix[property]) {
            styles[_this2.jsPrefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
            if (!_this2._keepUnprefixed) {
              delete styles[property];
            }
          }
          _Plugins2['default'].forEach(function(plugin) {
            var resolvedStyles = plugin({
              property: property,
              value: value,
              styles: styles,
              browserInfo: _this2._browserInfo,
              prefix: {
                js: _this2.jsPrefix,
                css: _this2.cssPrefix,
                keyframes: _this2.prefixedKeyframes
              },
              keepUnprefixed: _this2._keepUnprefixed,
              requiresPrefix: _this2._requiresPrefix,
              forceRun: false
            });
            (0, _utilsAssign2['default'])(styles, resolvedStyles);
          });
        }
      });
      return styles;
    }
  }], [{
    key: 'prefixAll',
    value: function prefixAll(styles) {
      var prefixes = {};
      var browserInfo = (0, _utilsGetBrowserInformation2['default'])('*');
      browserInfo.browsers.forEach(function(browser) {
        var data = _caniuseData2['default'][browser];
        if (data) {
          (0, _utilsAssign2['default'])(prefixes, data);
        }
      });
      if (!Object.keys(prefixes).length > 0) {
        return styles;
      }
      styles = (0, _utilsAssign2['default'])({}, styles);
      Object.keys(styles).forEach(function(property) {
        var value = styles[property];
        if (value instanceof Object) {
          styles[property] = Prefixer.prefixAll(value);
        } else {
          var browsers = Object.keys(browserInfo.prefixes);
          browsers.forEach(function(browser) {
            var style = browserInfo.prefixes[browser];
            if (prefixes[property]) {
              styles[style.inline + (0, _utilsCapitalizeString2['default'])(property)] = value;
            }
            _Plugins2['default'].forEach(function(plugin) {
              var resolvedStyles = plugin({
                property: property,
                value: value,
                styles: styles,
                browserInfo: {
                  name: browser,
                  prefix: style,
                  version: 0
                },
                prefix: {},
                keepUnprefixed: true,
                requiresPrefix: prefixes,
                forceRun: true
              });
              (0, _utilsAssign2['default'])(styles, resolvedStyles);
            });
          });
        }
      });
      return styles;
    }
  }]);
  return Prefixer;
})();
exports['default'] = Prefixer;
module.exports = exports['default'];

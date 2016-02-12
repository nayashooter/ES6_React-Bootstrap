/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = {
    _luminance: function _luminance(color) {
      color = this._decomposeColor(color);
      if (color.type.indexOf('rgb') > -1) {
        var rgb = color.values.map(function(val) {
          val /= 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
      } else {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Calculating the relative luminance is not available\n        for HSL and HSLA.') : undefined;
        return -1;
      }
    },
    _convertColorToString: function _convertColorToString(color, additonalValue) {
      var str = color.type + '(' + parseInt(color.values[0]) + ',' + parseInt(color.values[1]) + ',' + parseInt(color.values[2]);
      if (additonalValue !== undefined) {
        str += ',' + additonalValue + ')';
      } else if (color.values.length === 4) {
        str += ',' + color.values[3] + ')';
      } else {
        str += ')';
      }
      return str;
    },
    _convertHexToRGB: function _convertHexToRGB(color) {
      if (color.length === 4) {
        var extendedColor = '#';
        for (var i = 1; i < color.length; i++) {
          extendedColor += color.charAt(i) + color.charAt(i);
        }
        color = extendedColor;
      }
      var values = {
        r: parseInt(color.substr(1, 2), 16),
        g: parseInt(color.substr(3, 2), 16),
        b: parseInt(color.substr(5, 2), 16)
      };
      return 'rgb(' + values.r + ',' + values.g + ',' + values.b + ')';
    },
    _decomposeColor: function _decomposeColor(color) {
      if (color.charAt(0) === '#') {
        return this._decomposeColor(this._convertHexToRGB(color));
      }
      var marker = color.indexOf('(');
      var type = color.substring(0, marker);
      var values = color.substring(marker + 1, color.length - 1).split(',');
      return {
        type: type,
        values: values
      };
    },
    fade: function fade(color, amount) {
      color = this._decomposeColor(color);
      if (color.type === 'rgb' || color.type === 'hsl')
        color.type += 'a';
      return this._convertColorToString(color, amount);
    },
    lighten: function lighten(color, amount) {
      color = this._decomposeColor(color);
      if (color.type.indexOf('hsl') > -1) {
        color.values[2] += amount;
        return this._decomposeColor(this._convertColorToString(color));
      } else if (color.type.indexOf('rgb') > -1) {
        for (var i = 0; i < 3; i++) {
          color.values[i] *= 1 + amount;
          if (color.values[i] > 255)
            color.values[i] = 255;
        }
      }
      if (color.type.indexOf('a') <= -1)
        color.type += 'a';
      return this._convertColorToString(color, '0.15');
    },
    darken: function darken(color, amount) {
      color = this._decomposeColor(color);
      if (color.type.indexOf('hsl') > -1) {
        color.values[2] += amount;
        return this._decomposeColor(this._convertColorToString(color));
      } else if (color.type.indexOf('rgb') > -1) {
        for (var i = 0; i < 3; i++) {
          color.values[i] *= 1 - amount;
          if (color.values[i] < 0)
            color.values[i] = 0;
        }
      }
      return this._convertColorToString(color);
    },
    contrastRatio: function contrastRatio(background, foreground) {
      var lumA = this._luminance(background);
      var lumB = this._luminance(foreground);
      if (lumA >= lumB) {
        return ((lumA + 0.05) / (lumB + 0.05)).toFixed(2);
      } else {
        return ((lumB + 0.05) / (lumA + 0.05)).toFixed(2);
      }
    },
    contrastRatioLevel: function contrastRatioLevel(background, foreground) {
      var levels = {
        'fail': {
          range: [0, 3],
          color: 'hsl(0, 100%, 40%)'
        },
        'aa-large': {
          range: [3, 4.5],
          color: 'hsl(40, 100%, 45%)'
        },
        'aa': {
          range: [4.5, 7],
          color: 'hsl(80, 60%, 45%)'
        },
        'aaa': {
          range: [7, 22],
          color: 'hsl(95, 60%, 41%)'
        }
      };
      var ratio = this.contrastRatio(background, foreground);
      for (var level in levels) {
        var range = levels[level].range;
        if (ratio >= range[0] && ratio <= range[1])
          return level;
      }
    }
  };
  module.exports = exports['default'];
})(require('process'));

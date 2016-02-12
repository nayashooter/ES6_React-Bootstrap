/* */ 
(function(process) {
  'use strict';
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
  Object.defineProperty(exports, "__esModule", {value: true});
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _stylePropable = require('../mixins/style-propable');
  var _stylePropable2 = _interopRequireDefault(_stylePropable);
  var _windowListenable = require('../mixins/window-listenable');
  var _windowListenable2 = _interopRequireDefault(_windowListenable);
  var _dateTime = require('../utils/date-time');
  var _dateTime2 = _interopRequireDefault(_dateTime);
  var _datePickerDialog = require('./date-picker-dialog');
  var _datePickerDialog2 = _interopRequireDefault(_datePickerDialog);
  var _textField = require('../text-field');
  var _textField2 = _interopRequireDefault(_textField);
  var _getMuiTheme = require('../styles/getMuiTheme');
  var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
  var _deprecatedPropType = require('../utils/deprecatedPropType');
  var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  var DatePicker = _react2.default.createClass({
    displayName: 'DatePicker',
    propTypes: {
      DateTimeFormat: _react2.default.PropTypes.func,
      autoOk: _react2.default.PropTypes.bool,
      container: _react2.default.PropTypes.oneOf(['dialog', 'inline']),
      defaultDate: _react2.default.PropTypes.object,
      disableYearSelection: _react2.default.PropTypes.bool,
      disabled: _react2.default.PropTypes.bool,
      firstDayOfWeek: _react2.default.PropTypes.number,
      formatDate: _react2.default.PropTypes.func,
      locale: _react2.default.PropTypes.string,
      maxDate: _react2.default.PropTypes.object,
      minDate: _react2.default.PropTypes.object,
      mode: _react2.default.PropTypes.oneOf(['portrait', 'landscape']),
      onChange: _react2.default.PropTypes.func,
      onDismiss: _react2.default.PropTypes.func,
      onFocus: _react2.default.PropTypes.func,
      onShow: _react2.default.PropTypes.func,
      onTouchTap: _react2.default.PropTypes.func,
      shouldDisableDate: _react2.default.PropTypes.func,
      showYearSelector: (0, _deprecatedPropType2.default)(_react2.default.PropTypes.bool, 'Instead, use disableYearSelection.'),
      style: _react2.default.PropTypes.object,
      textFieldStyle: _react2.default.PropTypes.object,
      value: _react2.default.PropTypes.any,
      valueLink: _react2.default.PropTypes.object,
      wordings: _react2.default.PropTypes.object
    },
    contextTypes: {muiTheme: _react2.default.PropTypes.object},
    childContextTypes: {muiTheme: _react2.default.PropTypes.object},
    mixins: [_stylePropable2.default, _windowListenable2.default],
    getDefaultProps: function getDefaultProps() {
      return {
        formatDate: _dateTime2.default.format,
        autoOk: false,
        disableYearSelection: false,
        style: {},
        firstDayOfWeek: 0,
        disabled: false
      };
    },
    getInitialState: function getInitialState() {
      return {
        date: this._isControlled() ? this._getControlledDate() : this.props.defaultDate,
        dialogDate: new Date(),
        muiTheme: this.context.muiTheme || (0, _getMuiTheme2.default)()
      };
    },
    getChildContext: function getChildContext() {
      return {muiTheme: this.state.muiTheme};
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      if (nextContext.muiTheme) {
        this.setState({muiTheme: nextContext.muiTheme});
      }
      if (this._isControlled()) {
        var newDate = this._getControlledDate(nextProps);
        if (!_dateTime2.default.isEqualDate(this.state.date, newDate)) {
          this.setState({date: newDate});
        }
      }
    },
    windowListeners: {keyup: '_handleWindowKeyUp'},
    getDate: function getDate() {
      return this.state.date;
    },
    setDate: function setDate(date) {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'setDate() method is deprecated. Use the defaultDate property instead.\n      Or use the DatePicker as a controlled component with the value property.') : undefined;
      this.setState({date: date});
    },
    openDialog: function openDialog() {
      this.setState({dialogDate: this.getDate()}, this.refs.dialogWindow.show);
    },
    focus: function focus() {
      this.openDialog();
    },
    _handleDialogAccept: function _handleDialogAccept(date) {
      if (!this._isControlled()) {
        this.setState({date: date});
      }
      if (this.props.onChange)
        this.props.onChange(null, date);
      if (this.props.valueLink)
        this.props.valueLink.requestChange(date);
    },
    _handleInputFocus: function _handleInputFocus(e) {
      e.target.blur();
      if (this.props.onFocus)
        this.props.onFocus(e);
    },
    _handleInputTouchTap: function _handleInputTouchTap(event) {
      var _this = this;
      if (this.props.onTouchTap)
        this.props.onTouchTap(event);
      if (!this.props.disabled)
        setTimeout(function() {
          _this.openDialog();
        }, 0);
    },
    _handleWindowKeyUp: function _handleWindowKeyUp() {},
    _isControlled: function _isControlled() {
      return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
    },
    _getControlledDate: function _getControlledDate() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      if (_dateTime2.default.isDateObject(props.value)) {
        return props.value;
      } else if (props.valueLink && _dateTime2.default.isDateObject(props.valueLink.value)) {
        return props.valueLink.value;
      }
    },
    render: function render() {
      var _props = this.props;
      var container = _props.container;
      var DateTimeFormat = _props.DateTimeFormat;
      var locale = _props.locale;
      var wordings = _props.wordings;
      var autoOk = _props.autoOk;
      var defaultDate = _props.defaultDate;
      var formatDate = _props.formatDate;
      var maxDate = _props.maxDate;
      var minDate = _props.minDate;
      var mode = _props.mode;
      var onDismiss = _props.onDismiss;
      var onFocus = _props.onFocus;
      var onShow = _props.onShow;
      var onTouchTap = _props.onTouchTap;
      var disableYearSelection = _props.disableYearSelection;
      var style = _props.style;
      var textFieldStyle = _props.textFieldStyle;
      var valueLink = _props.valueLink;
      var firstDayOfWeek = _props.firstDayOfWeek;
      var other = _objectWithoutProperties(_props, ['container', 'DateTimeFormat', 'locale', 'wordings', 'autoOk', 'defaultDate', 'formatDate', 'maxDate', 'minDate', 'mode', 'onDismiss', 'onFocus', 'onShow', 'onTouchTap', 'disableYearSelection', 'style', 'textFieldStyle', 'valueLink', 'firstDayOfWeek']);
      return _react2.default.createElement('div', {style: this.prepareStyles(style)}, _react2.default.createElement(_textField2.default, _extends({}, other, {
        style: textFieldStyle,
        ref: 'input',
        value: this.state.date ? formatDate(this.state.date) : undefined,
        onFocus: this._handleInputFocus,
        onTouchTap: this._handleInputTouchTap
      })), _react2.default.createElement(_datePickerDialog2.default, {
        container: container,
        ref: 'dialogWindow',
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        wordings: wordings,
        mode: mode,
        initialDate: this.state.dialogDate,
        onAccept: this._handleDialogAccept,
        onShow: onShow,
        onDismiss: onDismiss,
        minDate: minDate,
        maxDate: maxDate,
        autoOk: autoOk,
        disableYearSelection: disableYearSelection,
        shouldDisableDate: this.props.shouldDisableDate,
        firstDayOfWeek: firstDayOfWeek
      }));
    }
  });
  exports.default = DatePicker;
  module.exports = exports['default'];
})(require('process'));

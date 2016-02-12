/* */ 
'use strict';
var _extends = require('babel-runtime/helpers/extends')['default'];
var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];
var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];
var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];
exports.__esModule = true;
var _classnames = require('classnames');
var _classnames2 = _interopRequireDefault(_classnames);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');
var _reactDom2 = _interopRequireDefault(_reactDom);
var _utilsBootstrapUtils = require('./utils/bootstrapUtils');
var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);
var _styleMaps = require('./styleMaps');
var _domHelpersUtilScrollbarSize = require('dom-helpers/util/scrollbarSize');
var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);
var _domHelpersUtilInDOM = require('dom-helpers/util/inDOM');
var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);
var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');
var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);
var _domHelpersEvents = require('dom-helpers/events');
var _domHelpersEvents2 = _interopRequireDefault(_domHelpersEvents);
var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');
var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);
var _Fade = require('./Fade');
var _Fade2 = _interopRequireDefault(_Fade);
var _ModalDialog = require('./ModalDialog');
var _ModalDialog2 = _interopRequireDefault(_ModalDialog);
var _ModalBody = require('./ModalBody');
var _ModalBody2 = _interopRequireDefault(_ModalBody);
var _ModalHeader = require('./ModalHeader');
var _ModalHeader2 = _interopRequireDefault(_ModalHeader);
var _ModalTitle = require('./ModalTitle');
var _ModalTitle2 = _interopRequireDefault(_ModalTitle);
var _ModalFooter = require('./ModalFooter');
var _ModalFooter2 = _interopRequireDefault(_ModalFooter);
var _reactOverlaysLibModal = require('react-overlays/lib/Modal');
var _reactOverlaysLibModal2 = _interopRequireDefault(_reactOverlaysLibModal);
var _reactOverlaysLibUtilsIsOverflowing = require('react-overlays/lib/utils/isOverflowing');
var _reactOverlaysLibUtilsIsOverflowing2 = _interopRequireDefault(_reactOverlaysLibUtilsIsOverflowing);
var _lodashCompatObjectPick = require('lodash-compat/object/pick');
var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);
var Modal = _react2['default'].createClass({
  displayName: 'Modal',
  propTypes: _extends({}, _reactOverlaysLibModal2['default'].propTypes, _ModalDialog2['default'].propTypes, {
    backdrop: _react2['default'].PropTypes.oneOf(['static', true, false]),
    keyboard: _react2['default'].PropTypes.bool,
    animation: _react2['default'].PropTypes.bool,
    dialogComponent: _reactPropTypesLibElementType2['default'],
    autoFocus: _react2['default'].PropTypes.bool,
    enforceFocus: _react2['default'].PropTypes.bool,
    bsStyle: _react2['default'].PropTypes.string,
    show: _react2['default'].PropTypes.bool,
    onHide: _react2['default'].PropTypes.func,
    onEnter: _react2['default'].PropTypes.func,
    onEntering: _react2['default'].PropTypes.func,
    onEntered: _react2['default'].PropTypes.func,
    onExit: _react2['default'].PropTypes.func,
    onExiting: _react2['default'].PropTypes.func,
    onExited: _react2['default'].PropTypes.func
  }),
  childContextTypes: {'$bs_onModalHide': _react2['default'].PropTypes.func},
  getDefaultProps: function getDefaultProps() {
    return _extends({}, _reactOverlaysLibModal2['default'].defaultProps, {
      bsClass: 'modal',
      animation: true,
      dialogComponent: _ModalDialog2['default']
    });
  },
  getInitialState: function getInitialState() {
    return {modalStyles: {}};
  },
  getChildContext: function getChildContext() {
    return {$bs_onModalHide: this.props.onHide};
  },
  componentWillUnmount: function componentWillUnmount() {
    _domHelpersEvents2['default'].off(window, 'resize', this.handleWindowResize);
  },
  render: function render() {
    var _this = this;
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var dialogClassName = _props.dialogClassName;
    var animation = _props.animation;
    var props = _objectWithoutProperties(_props, ['className', 'children', 'dialogClassName', 'animation']);
    var modalStyles = this.state.modalStyles;
    var inClass = {'in': props.show && !animation};
    var Dialog = props.dialogComponent;
    var parentProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_reactOverlaysLibModal2['default'].propTypes).concat(['onExit', 'onExiting', 'onEnter', 'onEntered']));
    var modal = _react2['default'].createElement(Dialog, _extends({
      key: 'modal',
      ref: function(ref) {
        return _this._modal = ref;
      }
    }, props, {
      style: modalStyles,
      className: _classnames2['default'](className, inClass),
      dialogClassName: dialogClassName,
      onClick: props.backdrop === true ? this.handleDialogClick : null
    }), this.props.children);
    return _react2['default'].createElement(_reactOverlaysLibModal2['default'], _extends({}, parentProps, {
      show: props.show,
      ref: function(ref) {
        _this._wrapper = ref && ref.refs.modal;
        _this._backdrop = ref && ref.refs.backdrop;
      },
      onEntering: this._onShow,
      onExited: this._onHide,
      backdropClassName: _classnames2['default'](_utilsBootstrapUtils2['default'].prefix(props, 'backdrop'), inClass),
      containerClassName: _utilsBootstrapUtils2['default'].prefix(props, 'open'),
      transition: animation ? _Fade2['default'] : undefined,
      dialogTransitionTimeout: Modal.TRANSITION_DURATION,
      backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
    }), modal);
  },
  _onShow: function _onShow() {
    _domHelpersEvents2['default'].on(window, 'resize', this.handleWindowResize);
    this.setState(this._getStyles());
    if (this.props.onEntering) {
      var _props2;
      (_props2 = this.props).onEntering.apply(_props2, arguments);
    }
  },
  _onHide: function _onHide() {
    _domHelpersEvents2['default'].off(window, 'resize', this.handleWindowResize);
    if (this.props.onExited) {
      var _props3;
      (_props3 = this.props).onExited.apply(_props3, arguments);
    }
  },
  handleDialogClick: function handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.onHide();
  },
  handleWindowResize: function handleWindowResize() {
    this.setState(this._getStyles());
  },
  _getStyles: function _getStyles() {
    if (!_domHelpersUtilInDOM2['default']) {
      return {};
    }
    var node = _reactDom2['default'].findDOMNode(this._modal);
    var doc = _domHelpersOwnerDocument2['default'](node);
    var scrollHt = node.scrollHeight;
    var bodyIsOverflowing = _reactOverlaysLibUtilsIsOverflowing2['default'](_reactDom2['default'].findDOMNode(this.props.container || doc.body));
    var modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;
    return {modalStyles: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0
      }};
  }
});
Modal.Body = _ModalBody2['default'];
Modal.Header = _ModalHeader2['default'];
Modal.Title = _ModalTitle2['default'];
Modal.Footer = _ModalFooter2['default'];
Modal.Dialog = _ModalDialog2['default'];
Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;
exports['default'] = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], _utilsBootstrapUtils.bsClass('modal', Modal));
module.exports = exports['default'];

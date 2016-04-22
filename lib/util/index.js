'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AXURL = exports.fn = exports.devices = exports.browser = exports.role = exports.DOM = exports.aria = exports.hasProp = exports.trueish = exports.listensTo = exports.hiddenFromAT = exports.isInteractive = undefined;

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _isInteractive2 = require('./is-interactive');

var _isInteractive3 = _interopRequireDefault(_isInteractive2);

var _hiddenFromAt = require('./hidden-from-at');

var _hiddenFromAt2 = _interopRequireDefault(_hiddenFromAt);

var _listensTo2 = require('./listens-to');

var _listensTo3 = _interopRequireDefault(_listensTo2);

var _trueish2 = require('./trueish');

var _trueish3 = _interopRequireDefault(_trueish2);

var _hasProp2 = require('./has-prop');

var _hasProp3 = _interopRequireDefault(_hasProp2);

var _aria2 = require('./aria');

var _aria3 = _interopRequireDefault(_aria2);

var _DOM2 = require('./DOM');

var _DOM3 = _interopRequireDefault(_DOM2);

var _role2 = require('./role');

var _role3 = _interopRequireDefault(_role2);

var _browser2 = require('./browser');

var _browser3 = _interopRequireDefault(_browser2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isInteractive = _isInteractive3.default;
exports.hiddenFromAT = _hiddenFromAt2.default;
exports.listensTo = _listensTo3.default;
exports.trueish = _trueish3.default;
exports.hasProp = _hasProp3.default;
exports.aria = _aria3.default;
exports.DOM = _DOM3.default;
exports.role = _role3.default;
exports.browser = _browser3.default;
var devices = exports.devices = {
  screenReaders: (0, _symbol2.default)('screenReaders'),
  keyboardOnly: (0, _symbol2.default)('keyboardOnly'),
  mobile: (0, _symbol2.default)('mobile')
};

// simple callback
var fn = exports.fn = function fn() {
  return null;
};

// builds url for specific google AX Rule
var AXURL = exports.AXURL = function AXURL(ax) {
  return 'https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#' + ax;
};
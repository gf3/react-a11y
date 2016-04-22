'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function () {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  // signature is a11y(React, opts) or a11y(React, ReactDOM, opts)

  var _ref = args.length === 2 ? args[1].version === undefined ? [args[0], null, args[1] || {}] : [args[0], args[1], {}] : args;

  var _ref2 = (0, _slicedToArray3.default)(_ref, 3);

  var React = _ref2[0];
  var ReactDOM = _ref2[1];
  var opts = _ref2[2];


  if (!React || !React.createElement) {
    throw new Error('react-a11y: missing argument `React`');
  }

  // make sure ReactDOM is passed in in browser code
  if (_util.browser && !(ReactDOM && ReactDOM.version)) {
    throw new Error('react-a11y: missing argument `ReactDOM`');
  }

  deprecate(opts, 'includeSrcNode', msg);
  deprecate(opts, 'throw', msg);
  deprecate(opts, 'warningPrefix', msg);

  var _opts$reporter = opts.reporter;
  var reporter = _opts$reporter === undefined ? mkReporter(opts) : _opts$reporter;
  var _opts$filterFn = opts.filterFn;
  var // make a reporter based on options
  filterFn = _opts$filterFn === undefined ? always : _opts$filterFn;
  var _opts$plugins = opts.plugins;
  var plugins = _opts$plugins === undefined ? [] : _opts$plugins;
  var _opts$rules = opts.rules;
  var rules = _opts$rules === undefined ? {} : _opts$rules;


  return {
    React: React,
    ReactDOM: ReactDOM,
    filterFn: filterFn,
    reporter: reporter,
    plugins: plugins,
    rules: rules
  };
};

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Throws an error based on the warning
 * If the last argument is a DOM node, it
 * coerces it to a string before throwing.
 * @returns {undefined}
 */
var throwError = function throwError() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var last = args[args.length - 1];
  if (last.outerHTML) {
    args[args.length - 1] = 'Element: \n  ' + last.outerHTML;
  }

  var error = new Error(args.join(' '));
  error.element = last;

  throw error;
};

/**
 * Show a warning
 * @returns {undefined}
 */
var showWarning = function showWarning() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (_util.browser) {
    var _console;

    (_console = console).warn.apply(_console, args);
  } else {
    console.warn(args.join('\n  '));
  }
};

/**
 * Creates a reporter function based on deprecated options
 * @arg {object} opts - The options passed by the user
 * @returns {function} The reporter
 */
var mkReporter = function mkReporter(opts) {
  var _opts$doThrow = opts.doThrow;
  var doThrow = _opts$doThrow === undefined ? false : _opts$doThrow;
  var _opts$warningPrefix = opts.warningPrefix;
  var warningPrefix = _opts$warningPrefix === undefined ? '' : _opts$warningPrefix;


  return function (info) {
    var msg = info.msg;
    var displayName = info.displayName;
    var DOMNode = info.DOMNode;
    var url = info.url;
    var tagName = info.tagName;
    var severity = info.severity;
    var AX = info.AX;

    // build warning

    var warning = [displayName || tagName, warningPrefix.concat(msg)].concat((0, _toConsumableArray3.default)(url ? ['See \'' + url + '\' for more info.'] : []), (0, _toConsumableArray3.default)(AX ? ['See \'' + (0, _util.AXURL)(AX) + '\' for more info.'] : []), [DOMNode || tagName]);

    if (doThrow || severity === 'error') {
      throwError.apply(undefined, (0, _toConsumableArray3.default)(warning));
    } else {
      showWarning.apply(undefined, (0, _toConsumableArray3.default)(warning));
    }
  };
};

/**
 * Generate a deprecation warning when a key is present
 * in the options object
 * @arg {object} opts - the options object under scrutiny
 * @arg {string} name - the name of the deprecated option
 * @arg {string} msg  - an optional reason for the deprecation
 * @returns {undefined}
 */
var deprecate = function deprecate(opts, name) {
  var msg = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  if (name in opts) {
    console.warn('react-a11y: the `' + name + '` options is deprecated. ' + msg);
  }
};

/**
 * Make a certain option mandatory
 * @arg {object} opts - the options object under scrutiny
 * @arg {string} name - the name of the mandatory option
 * @arg {string} msg  - an optional reason
 * @returns {undefined}
 */
var mandatory = function mandatory(opts, name) {
  var msg = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  if (!(name in opts)) {
    throw new Error('react-a11y: the `' + name + '` option is mandatory. ' + msg);
  }
};

// always resolve to true
var always = function always() {
  return true;
};

// deprecation message
var msg = 'Use the `reporter` option to change how warnings are displayed.';

/**
 * Normalize and validate the options that the user passed in.
 * @arg {object} opts - The opts the user passed in
 * @returns {object} the validated options
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allDevices = (0, _keys2.default)(util.devices).map(function (key) {
  return util.devices[key];
});

var severity = function severity(val) {
  switch (val) {
    case 0:
    case 'off':
      return 'off';

    case 1:
    case 'warn':
      return 'warn';

    case 2:
    case 'error':
      return 'error';

    default:
      throw new Error('react-a11y: invalid severity ' + val);
  }
};

var normalize = function normalize() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? 'off' : arguments[0];

  if (Array.isArray(opts)) {
    opts[0] = severity(opts[0]);
    return opts;
  } else {
    return [severity(opts)];
  }
};

var getTests = function getTests(defns) {
  return Array.isArray(defns) ? defns : [defns];
};

var Suite = function () {
  function Suite(React, ReactDOM, options) {
    (0, _classCallCheck3.default)(this, Suite);

    this.options = options;
    this.React = React;
    this.ReactDOM = ReactDOM;

    if (!this.React && !this.React.createElement) {
      throw new Error('Missing parameter: React');
    }

    var _options$plugins = this.options.plugins;
    var plugins = _options$plugins === undefined ? [] : _options$plugins;

    // prepare all rules by including every plugin and saving their rules
    // namespaced like plugin/rule

    this.rules = plugins.map(function (name) {
      try {
        var _ret = function () {
          var mod = require('react-a11y-plugin-' + name);
          var rules = 'default' in mod ? mod.default.rules : mod.rules;
          return {
            v: (0, _keys2.default)(rules).reduce(function (acc, key) {
              return (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, name + '/' + key, rules[key]));
            }, {})
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      } catch (err) {
        throw new Error('Could not find react-a11y-plugin-' + name);
      }
    }).reduce(function (acc, next) {
      return (0, _extends4.default)({}, acc, next);
    }, _rules2.default);
  }

  (0, _createClass3.default)(Suite, [{
    key: 'test',
    value: function test(tagName, props, children, done) {
      (0, _keys2.default)(this.options.rules).forEach(function (key) {
        var _this = this;

        var rule = this.rules[key];

        // ensure that the rule exists
        if (!rule) {
          throw new Error('react-a11y: rule ' + key + ' not found, ' + 'maybe you\'re missing a plugin?');
        }

        // get options for rule

        var _normalize = normalize(this.options.rules[key]);

        var _normalize2 = (0, _toArray3.default)(_normalize);

        var sev = _normalize2[0];

        var options = _normalize2.slice(1);

        if (sev !== 'off') {
          (function () {
            var ctx = {
              options: options,
              React: _this.React,
              ReactDOM: _this.ReactDOM
            };

            getTests(rule).reduce(function () {
              var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(pprev, defn) {
                var prev, tagNames, msg, url, AX, test, _defn$affects, affects, pass;

                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return pprev;

                      case 2:
                        prev = _context.sent;

                        if (prev) {
                          _context.next = 5;
                          break;
                        }

                        return _context.abrupt('return', prev);

                      case 5:
                        tagNames = defn.tagName;
                        msg = defn.msg;
                        url = defn.url;
                        AX = defn.AX;
                        test = defn.test;
                        _defn$affects = defn.affects;
                        affects = _defn$affects === undefined ? allDevices : _defn$affects;

                        // filter by tagName

                        if (!Array.isArray(tagNames)) {
                          _context.next = 17;
                          break;
                        }

                        if (!(tagNames.indexOf(tagName) < 0)) {
                          _context.next = 15;
                          break;
                        }

                        return _context.abrupt('return', prev);

                      case 15:
                        _context.next = 20;
                        break;

                      case 17:
                        if (!tagNames) {
                          _context.next = 20;
                          break;
                        }

                        if (!(tagName !== tagNames)) {
                          _context.next = 20;
                          break;
                        }

                        return _context.abrupt('return', prev);

                      case 20:
                        _context.next = 22;
                        return test(tagName, props, children, ctx);

                      case 22:
                        pass = _context.sent;


                        if (!pass) {
                          done({
                            tagName: tagName,
                            msg: msg,
                            url: url,
                            AX: AX,
                            props: props,
                            children: children,
                            severity: sev,
                            rule: key,
                            affects: affects
                          });
                        }

                        return _context.abrupt('return', prev && pass);

                      case 25:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
              return function (_x2, _x3) {
                return ref.apply(this, arguments);
              };
            }(), true);
          })();
        }
      }.bind(this));
    }
  }]);
  return Suite;
}();

exports.default = Suite;
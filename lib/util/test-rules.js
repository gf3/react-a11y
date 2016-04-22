'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (_ref) {
  var React = _ref.React;
  var ReactDOM = _ref.ReactDOM;
  var ruleDir = _ref.ruleDir;
  var rules = _ref.rules;

  describe('rules', function () {
    (0, _keys2.default)(rules).forEach(function (rule) {
      describe(rule, function () {
        var _require = require(_path2.default.resolve(ruleDir, rule));

        var defns = _require['default'];
        var test = _require.test;
        var _require$pass = _require.pass;
        var pass = _require$pass === undefined ? [] : _require$pass;
        var _require$fail = _require.fail;
        var fail = _require$fail === undefined ? [] : _require$fail;
        var description = _require.description;


        (0, _chai.expect)(description).to.be.a.string;
        (0, _chai.expect)(pass).to.have.length.above(0);
        (0, _chai.expect)(fail).to.have.length.above(0);

        var defn = Array.isArray(defns) ? defns : [defns];

        // get all messages
        var msgs = defn.reduce(function (acc, def) {
          return acc.concat(def.msg);
        }, []);

        pass.forEach(function (ok) {
          it('doesn\'t warn when ' + ok.when, function (done) {
            var cnt = 0;
            var a11y = new _a11y2.default(React, ReactDOM, {
              reporter: function reporter(info) {
                var msg = info.msg;


                if (msgs.indexOf(msg) >= 0) {
                  cnt++;
                }
              },
              rules: (0, _defineProperty3.default)({}, rule, ['warn'].concat((0, _toConsumableArray3.default)(ok.opts || [])))
            });

            // create the el
            ok.render(React);

            // restore and finish
            setTimeout(function () {
              (0, _chai.expect)(cnt === 0).to.be.true;
              a11y.restoreAll();
              done();
            }, 20);
          });
        });

        fail.forEach(function (bad) {
          it('warns when ' + bad.when, function (done) {
            var called = false;
            var a11y = new _a11y2.default(React, ReactDOM, {
              reporter: function reporter(info) {
                called = true;
                var msg = info.msg;

                (0, _chai.expect)(msgs.indexOf(msg) >= 0).to.be.true;
                a11y.restoreAll();
                done();
              },
              rules: (0, _defineProperty3.default)({}, rule, ['warn'].concat((0, _toConsumableArray3.default)(bad.opts || [])))
            });

            // create the el
            bad.render(React);
          });
        });
      });
    });
  });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chai = require('chai');

var _a11y = require('../a11y');

var _a11y2 = _interopRequireDefault(_a11y);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
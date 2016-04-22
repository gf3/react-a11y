'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pass = exports.fail = exports.description = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  msg: 'This element does not support ARIA roles, states and properties.',
  AX: 'AX_ARIA_12',
  test: function test(tagName, props) {
    var reserved = _util.DOM[tagName].reserved || false;
    var prop = (0, _util.hasProp)(props, (0, _keys2.default)(_util.aria).concat('role'));

    return !reserved || !prop;
  }
}];
var description = exports.description = '\nCertain reserved DOM elements do not support ARIA roles, states and properties.\nThis is often because they are not visible, for example `meta`, `html`, `script`,\n`style`. This rule enforces that these DOM elements do not contain the `role` and/or\n`aria-*` props.\n';

var fail = exports.fail = [{
  when: 'the element should not be given any ARIA attributes',
  render: function render(React) {
    return React.createElement('meta', { charSet: 'UTF-8', 'aria-hidden': 'false' });
  }
}];

var pass = exports.pass = [{
  when: 'the reserver element is not given an illegal prop',
  render: function render(React) {
    return React.createElement('meta', { charSet: 'UTF-8' });
  }
}, {
  when: 'an illegal props is given to a non-reserved elemeent',
  render: function render(React) {
    return React.createElement('div', { 'aria-hidden': true });
  }
}];
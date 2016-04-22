'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.pass = exports.fail = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roles = (0, _keys2.default)(_util.role);

exports.default = [{
  msg: 'Elements with ARIA roles must use a valid, non-abstract ARIA role.',
  url: 'https://www.w3.org/TR/wai-aria/roles',
  AX: 'AX_ARIA_01',
  test: function test(tagName, props) {
    var hasRole = (0, _util.hasProp)(props, 'role');
    return !hasRole || roles.indexOf(props.role) >= 0;
  }
}];
var fail = exports.fail = [{
  when: 'there is an invalid `role`',
  render: function render(React) {
    return React.createElement('div', { role: 'foo' });
  }
}];

var pass = exports.pass = [{
  when: 'there is a role and it is valid',
  render: function render(React) {
    return React.createElement('div', { role: 'button' });
  }
}, {
  when: 'there is no `role`',
  render: function render(React) {
    return React.createElement('div', null);
  }
}];

var description = exports.description = '\nThe ARIA roles model requires that elements with a role attribute use a valid,\nnon-abstract ARIA role. Each non-abstract ARIA role is mapped on to a known set\nof behavior by the user agent or assistive technology, so using an unknown role\nwill result in the desired behavior not being available to the user.\n\nYou can find a list of valid ARIA roles, along with descriptions and information\non additional required attributes, on the\n[WAI-ARIA](http://www.w3.org/TR/wai-aria/roles#roles_categorization) site.\n';
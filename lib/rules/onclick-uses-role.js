'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.pass = exports.fail = undefined;

var _util = require('../util');

exports.default = [{
  msg: 'You have a click handler on a non-interactive element but no `role` DOM property. ' + 'It will be unclear what this element is supposed to do to a screen-reader user.',
  url: 'http://www.w3.org/TR/wai-aria/roles#role_definitions',
  affects: [_util.devices.screenReaders],
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var interactive = (0, _util.isInteractive)(tagName, props);
    var onClick = (0, _util.listensTo)(props, 'onClick');
    var role = 'role' in props;

    return hidden || interactive || !onClick || role;
  }
}];
var fail = exports.fail = [{
  when: 'there is an `onClick` with no `role`',
  render: function render(React) {
    return React.createElement('span', { onClick: _util.fn });
  }
}];

var pass = exports.pass = [{
  when: 'the element is hidden from aria',
  render: function render(React) {
    return React.createElement('span', { onClick: _util.fn, 'aria-hidden': true });
  }
}, {
  when: 'there is an `onClick` with a `role`',
  render: function render(React) {
    return React.createElement('span', { onClick: _util.fn, role: 'button' });
  }
}, {
  when: 'the element is interactive',
  render: function render(React) {
    return React.createElement('button', { onClick: _util.fn });
  }
}];

var description = exports.description = '\nEnforce visible, non-interactive elements with click handlers use role\nattribute. Visible means that it is not hidden from a screen reader. Examples of\nnon-interactive elements are `div`, `section`, and a elements without a `href`\nprop.The purpose of the role attribute is to identify to screenreaders the exact\nfunction of an element.\n';
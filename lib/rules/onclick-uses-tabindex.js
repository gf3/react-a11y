'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.fail = exports.pass = undefined;

var _util = require('../util');

exports.default = [{
  msg: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. ' + 'The element will not be navigable or interactive by keyboard users.',
  url: 'http://www.w3.org/TR/wai-aria-practices/#focus_tabindex',
  affects: [_util.devices.keyboardOnly],
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var interactive = (0, _util.isInteractive)(tagName, props);
    var onClick = (0, _util.listensTo)(props, 'onClick');
    var tabIndex = props.tabIndex !== undefined;

    return hidden || interactive || !onClick || tabIndex;
  }
}];
var pass = exports.pass = [{
  when: 'when there is an `onClick` with a `tabIndex`',
  render: function render(React) {
    return React.createElement('span', { onClick: _util.fn, tabIndex: 0 });
  }
}, {
  when: 'the element is hidden from aria',
  render: function render(React) {
    return React.createElement('span', { onClick: _util.fn, 'aria-hidden': true });
  }
}, {
  when: 'the element is interactive',
  render: function render(React) {
    return React.createElement('button', { onClick: _util.fn });
  }
}];

var fail = exports.fail = [{
  when: 'there is an `onClick` with no `tabIndex`',
  render: function render(React) {
    return React.createElement('span', { onClick: _util.fn });
  }
}];

var description = exports.description = '\nEnforce that elements that have an `onClick` handler also have\na `tabIndex` property.  If not, they will not be navigable by\nkeyboard users.\n';
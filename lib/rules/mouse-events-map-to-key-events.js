'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.pass = exports.fail = undefined;

var _util = require('../util');

var url = 'http://webaim.org/techniques/javascript/eventhandlers#onmouseover';
var affects = [_util.devices.keyboardOnly];

exports.default = [{
  msg: 'onMouseOver must be accompanied by onFocus for accessibility.',
  url: url,
  affects: affects,
  test: function test(tagName, props) {
    var mouseOver = (0, _util.listensTo)(props, 'onMouseOver');
    var focus = (0, _util.listensTo)(props, 'onFocus');

    return !mouseOver || focus;
  }
}, {
  msg: 'onMouseOut must be accompanied by onBlur for accessibility.',
  url: url,
  affects: affects,
  test: function test(tagName, props) {
    var mouseOut = (0, _util.listensTo)(props, 'onMouseOut');
    var blur = (0, _util.listensTo)(props, 'onBlur');

    return !mouseOut || blur;
  }
}];
var fail = exports.fail = [{
  when: 'there is `onMouseOver` but no `onFocus`',
  render: function render(React) {
    return React.createElement('div', { onMouseOver: _util.fn });
  }
}, {
  when: 'there is `onMouseOut` but no `onBlur`',
  render: function render(React) {
    return React.createElement('div', { onMouseOut: _util.fn });
  }
}];

var pass = exports.pass = [{
  when: 'there is no `onMouseOver` or `onMouseOut`',
  render: function render(React) {
    return React.createElement('div', null);
  }
}, {
  when: 'there is `onMouseOver` but and `onFocus`',
  render: function render(React) {
    return React.createElement('div', { onMouseOver: _util.fn, onFocus: _util.fn });
  }
}, {
  when: 'there is `onMouseOut` but and `onBlur`',
  render: function render(React) {
    return React.createElement('div', { onMouseOut: _util.fn, onBlur: _util.fn });
  }
}];

var description = exports.description = '\nEnforce `onMouseOver`/`onMouseOut` are accompanied by\n`onFocus`/`onBlur`. Coding for the keyboard is important for users with\nphysical disabilities who cannot use a mouse, AT compatability, and screenreader\nusers.\n';
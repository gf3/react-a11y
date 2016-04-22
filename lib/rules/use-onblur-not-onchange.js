'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.fail = exports.pass = undefined;

var _util = require('../util');

exports.default = [{
  msg: '`onBlur` should be preferred over `onChange`, unless absolutely necessary ' + 'and it has no negative consequences for keyboard only or screen-reader users.',
  url: 'http://webaim.org/techniques/javascript/eventhandlers#onchange',
  affects: [_util.devices.keyboardOnly, _util.devices.screenReaders],
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var disabled = (0, _util.trueish)(props, 'aria-disabled');
    var readOnly = (0, _util.trueish)(props, 'aria-readonly');
    var onChange = (0, _util.listensTo)(props, 'onChange');

    return hidden || disabled || readOnly || !onChange;
  }
}];
var pass = exports.pass = [{
  when: 'there is no `onChange` prop',
  render: function render(React) {
    return React.createElement('input', null);
  }
}, {
  when: 'the element is aria-hidden',
  render: function render(React) {
    return React.createElement('input', { onChange: _util.fn, 'aria-hidden': true });
  }
}, {
  when: 'the element is aria-disabled',
  render: function render(React) {
    return React.createElement('input', { onChange: _util.fn, 'aria-disabled': true });
  }
}, {
  when: 'the element is aria-readonly',
  render: function render(React) {
    return React.createElement('input', { onChange: _util.fn, 'aria-readonly': true });
  }
}];

var fail = exports.fail = [{
  when: 'the `onChange` prop is present',
  render: function render(React) {
    return React.createElement('input', { onChange: _util.fn });
  }
}];

var description = exports.description = '\nEnforce usage of onBlur over onChange for accessibility. onBlur must be used\ninstead of onChange, unless absolutely necessary and it causes no negative\nconsequences for keyboard only or screen reader users.\n';
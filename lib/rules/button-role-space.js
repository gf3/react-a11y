'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.fail = exports.pass = undefined;

var _util = require('../util');

exports.default = {
  msg: 'You have `role="button"` but did not define an `onKeyDown` handler. ' + 'Add it, and have the "Space" key do the same thing as an `onClick` handler.',
  url: 'https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls',
  affects: [_util.devices.keyboardOnly],
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var button = props.role === 'button';
    var onKeyDown = (0, _util.listensTo)(props, 'onKeyDown');

    // rule passes when element is hidden,
    // has role='button' and has an onKeyDown prop
    return hidden || !button || onKeyDown;
  }
};
var pass = exports.pass = [{
  when: 'role="button" but there is an onKeyDown handler.',
  render: function render(React) {
    return React.createElement('div', { role: 'button', onKeyDown: _util.fn });
  }
}, {
  when: 'there is no role',
  render: function render(React) {
    return React.createElement(
      'div',
      null,
      'derp'
    );
  }
}, {
  when: 'there the role is not button',
  render: function render(React) {
    return React.createElement('div', { role: 'foo' });
  }
}, {
  when: 'the element is aria-hidden',
  render: function render(React) {
    return React.createElement('div', { 'aria-hidden': true, role: 'button' });
  }
}];

var fail = exports.fail = [{
  when: 'role="button" and no `onKeyDown` is present',
  render: function render(React) {
    return React.createElement('div', { role: 'button' });
  }
}];

var description = exports.description = '\nEnforce that elements which have the `role="button"`\nalso have an `onKeyDown` handler that handles Space or Enter\n(this is isn\'t actually checked) for poeple that are using a\nkeyboard-only device.\n';
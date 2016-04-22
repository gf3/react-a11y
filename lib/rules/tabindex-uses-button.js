'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.pass = exports.fail = undefined;

var _util = require('../util');

exports.default = [{
  tagName: 'a',
  msg: 'You have an anchor with a `tabIndex`, no `href` and no `role` DOM property. ' + 'Add `role="button"` or better yet, use a `<button/>`.',
  url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role',
  test: function test(_, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var href = 'href' in props;
    var button = props.role === 'button';
    var tabIndex = 'tabIndex' in props;

    return hidden || !tabIndex || href || button;
  }
}];
var fail = exports.fail = [{
  when: 'anchor has tabIndexbut no button',
  render: function render(React) {
    return React.createElement('a', { tabIndex: 1 });
  }
}];

var pass = exports.pass = [{
  when: 'anchor has no `tabIndex`',
  render: function render(React) {
    return React.createElement('a', null);
  }
}, {
  when: 'anchor has `role="button"`',
  render: function render(React) {
    return React.createElement('a', { role: 'button', tabIndex: 1 });
  }
}, {
  when: 'anchor has a `href`',
  render: function render(React) {
    return React.createElement('a', { href: 'foo', tabIndex: 1 });
  }
}, {
  when: 'the anchor is hidden',
  render: function render(React) {
    return React.createElement('a', { tabIndex: 1, 'aria-hidden': true });
  }
}];

var description = exports.description = '\nWhen an anchor has a `tabIndex`, but no `href` and no `role` properties,\nit is likely you are using it to emulate a `button`.  Prefer using `role="button"`\nor just use the `<button` element.\n';
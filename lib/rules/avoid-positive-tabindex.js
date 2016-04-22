'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fail = exports.pass = exports.description = undefined;

var _util = require('../util');

var description = exports.description = '\nKeyboard users move focus from one form control to the next by using the tab\nkey. By default focus order is determined by source order.\n\nThe `tabIndex` prop allows the author to specify an alternative tab order.\nElements with a `tabIndex` value greater than zero will receive focus in numerical\norder, ahead of focusable elements with a `tabIndex` of zero.\n\nIt is recommended that authors avoid positive values for the `tabIndex` attribute\nbecause it is brittle (any focusable elements added to the page without an\nexplicit `tabIndex` value greater than zero will come last in the tab order) and\ncan easily result in a page which is extremely difficult to navigate, causing\naccessibility problems.\n';

exports.default = [{
  msg: 'Avoid positive integer values for `tabIndex`.',
  AX: 'AX_FOCUS_03',
  test: function test(_, props) {
    var tabIndex = (0, _util.hasProp)(props, 'tabIndex');
    return !tabIndex || props.tabIndex <= 0;
  }
}];
var pass = exports.pass = [{
  when: 'the element has no tabIndex',
  render: function render(React) {
    return React.createElement('div', null);
  }
}, {
  when: 'the element has a negative tabIndex',
  render: function render(React) {
    return React.createElement('div', { tabIndex: -2 });
  }
}];

var fail = exports.fail = [{
  when: 'the element has no a positive tabIndex',
  render: function render(React) {
    return React.createElement('div', { tabIndex: 2 });
  }
}];
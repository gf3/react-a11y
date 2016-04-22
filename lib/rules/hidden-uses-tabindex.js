'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.fail = exports.pass = undefined;

var _util = require('../util');

exports.default = [{
  msg: 'You have `aria-hidden="true"` applied to an interactive element but have not ' + 'removed it from the tab flow. This could result in a hidden tab stop for ' + 'users of screen readers.',
  url: 'http://john.foliot.ca/aria-hidden',
  affects: [_util.devices.keyboardOnly, _util.devices.screenReaders],
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var interactive = (0, _util.isInteractive)(tagName, props);
    var tabIndex = props.tabIndex === -1;

    return !hidden || !interactive || tabIndex;
  }
}];
var pass = exports.pass = [{
  when: 'an interactive element is aria-hidden and has tabindex="-1"',
  render: function render(React) {
    return React.createElement('input', { 'aria-hidden': true, tabIndex: -1 });
  }
}, {
  when: 'the element is not interactive',
  render: function render(React) {
    return React.createElement('div', { 'aria-hidden': true });
  }
}, {
  when: 'an interactive element is not aria-hidden',
  render: function render(React) {
    return React.createElement('input', null);
  }
}];

var fail = exports.fail = [{
  when: 'an interactive element is hidden but has no tabindex',
  render: function render(React) {
    return React.createElement('input', { 'aria-hidden': true });
  }
}, {
  when: 'an interactive element is hidden but has a bad tabindex',
  render: function render(React) {
    return React.createElement('input', { 'aria-hidden': true, tabIndex: 2 });
  }
}];

var description = exports.description = '\nEnforce that interactive elements that have been removed from\nthe accessibility tree usign `aria-hidden` are also removed from\nthe tab flow by setting `tabIndex={-1}`.  If not, this could result\nin a hidden tab stop for screen reader users.\n';
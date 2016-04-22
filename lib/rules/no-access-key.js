'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.pass = exports.fail = undefined;

var _util = require('../util');

exports.default = [{
  msg: 'No `accessKey` attribute allowed. Inconsistencies ' + 'between keyboard shortcuts and keyboard comments used by screenreader ' + 'and keyboard only users create a11y complications.',
  url: 'http://webaim.org/techniques/keyboard/accesskey#spec',
  affects: [_util.devices.screenReader, _util.devices.keyboardOnly],
  test: function test(tagName, props) {
    var accessKey = (0, _util.hasProp)(props, 'accessKey');
    return !accessKey;
  }
}];
var fail = exports.fail = [{
  when: 'there is an `accessKey` prop',
  render: function render(React) {
    return React.createElement('div', { accessKey: 'a' });
  }
}];

var pass = exports.pass = [{
  when: 'there is an no `accessKey` prop',
  render: function render(React) {
    return React.createElement('div', null);
  }
}];

var description = exports.description = '\nEnforce no accessKey prop on element. Access keys are HTML elements that allow\nweb developers to assign keyboard shortcuts to elements.  Inconsistencies between\nkeyboard shortcuts and keyboard commands used by screenreader and keyboard only\nusers create accessibility complications so to avoid complications, access keys\nshould not be used.\n';
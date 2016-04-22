'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.fail = exports.pass = undefined;

var _util = require('../util');

exports.default = [{
  tagName: 'label',
  msg: 'Form controls using a label to identify them must be ' + 'programmatically associated with the control using htmlFor',
  url: 'https://www.w3.org/WAI/tutorials/forms/labels',
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var hasfor = typeof props.htmlFor === 'string';
    return hidden || hasfor;
  }
}];
var pass = exports.pass = [{
  when: 'the label is hidden',
  render: function render(React) {
    return React.createElement('label', { 'aria-hidden': true });
  }
}, {
  when: 'the label has a valid `htmlFor` prop',
  render: function render(React) {
    return React.createElement('label', { htmlFor: 'foo' });
  }
}, {
  when: 'it is not a label',
  render: function render(React) {
    return React.createElement('div', null);
  }
}];

var fail = exports.fail = [{
  when: 'a label is not hidden and has no `htmlFor`',
  render: function render(React) {
    return React.createElement('label', null);
  }
}];

var description = exports.description = '\nEnforce label tags have `htmlFor` attribute. Form controls using a `label` to\nidentify them must have only one label that is programmatically associated with\nthe control using: `<label htmlFor={/* ID or name of control*/}>...</label>`.\n';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tagName, props) {
  var tag = interactive[tagName];
  return typeof tag === 'function' ? tag(props) : tag;
};

var interactive = {
  button: true,
  input: function input(props) {
    return props.type !== 'hidden';
  },
  textarea: true,
  select: true,
  option: true,
  a: function a(props) {
    var hasHref = typeof props.href === 'string';
    var hasTabIndex = props.tabIndex !== null;
    return hasHref || !hasHref && hasTabIndex;
  }
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.fail = exports.pass = undefined;

var _util = require('../util');

// test will be run in order
exports.default = [{
  tagName: 'img',
  msg: 'The img does not have an `alt` prop, screen-readers will not know what it is',
  url: 'https://dev.w3.org/html5/alt-techniques',
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var alt = (0, _util.hasProp)(props, 'alt');

    return hidden || alt;
  },
  affects: [_util.devices.screenReaders]
}, {
  tagName: 'img',
  msg: 'The `alt` prop cannot be empty string if role="presentation" is not set.',
  url: 'https://www.w3.org/TR/wai-aria/roles#presentation',
  test: function test(tagName, props) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var empty = props.alt === '';
    var pres = props.role === 'presentation';

    return hidden || !empty || pres;
  },
  affects: [_util.devices.screenReaders]
}];
var pass = exports.pass = [{
  when: 'the img has an `alt`',
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: 'nice' });
  }
}, {
  when: 'the img has an empty `alt` and role="presentation"',
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: '', role: 'presentation' });
  }
}, {
  when: 'the img is aria-hidden',
  render: function render(React) {
    return React.createElement('img', { src: 'foo', 'aria-hidden': true });
  }
}];

var fail = exports.fail = [{
  when: 'the img doen\'t have an `alt`',
  render: function render(React) {
    return React.createElement('img', { src: 'foo' });
  }
}, {
  when: 'the img has alt="" but no role="presentation"',
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: '' });
  }
}];

var description = exports.description = '\nEnforce that an `img` element contains the `alt` prop. The `alt` attribute specifies\nan alternate text for an image, if the image cannot be displayed.\n';
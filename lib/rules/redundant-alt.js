'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.description = exports.pass = exports.fail = undefined;

var _util = require('../util');

var def = ['image', 'picture', 'photo'];

exports.default = [{
  tagName: 'img',
  msg: 'Redundant `alt` attribute. Screen-readers already announce `img` tags as an image. ' + 'You don\'t need to use the words like `image`, `photo,` or `picture` in the alt prop.',
  url: 'http://webaim.org/techniques/alttext',
  affects: [_util.devices.screenReaders],
  test: function test(_, props, _c, ctx) {
    var hidden = (0, _util.hiddenFromAT)(props);
    var alt = (props.alt || '').toLowerCase();
    var words = ctx.options[0] || def;
    var contains = words.reduce(function (a, w) {
      return a || alt.indexOf(w) >= 0;
    }, false);

    return hidden || !contains;
  }
}];
var fail = exports.fail = [{
  when: 'is a redundant alt message',
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: 'bar image foo' });
  }
}, {
  when: 'is a redundant alt message (different opts)',
  opts: [['foto']],
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: 'bar foto' });
  }
}];

var pass = exports.pass = [{
  when: 'the `alt` does not contain redundant words',
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: 'nice' });
  }
}, {
  when: 'the `alt` does not contain redundant words (different opts)',
  opts: [['foto']],
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: 'image' });
  }
}, {
  when: 'the element is aria-hidden',
  render: function render(React) {
    return React.createElement('img', { src: 'foo', alt: 'nice', 'aria-hidden': true });
  }
}];

var description = exports.description = '\nEnforce img alt attribute does not contain the word image, picture, or photo.\nScreenreaders already announce `img` elements as an image. There is no need to use\nwords such as *image*, *photo*, and/or *picture*.\n';

var options = exports.options = [{
  type: 'Array(String)',
  description: 'Words to look for when looking for redudant words.',
  def: def
}];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  tagName: 'a',
  msg: 'Links must not point to `#`. ' + 'Use a more descriptive href or use a button instead.',
  url: 'http://webaim.org/techniques/hypertext/',
  test: function test(tagName, props) {
    var hashRef = props.href && props.href === '#';
    return !hashRef;
  }
}];
var pass = exports.pass = [{
  when: 'the `href` is not `#`',
  render: function render(React) {
    return React.createElement('a', { href: 'foo#bar' });
  }
}];

var fail = exports.fail = [{
  when: 'the `href` is `#`',
  render: function render(React) {
    return React.createElement('a', { href: '#' });
  }
}];

var description = exports.description = '\nEnforce an anchor element\'s href prop value is not just `"#"`. You should use\nsomething more descriptive, or use a button instead.\n';
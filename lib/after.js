'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// store how to undo these changes
var restoreFunctions = [];

// does nothing
var noop = function noop() {
  return null;
};

var after = function after(host, name, cb) {
  if (!host) {
    throw new Error('cannot replace function on undefined');
  }

  // save original
  var original = host[name] || noop;

  // override host
  host[name] = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // perform original
    original.apply(this, args);
    // perform cb
    cb.apply(this, args);
  };

  // save restoring function
  restoreFunctions.push(function () {
    host[name] = original;
  });
};

after.restorePatchedMethods = function () {
  // perform each restoring function
  restoreFunctions.forEach(function (restore) {
    return restore();
  });

  // clear the list of functions to restore
  restoreFunctions = [];
};

after.render = function (component, fn) {
  after(component, 'componentDidMount', fn);
  after(component, 'componentDidUpdate', fn);
};

exports.default = after;
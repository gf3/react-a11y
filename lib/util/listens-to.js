'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var name = arguments[1];

  return typeof props[name] === 'function';
};
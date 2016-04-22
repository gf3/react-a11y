"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var hasProp = function hasProp(props, any) {
  if (Array.isArray(any)) {
    return any.reduce(function (a, prop) {
      return a || hasProp(props, prop);
    }, false);
  } else {
    return props && any && any in props;
  }
};

exports.default = hasProp;
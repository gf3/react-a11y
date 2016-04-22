'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var name = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    return props[name] === true || props[name] === 'true' || props[name] === name;
};
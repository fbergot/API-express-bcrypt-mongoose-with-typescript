"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// type classAllTypes = Bcrypt | Connection | Crypto | JSONWebToken | Utils;
function memoized(Class, paramsObj) {
    var lastReturn;
    return function () {
        if (lastReturn)
            return lastReturn;
        lastReturn = new Class(__assign({}, paramsObj));
        return lastReturn;
    };
}
exports["default"] = memoized;

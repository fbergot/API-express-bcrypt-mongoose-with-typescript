"use strict";
exports.__esModule = true;
exports.factory = void 0;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Bcrypt_1 = require("./Bcrypt");
var Connection_1 = require("./Connection");
var Crypto_1 = require("./Crypto");
var JSONwebToken_1 = require("./JSONwebToken");
var Utils_1 = require("./Utils");
var memoized_1 = require("../memo/memoized");
var Factory = /** @class */ (function () {
    function Factory(BcryptInstance, ConnectionInstance, CryptoInstance, JSONWebTokenInstance, UtilsInstance) {
        this.BcryptMemo = BcryptInstance;
        this.ConnectionMemo = ConnectionInstance;
        this.CryptoMemo = CryptoInstance;
        this.JSONWebTokenMemo = JSONWebTokenInstance;
        this.UtilsMemo = UtilsInstance;
    }
    Factory.prototype.InstanceBcrypt = function () {
        return this.BcryptMemo();
    };
    Factory.prototype.InstanceConnection = function () {
        return this.ConnectionMemo();
    };
    Factory.prototype.InstanceCrypto = function () {
        return this.CryptoMemo();
    };
    Factory.prototype.InstanceJSONWebToken = function () {
        return this.JSONWebTokenMemo();
    };
    Factory.prototype.InstanceUtils = function () {
        return this.UtilsMemo();
    };
    return Factory;
}());
exports["default"] = Factory;
exports.factory = new Factory((0, memoized_1["default"])(Bcrypt_1["default"], { module: bcrypt }), (0, memoized_1["default"])(Connection_1["default"], {}), (0, memoized_1["default"])(Crypto_1["default"], {}), (0, memoized_1["default"])(JSONwebToken_1["default"], { module: jwt }), (0, memoized_1["default"])(Utils_1["default"], {}));

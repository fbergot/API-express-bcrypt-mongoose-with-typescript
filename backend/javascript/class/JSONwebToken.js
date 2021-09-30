"use strict";
exports.__esModule = true;
var JSONWebToken = /** @class */ (function () {
    function JSONWebToken(JWT_module) {
        this.JWT = JWT_module;
    }
    JSONWebToken._getInstance = function (JsonWebToken_module) {
        if (!this._instance) {
            this._instance = new JSONWebToken(JsonWebToken_module);
            return this._instance;
        }
        return this._instance;
    };
    JSONWebToken.prototype.signJWT = function (payload, secret, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.JWT.sign(payload, secret, options, function (err, token) {
                err ? reject(err) : resolve(token);
            });
        });
    };
    JSONWebToken._instance = null;
    return JSONWebToken;
}());
exports["default"] = JSONWebToken;

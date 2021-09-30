"use strict";
exports.__esModule = true;
/**
 * For sign & verify token
 * @export
 * @class JSONWebToken
 */
var JSONWebToken = /** @class */ (function () {
    /**
     *Creates an instance of JSONWebToken.
     * @param {typeof jwt} JWT_module
     * @memberof JSONWebToken
     */
    function JSONWebToken(JWT_module) {
        this.JWT = JWT_module;
    }
    /**
     * Get an unique instance of JSONWebToken (singleton)
     * @static
     * @param {typeof jwt} JsonWebToken_module
     * @returns
     * @memberof JSONWebToken
     */
    JSONWebToken._getInstance = function (JsonWebToken_module) {
        if (!this._instance) {
            this._instance = new JSONWebToken(JsonWebToken_module);
            return this._instance;
        }
        return this._instance;
    };
    /**
     * sign a token
     * @param {Payload} payload
     * @param {string} secret
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof JSONWebToken
     */
    JSONWebToken.prototype.signJWT = function (payload, secret, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.JWT.sign(payload, secret, options, function (err, token) {
                err ? reject(err) : resolve(token);
            });
        });
    };
    /**
     * Verify a token
     * @param {string} token
     * @param {(jwt.Secret|jwt.GetPublicKeyOrSecret)} secret
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof JSONWebToken
     */
    JSONWebToken.prototype.verifyJWT = function (token, secret, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.JWT.verify(token, secret, options, function (err, decoded) {
                err ? reject(err) : resolve(decoded);
            });
        });
    };
    JSONWebToken._instance = null;
    return JSONWebToken;
}());
exports["default"] = JSONWebToken;

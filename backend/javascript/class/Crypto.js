"use strict";
exports.__esModule = true;
var Crypto = /** @class */ (function () {
    function Crypto() {
    }
    Crypto.generateSecretRandom = function (crypto, bytes, tag) {
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(bytes, function (err, buffer) {
                err ? reject(err) : resolve(buffer.toString(tag));
            });
        });
    };
    return Crypto;
}());
exports["default"] = Crypto;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
var user_1 = require("../models/user");
var Bcrypt_1 = require("../class/Bcrypt");
var JSONwebToken_1 = require("../class/JSONwebToken");
var crypto = require("crypto");
var Crypto_1 = require("../class/Crypto");
dotenv.config();
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController._signUp = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashPassword, user, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        salt = (_a = process.env.SALT) !== null && _a !== void 0 ? _a : "10";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Bcrypt_1["default"]._getInstance().bcyptHash(req.body.password, parseInt(salt))];
                    case 2:
                        hashPassword = _b.sent();
                        user = new user_1.modelUser({
                            email: req.body.email,
                            password: hashPassword
                        });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _b.sent();
                        res.status(201).json({ message: UserController._successMessage });
                        return [2 /*return*/, true];
                    case 4:
                        e_1 = _b.sent();
                        res.status(500).json({ error: e_1.message });
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController._login = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var filter, user, e_2, userPassword, secret, _b, paylaodSigned, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        filter = { email: req.body.email };
                        return [4 /*yield*/, user_1.modelUser.findOne(filter)];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            res.status(401).json({ message: UserController._userNotPresent });
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _c.sent();
                        res.status(500).json({ error: e_2.message });
                        return [2 /*return*/, null];
                    case 3:
                        _c.trys.push([3, 9, , 10]);
                        userPassword = user.password;
                        return [4 /*yield*/, Bcrypt_1["default"]._getInstance().bcryptCompare(req.body.password, userPassword)];
                    case 4:
                        if (!(_c.sent())) {
                            res.status(401).json({ message: UserController._badPassword });
                            return [2 /*return*/, false];
                        }
                        if (!((_a = process.env.SECRET) !== null && _a !== void 0)) return [3 /*break*/, 5];
                        _b = _a;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Crypto_1["default"].generateSecretRandom(crypto, 48, 'hex')];
                    case 6:
                        _b = _c.sent();
                        _c.label = 7;
                    case 7:
                        secret = _b;
                        return [4 /*yield*/, JSONwebToken_1["default"]._getInstance(jwt).signJWT({ userId: user._id, token: "TOKEN" }, secret, { expiresIn: '24h' })];
                    case 8:
                        paylaodSigned = _c.sent();
                        res.status(200).json({ userId: user.id, token: paylaodSigned });
                        return [2 /*return*/, true];
                    case 9:
                        e_3 = _c.sent();
                        res.status(500).json({ error: e_3.message });
                        return [2 /*return*/, null];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UserController._successMessage = 'Utilisateur crée';
    UserController._userNotPresent = 'Utilisateur non trouvé';
    UserController._badPassword = 'Mot de passe incorrect';
    return UserController;
}());
exports["default"] = UserController;
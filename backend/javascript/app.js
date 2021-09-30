"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var Connection_1 = require("./class/Connection");
var productRouter_1 = require("./router/productRouter");
var userRouter_1 = require("./router/userRouter");
var Utils_1 = require("./class/Utils");
var dotenv = require("dotenv");
var crypto = require("crypto");
var Crypto_1 = require("./class/Crypto");
dotenv.config();
// check secret in var_env or definition if is absent
if (!process.env.SECRET) {
    Crypto_1["default"].generateSecretRandom(crypto, 48, "hex")
        .then(function (secretRandom) { return process.env.SECRET = secretRandom; })["catch"](function (err) { return console.error(err.message); });
}
// mongo connection
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// connection database
Connection_1["default"]._connect(process.env.mongoUrl || "", options, mongoose);
var app = express();
var utils = Utils_1["default"]._getInstance();
// base URL
var uriProduct = "/api/stuff";
var uriAuthUser = "/api/auth";
app.use(express.json());
app.use(utils.setHeadersCORS);
// add routers
app.use(uriProduct, productRouter_1["default"]);
app.use(uriAuthUser, userRouter_1["default"]);
exports["default"] = app;

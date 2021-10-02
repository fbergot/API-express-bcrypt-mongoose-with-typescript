"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var productRouter_1 = require("./router/productRouter");
var userRouter_1 = require("./router/userRouter");
var dotenv = require("dotenv");
var crypto = require("crypto");
var Factory_1 = require("./class/Factory");
dotenv.config();
// check secret in var_env or definition if is absent
if (!process.env.SECRET) {
    Factory_1.factory.InstanceCrypto().generateSecretRandom(crypto, 48, "hex")
        .then(function (secretRandom) { return process.env.SECRET = secretRandom; })["catch"](function (err) { return console.error(err.message); });
}
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// mongo connection
Factory_1.factory.InstanceConnection().connect(process.env.mongoUrl || "", options, mongoose);
var app = express();
// base URL
var uriProduct = "/api/stuff";
var uriAuthUser = "/api/auth";
app.use(express.json());
app.use(Factory_1.factory.InstanceUtils().setHeadersCORS);
app.use("/images", express.static('images'));
// add routers
app.use(uriProduct, productRouter_1["default"]);
app.use(uriAuthUser, userRouter_1["default"]);
exports["default"] = app;

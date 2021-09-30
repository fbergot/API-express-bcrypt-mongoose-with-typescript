"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var Connection_1 = require("./class/Connection");
var productRouter_1 = require("./router/productRouter");
var userRouter_1 = require("./router/userRouter");
var Utils_1 = require("./class/Utils");
var dotenv = require("dotenv");
dotenv.config();
// mongo connection
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
Connection_1["default"]._connect(process.env.mongoUrl || "", options, mongoose);
var app = express();
var utils = new Utils_1["default"]();
// base URL
var uriProduct = "/api/stuff";
var uriAuthUser = "/api/auth";
app.use(express.json());
app.use(utils.setHeadersCORS);
// add routers
app.use(uriProduct, productRouter_1["default"]);
app.use(uriAuthUser, userRouter_1["default"]);
exports["default"] = app;

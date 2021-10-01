"use strict";
exports.__esModule = true;
var express = require("express");
var UserController_1 = require("../controller/UserController");
var router = express.Router();
var controller = new UserController_1["default"];
router.post('/signup', controller.signUp);
router.post('/login', controller.login);
exports["default"] = router;

"use strict";
exports.__esModule = true;
var express = require("express");
var UserController_1 = require("../controller/UserController");
var router = express.Router();
router.post('/signup', UserController_1["default"]._signUp);
router.post('/login', UserController_1["default"]._login);
exports["default"] = router;

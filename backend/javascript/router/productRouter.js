"use strict";
exports.__esModule = true;
var express = require("express");
var Factory_1 = require("../class/Factory");
var ProductController_1 = require("../controller/ProductController");
var Auth_1 = require("../middleware/Auth");
var multer_config_1 = require("../middleware/multer-config");
var router = express.Router();
var controller = new ProductController_1["default"];
var auth = new Auth_1["default"](Factory_1.factory.InstanceUtils(), Factory_1.factory.InstanceJSONWebToken());
router.get("/:id", function (req, res, next) { return auth.verifAuth(req, res, next); }, controller.findOne);
router.get("/", function (req, res, next) { return auth.verifAuth(req, res, next); }, controller.find);
;
router.post("/", function (req, res, next) { return auth.verifAuth(req, res, next); }, multer_config_1["default"], controller.save);
router.put("/:id", function (req, res, next) { return auth.verifAuth(req, res, next); }, multer_config_1["default"], controller.update);
router["delete"]("/:id", function (req, res, next) { return auth.verifAuth(req, res, next); }, controller["delete"]);
exports["default"] = router;

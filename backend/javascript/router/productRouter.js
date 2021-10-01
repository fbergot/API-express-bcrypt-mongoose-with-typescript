"use strict";
exports.__esModule = true;
var express = require("express");
var ProductController_1 = require("../controller/ProductController");
var Auth_1 = require("../middleware/Auth");
var multer_config_1 = require("../middleware/multer-config");
var router = express.Router();
router.get("/:id", Auth_1["default"]._verifAuth, ProductController_1["default"].findOne);
router.get("/", Auth_1["default"]._verifAuth, ProductController_1["default"].find);
;
router.post("/", Auth_1["default"]._verifAuth, multer_config_1["default"], ProductController_1["default"].save);
router.put("/:id", Auth_1["default"]._verifAuth, ProductController_1["default"].update);
router["delete"]("/:id", Auth_1["default"]._verifAuth, ProductController_1["default"]["delete"]);
exports["default"] = router;

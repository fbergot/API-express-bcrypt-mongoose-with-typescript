"use strict";
exports.__esModule = true;
exports.modelProd = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true }
});
exports.modelProd = (0, mongoose_1.model)("Product", productSchema);

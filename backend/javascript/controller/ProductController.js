"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var product_1 = require("../models/product");
/**
 * Controller for all routes
 * @export
 * @class ProductController
 */
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    /**
     * For find items
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.find = function (req, res, next) {
        product_1.modelProd.find()
            .then(function (products) { return res.status(200).json(products); })["catch"](function (e) { return res.status(400).json({ error: e.message }); });
    };
    /**
     * For find one item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.findOne = function (req, res, next) {
        var filter = { _id: req.params.id };
        product_1.modelProd.findOne(filter)
            .then(function (product) { return res.status(200).json(product); })["catch"](function (e) { return res.status(404).json({ error: e.message }); });
    };
    /**
     * For save item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.save = function (req, res, next) {
        var _a;
        // with multer, req.body change (req.body.thing is a string of body with image in)
        var objRequest = JSON.parse(req.body.thing);
        delete objRequest._id;
        // new doc
        var dataForModel = __assign(__assign({}, objRequest), { imageUrl: req.protocol + "://" + req.get('host') + "/images/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) });
        var docProduct = new product_1.modelProd(dataForModel);
        docProduct.save()
            .then(function () { return res.status(201).json({ message: 'Objet enregistré' }); })["catch"](function (e) { return res.status(400).json({ error: e.message }); });
    };
    /**
     * For update item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.update = function (req, res, next) {
        var filter = { _id: req.params.id };
        product_1.modelProd.updateOne(filter, __assign(__assign({}, req.body), filter))
            .then(function () { return res.status(200).json({ message: 'Objet modifié' }); })["catch"](function (e) { return res.status(400).json({ error: e.message }); });
    };
    /**
     * For delete
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController["delete"] = function (req, res, next) {
        var filter = { _id: req.params.id };
        product_1.modelProd.deleteOne(filter)
            .then(function (product) { return res.status(200).json(product); })["catch"](function (e) { return res.status(400).json({ message: e.message }); });
    };
    return ProductController;
}());
exports["default"] = ProductController;

import * as express from "express";
import * as mongoose from "mongoose";
import { modelProd as ProductModel } from "../models/product";
import { BasicController } from '../interface/interface';
/**
 * Controller for all routes
 * @export
 * @class ProductController
 */


export default class ProductController implements BasicController { 

    constructor() {}
    /**
     * find one product
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    find(req: express.Request, res: express.Response, next: CallableFunction): void {
        ProductModel.find()
            .then((products) => res.status(200).json(products))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));
    }

    /**
     * For find one item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    findOne(req: express.Request, res: express.Response, next: CallableFunction): void {
        const filter = { _id: req.params.id };
        ProductModel.findOne(filter)
            .then((product) => res.status(200).json(product))
            .catch((e: mongoose.Error) => res.status(404).json({ error: e.message }));
    }

    /**
     * For save item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    save(req: express.Request, res: express.Response, next: CallableFunction): void {
        // with multer, req.body change (req.body.thing is a string of body with image in)
        const objRequest = JSON.parse(req.body.thing);
        delete objRequest._id;
        // new doc
        const dataForModel = {
            ...objRequest,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`
        }
        const docProduct = new ProductModel(dataForModel);
        docProduct.save()
            .then(() => res.status(201).json({ message: 'Objet enregistré' }))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));    
    }

    /**
     * For update item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    update(req: express.Request, res: express.Response, next: CallableFunction): void {
        const filter = { _id: req.params.id };
        ProductModel.updateOne(filter, { ...req.body, ...filter })
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));
    }

    /**
     * For delete
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    delete(req: express.Request, res: express.Response, next: CallableFunction): void {
        const filter = { _id: req.params.id };
        ProductModel.deleteOne(filter)
            .then(product => res.status(200).json(product))
            .catch((e: mongoose.Error) => res.status(400).json({ message: e.message }));
    }   
}

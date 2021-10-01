import * as express from 'express';
import * as jwt from "jsonwebtoken";
import Utils from '../class/Utils';
import JSONWebToken from '../class/JSONwebToken';

export default class Auth {
    static _express: typeof express = express;
    static _jwt: typeof jwt = jwt;
    static _JSONWebToken: typeof JSONWebToken = JSONWebToken;
    static _utils: typeof Utils = Utils;
    static _unauthorized = "Requête non authentifiée";
    static _errorMessageToken = "Aucun token dans le header authorization ou mal formé";
    static _userIdNotCorrect = "User ID non valable";

    /**
     * For verif auth (with token)
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof Auth
     */
    static async _verifAuth(req: express.Request, res: express.Response, next: CallableFunction): Promise<boolean|null> {
        try {
            const token = Auth._utils._getInstance().getTokenInHeader(req, Auth._errorMessageToken);
            let userId: undefined | string;
            const decodedToken = await Auth._JSONWebToken
                ._getInstance(Auth._jwt)
                .verifyJWT(token, process.env.SECRET || "", {});           
            if (decodedToken) {
                userId = decodedToken.userId;
            }
            if (req.body.userId && req.body.userId !== userId) {
                throw Error(`${Auth._userIdNotCorrect}`);
            } else {
                next();
                return true;
            }
        } catch (e: any) {
            res.status(401).json({ error: e.message || Auth._unauthorized })
            return null;
        }
    }
}
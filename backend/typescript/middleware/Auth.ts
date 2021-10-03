import * as express from 'express';
import * as jwt from "jsonwebtoken";
import { AuthMessage } from '../enum/enum';
import { factory } from '../class/Factory';

/**
 * For auth users
 * @static
 * @use enum AuthMessage
 * @use factory
 * @use jwt
 * @use express
 * @export
 * @class Auth
 */
export default class Auth {
    static _expressMod = express;
    static _jwtMod =  jwt;
    static _UtilsInst = factory.InstanceUtils();
    static _JSONWebTokenInst = factory.InstanceJSONWebToken();
    /**
     * For verif auth (with token)
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @return {Promise<boolean>}
     * @memberof Auth
     */

    static async _verifAuth (req: express.Request, res: express.Response, next: CallableFunction) :Promise<boolean> {
        try {
            const token = Auth._UtilsInst.getTokenInHeader(req, AuthMessage.errorMessageToken);
            let userId: undefined | string;
            const decodedToken = await Auth._JSONWebTokenInst.verifyJWT(token, process.env.SECRET || "", {});           
            if (decodedToken) {
                userId = decodedToken.userId;
            }
            if (req.body.userId && (req.body.userId !== userId)) {
                throw Error(`${AuthMessage.userIdNotCorrect}`);
            } else {
                next();
                return true;              
            }
        } catch (e: any) {
            res.status(401).json({ error: e.message || AuthMessage.unauthorized })
            return false;
        }
    }
}
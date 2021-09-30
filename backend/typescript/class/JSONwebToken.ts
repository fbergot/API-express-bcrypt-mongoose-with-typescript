import * as jwt from 'jsonwebtoken';

interface Payload {
    userId: string,
    token: string
}

/**
 * For sign & verify token
 * @export
 * @class JSONWebToken
 */
export default class JSONWebToken {

    JWT: typeof jwt;
    static _instance: null | JSONWebToken = null;
    
    /**
     * Get an unique instance of JSONWebToken (singleton)
     * @static
     * @param {typeof jwt} JsonWebToken_module
     * @returns
     * @memberof JSONWebToken
     */
    static _getInstance(JsonWebToken_module: typeof jwt) {
        if (!this._instance) {
            this._instance = new JSONWebToken(JsonWebToken_module);
            return this._instance;
        }
        return this._instance;
    }

    /**
     *Creates an instance of JSONWebToken.
     * @param {typeof jwt} JWT_module
     * @memberof JSONWebToken
     */
    constructor(JWT_module: typeof jwt) {
        this.JWT = JWT_module;
    }
    
    /**
     * sign a token
     * @param {Payload} payload
     * @param {string} secret
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof JSONWebToken
     */
    signJWT(payload: Payload, secret: string, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JWT.sign(payload, secret, options, (err, token) => {
                err ? reject(err) : resolve(token);
            })
        })
    }

    /**
     * Verify a token
     * @param {string} token
     * @param {(jwt.Secret|jwt.GetPublicKeyOrSecret)} secret
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof JSONWebToken
     */
    verifyJWT(token: string, secret: jwt.Secret|jwt.GetPublicKeyOrSecret, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JWT.verify(token, secret, options, (err, decoded) => {
                err ? reject(err) : resolve(decoded)
            })
        })
    }
}

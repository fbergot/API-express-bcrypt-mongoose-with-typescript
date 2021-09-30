import * as jwt from 'jsonwebtoken';

interface Payload {
    userId: string,
    token: string
}

export default class JSONWebToken {

    JWT: typeof jwt;
    static _instance: null | JSONWebToken = null;
    
    static _getInstance(JsonWebToken_module: typeof jwt) {
        if (!this._instance) {
            this._instance = new JSONWebToken(JsonWebToken_module);
            return this._instance;
        }
        return this._instance;
    }

    constructor(JWT_module: typeof jwt) {
        this.JWT = JWT_module;
    }
    
    async signJWT(payload: Payload, secret: string, options: any): Promise<string> {
            return await this.JWT.sign(payload, secret, options);
    }
}

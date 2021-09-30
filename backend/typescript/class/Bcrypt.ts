import * as bcrypt from "bcrypt";

export default class Bcrypt {
    bcryptModule: typeof bcrypt;

    static _instance: null | Bcrypt = null;

    static _getInstance(): Bcrypt {
        if (!this._instance) {
            this._instance = new Bcrypt(bcrypt);
            return this._instance;
        }
        return this._instance;
        
    }

    /**
     *Creates an instance of Bcrypt.
     * @param {typeof bcrypt} bcryptModule
     * @memberof Bcrypt
     */
    constructor(bcryptModule: typeof bcrypt) {
        this.bcryptModule = bcryptModule;
    }

    /**
     * Hash data
     * @param {string} data
     * @param {number} salt
     * @throw 
     * @returns {Promise<string>}
     * @memberof Bcrypt
     */
    async bcyptHash(data: string, salt: number): Promise<string> {
        try {
            const hash = await this.bcryptModule.hash(data, salt);
            return hash;
        } catch (e:any) {
            throw e;
        }           
    }

    async bcryptCompare(plaintextData: string, hash: any): Promise<boolean> {
        return await this.bcryptModule.compare(plaintextData, hash);
    }
}
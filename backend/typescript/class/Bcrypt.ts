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
            return await this.bcryptModule.hash(data, salt);      
    }

    /**
     * Compare plaintext data with hash data
     * @param {string} plaintextData
     * @param {string} hash
     * @returns {Promise<boolean>}
     * @memberof Bcrypt
     */
    async bcryptCompare(plaintextData: string, hash: string): Promise<boolean> {
            return await this.bcryptModule.compare(plaintextData, hash);       
    }
}
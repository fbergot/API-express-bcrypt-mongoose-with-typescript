import * as bcrypt from "bcrypt";
import { BcryptInterface } from "../interface/interface";

/**
 * For all brypt operation
 * @export
 * @class Bcrypt
 */
export default class Bcrypt implements BcryptInterface {
    bcryptModule: typeof bcrypt;

    /**
     *Creates an instance of Bcrypt.
     * @param {typeof bcrypt} bcryptModule
     * @memberof Bcrypt
     */
    constructor(obj: { module: any }) {
        this.bcryptModule = obj.module;
    }

    /**
     * Hash data
     * @param {string} data
     * @param {number} salt
     * @returns {Promise<string>}
     * @memberof Bcrypt
     */
    async bcyptHash(data: string | Buffer, salt: number): Promise<string> {
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
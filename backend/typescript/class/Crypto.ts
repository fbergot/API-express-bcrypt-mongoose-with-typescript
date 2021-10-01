import { CryptoInterface } from '../interface/interface';

export default class Crypto {
    
    /**
     * Generate a random secret
     * @static
     * @param {*} crypto
     * @param {number} bytes
     * @param {(BufferEncoding | undefined)} tag
     * @returns {Promise<string>}
     * @memberof Crypto
     */
    static generateSecretRandom(crypto: CryptoInterface, bytes: number, tag:BufferEncoding | undefined):Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(bytes, function (err: any, buffer: Buffer) {
                err ? reject(err) : resolve(buffer.toString(tag));
           });
       })
    }
}
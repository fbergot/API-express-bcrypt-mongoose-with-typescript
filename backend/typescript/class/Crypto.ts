export default class Crypto {
    
    static generateSecretRandom(crypto: any, bytes: number, tag:BufferEncoding | undefined):Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(bytes, function (err: any, buffer: Buffer) {
                err ? reject(err) : resolve(buffer.toString(tag));
           });
       })
    }
}
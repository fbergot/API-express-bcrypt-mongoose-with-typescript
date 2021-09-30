import { Mongoose } from "mongoose";

/**
 * For connection database
 * @export
 * @class Connection
 */
export default class Connection {
    static connectionOk = "Connexion mongoDB réussie";
    static connectionNotOk = "Connexion mongoDB échouée";

    /**
     * Connection DB
     * @static
     * @param {string} urlMongoDb
     * @param {{}} options
     * @param {Mongoose} mongoose
     * @returns {Promise<boolean>}
     * @memberof Connection
     */
    static async _connect(urlMongoDb: string, options: {}, mongoose: Mongoose): Promise<boolean> {
        try {
            await mongoose.connect(urlMongoDb, options)
            console.log(`${this.connectionOk}`);
            return true;
        } catch (e:any) {
            console.error(` ${this.connectionNotOk} : ${e.message}`)
            return false;
        }            
    }
}
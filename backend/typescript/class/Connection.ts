import { Mongoose } from "mongoose";

export default class Connection {
    static connectionOk = "Connexion mongoDB réussie";
    static connectionNotOk = "Connexion mongoDB échouée";

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
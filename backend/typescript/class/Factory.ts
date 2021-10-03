import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Bcrypt from "./Bcrypt";
import Connection from "./Connection";
import Crypto from "./Crypto";
import JSONWebToken from "./JSONwebToken";
import Utils from "./Utils";
import memoized from "../memo/memoized";


// type allClass = Bcrypt | Connection | Crypto | JSONWebToken | Utils;
type classAllTypes = typeof Bcrypt | typeof Connection | typeof Crypto | typeof JSONWebToken | typeof Utils;
type callAll= () => classAllTypes;

/**
 * Allow get unique instance memoized of class
 * @export
 * @class Factory
 */
export default class Factory {

    BcryptMemo: () => any;
    ConnectionMemo: () => any;
    CryptoMemo: () => any;
    JSONWebTokenMemo:  () => any;
    UtilsMemo: () => any;

    constructor(BcryptInstance: callAll, ConnectionInstance: callAll,
        CryptoInstance: callAll, JSONWebTokenInstance: callAll, UtilsInstance: callAll) {
        this.BcryptMemo = BcryptInstance;
        this.ConnectionMemo = ConnectionInstance;
        this.CryptoMemo = CryptoInstance;
        this.JSONWebTokenMemo = JSONWebTokenInstance;
        this.UtilsMemo = UtilsInstance;
    }
    InstanceBcrypt(): Bcrypt {     
        return this.BcryptMemo();
    }  
    InstanceConnection(): Connection {     
        return this.ConnectionMemo();
    }  
    InstanceCrypto(): Crypto {     
        return this.CryptoMemo();
    }  
    InstanceJSONWebToken(): JSONWebToken {     
        return this.JSONWebTokenMemo();
    }  
    InstanceUtils(): Utils {     
        return this.UtilsMemo();
    }  
}

export const factory = new Factory (
    memoized(Bcrypt, { module:  bcrypt }),
    memoized(Connection, { module: null }),
    memoized(Crypto, { module: null }),
    memoized(JSONWebToken, { module: jwt }),
    memoized(Utils, { module: null })
)
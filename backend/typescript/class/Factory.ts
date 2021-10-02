import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Bcrypt from "./Bcrypt";
import Connection from "./Connection";
import Crypto from "./Crypto";
import JSONWebToken from "./JSONwebToken";
import Utils from "./Utils";
import memoized from "../memo/memoized";


// type allClass = Bcrypt | Connection | Crypto | JSONWebToken | Utils;

type callUndef = () => undefined;

export default class Factory {

    BcryptMemo: any;
    ConnectionMemo: any;
    CryptoMemo: any;
    JSONWebTokenMemo:  any;
    UtilsMemo: any;

    constructor(BcryptInstance: callUndef, ConnectionInstance: callUndef,
        CryptoInstance: callUndef, JSONWebTokenInstance: callUndef, UtilsInstance: callUndef) {
        this.BcryptMemo = BcryptInstance;
        this.ConnectionMemo = ConnectionInstance;
        this.CryptoMemo = CryptoInstance;
        this.JSONWebTokenMemo = JSONWebTokenInstance;
        this.UtilsMemo = UtilsInstance;
    }
    InstanceBcrypt() {     
        return this.BcryptMemo();
    }  
    InstanceConnection() {     
        return this.ConnectionMemo();
    }  
    InstanceCrypto() {     
        return this.CryptoMemo();
    }  
    InstanceJSONWebToken() {     
        return this.JSONWebTokenMemo();
    }  
    InstanceUtils() {     
        return this.UtilsMemo();
    }  
}

export const factory = new Factory(
    memoized(Bcrypt, { module: bcrypt }),
    memoized(Connection, {}),
    memoized(Crypto, {}),
    memoized(JSONWebToken, { module: jwt }),
    memoized(Utils, {})
)
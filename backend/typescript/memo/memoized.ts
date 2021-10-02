import { type } from "os";
import Bcrypt from "../class/Bcrypt";
import Connection from "../class/Connection";
import Crypto from "../class/Crypto";
import JSONWebToken from "../class/JSONwebToken";
import Utils from "../class/Utils";

// type classAllTypes = Bcrypt | Connection | Crypto | JSONWebToken | Utils;
    
export default function memoized(Class: any, paramsObj: {}) {
    let lastReturn: undefined;
    return function () {
        if (lastReturn) return lastReturn;
        lastReturn = new Class({ ...paramsObj });
        return lastReturn;
    };
}

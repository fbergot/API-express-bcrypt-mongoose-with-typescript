"use strict";
exports.__esModule = true;
/**
 * Utils
 * @export
 * @class Utils
 */
var Utils = /** @class */ (function () {
    /**
     *Creates an instance of Utils.
     * @param {http.Server} [server]
     * @memberof Utils
     */
    function Utils(server) {
        this.server = server;
        this.port = null;
    }
    /**
     * Normalize port
     * @param {string} val
     * @returns {(number | boolean)}
     * @memberof Utils
     */
    Utils.prototype.normalizePort = function (val) {
        if (isNaN(parseInt(val, 10))) {
            throw Error("invalid port: " + this.port);
        }
        else {
            this.port = parseInt(val, 10);
        }
        if (this.port >= 0) {
            return this.port;
        }
        return false;
    };
    /**
     * log message of server listening
     * @param {(number|string)} port
     * @memberof Utils
     */
    Utils.prototype.logHandler = function (port) {
        var address = this.server ? this.server.address() : undefined;
        var bind = typeof address === "string" ? "pipe: " + address : "port: " + (port ? port : "invalid");
        console.log("listening on " + bind);
    };
    /**
     * For treatment errors
     * @param {*} error
     * @memberof Utils
     */
    Utils.prototype.errorHandler = function (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        if (this.server) {
            var address = this.server.address();
            var bind = typeof address === "string" ? "pipe: " + address : "port: " + this.port;
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit();
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit();
                    break;
                default:
                    throw error;
            }
        }
    };
    /**
     * Set the headers
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof Utils
     */
    Utils.prototype.setHeadersCORS = function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    };
    return Utils;
}());
exports["default"] = Utils;

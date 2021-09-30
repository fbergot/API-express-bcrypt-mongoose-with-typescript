import * as http from "http";
import * as express from 'express';

/**
 * Utils
 * @export
 * @class Utils
 */
export default class Utils {
    server: http.Server|undefined;
    port: null | number;

    /**
     *Creates an instance of Utils.
     * @param {http.Server} [server]
     * @memberof Utils
     */
    constructor(server?: http.Server) {
        this.server = server;
        this.port = null;
    }

    /**
     * Normalize port
     * @param {string} val
     * @returns {(number | boolean)}
     * @memberof Utils
     */
    normalizePort(val: string): number | boolean {
        if (isNaN(parseInt(val, 10))) {
            throw Error(`invalid port: ${this.port}`);
        } else {
            this.port = parseInt(val, 10);
        }
        if (this.port >= 0) {
          return this.port;
        }
        return false;
    }

    /**
     * log message of server listening
     * @param {(number|string)} port
     * @memberof Utils
     */
    logHandler(port: number|boolean): void {
        const address: any = this.server ? this.server.address() : undefined;
        const bind: string = typeof address === "string" ? `pipe: ${address}` : `port: ${port ? port : "invalid"}`;
        console.log("listening on " + bind);
    }

    /**
     * For treatment errors
     * @param {*} error
     * @memberof Utils
     */
    errorHandler(error: any): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        if (this.server) {
            var address = this.server.address();            
            var bind: string = typeof address === "string" ? `pipe: ${address}` : `port: ${this.port}`;

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
    }

    /**
     * Set the headers
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof Utils
     */
    setHeadersCORS(req: express.Request, res: express.Response, next: CallableFunction): void {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    }


}
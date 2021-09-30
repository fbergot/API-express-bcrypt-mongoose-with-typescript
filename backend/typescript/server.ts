import * as http from 'http';
import app from "./app";
import Utils from "./class/Utils";
import * as dotenv from 'dotenv';

dotenv.config();

const server: http.Server = http.createServer(app);
const utils: Utils = Utils._getInstance(server);
const port = utils.normalizePort(process.env.PORT || '3000');

server.on("error", utils.errorHandler);
server.on("listening", () => utils.logHandler(port));

server.listen(port);

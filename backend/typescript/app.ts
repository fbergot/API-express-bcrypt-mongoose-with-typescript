import * as express from 'express';
import * as mongoose from "mongoose";
import * as http from 'http';
import Connection from './class/Connection';
import ProductRouter from './router/productRouter';
import UserRouter from './router/userRouter';
import Utils from './class/Utils';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import Crypto from './class/Crypto';

dotenv.config();

// check secret in var_env or definition if is absent
if (!process.env.SECRET) {
    Crypto.generateSecretRandom(crypto, 48, "hex")
      .then((secretRandom) => process.env.SECRET = secretRandom)
      .catch(err => console.error(err.message));
}

// mongo connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connection database
Connection._connect(process.env.mongoUrl || "", options, mongoose);

const app: express.Application = express();
const utils: Utils = Utils._getInstance();
// base URL
const uriProduct = "/api/stuff";
const uriAuthUser = "/api/auth";

app.use(express.json());
app.use(utils.setHeadersCORS);

// add routers
app.use(uriProduct, ProductRouter);
app.use(uriAuthUser, UserRouter);


export default app;


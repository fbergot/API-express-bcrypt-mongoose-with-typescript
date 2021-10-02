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
import { factory } from './class/Factory';

dotenv.config();

// check secret in var_env or definition if is absent
if (!process.env.SECRET) {
    factory.InstanceCrypto().generateSecretRandom(crypto, 48, "hex")
      .then((secretRandom: string) => process.env.SECRET = secretRandom)
      .catch((err: any) => console.error(err.message));
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// mongo connection
factory.InstanceConnection().connect(process.env.mongoUrl || "", options, mongoose);

const app: express.Application = express();
// base URL
const uriProduct = "/api/stuff";
const uriAuthUser = "/api/auth";

app.use(express.json());
app.use(factory.InstanceUtils().setHeadersCORS);
app.use("/images", express.static('images'))

// add routers
app.use(uriProduct, ProductRouter);
app.use(uriAuthUser, UserRouter);


export default app;


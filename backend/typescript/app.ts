import * as express from 'express';
import * as mongoose from "mongoose";
import ProductRouter from './router/productRouter';
import UserRouter from './router/userRouter';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { factory } from './class/Factory';

dotenv.config();

// check secret in var_env or definition if is absent
if (!process.env.SECRET) {
    factory.InstanceCrypto().generateSecretRandom(crypto, 48, "hex")
      .then((secretRandom: string) => process.env.SECRET = secretRandom)
      .catch((err: Error) => console.error(err.message));
}

const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

// mongo connection
factory.InstanceConnection().connect(process.env.mongoUrl || "", options, mongoose);

const app: express.Application = express();
// base URL
const baseUrlProduct = "/api/stuff";
const baseUrlAuthUser = "/api/auth";

app.use(express.json());
app.use(factory.InstanceUtils().setHeadersCORS);
app.use("/images", express.static('images'))

// add routers
app.use(baseUrlProduct, ProductRouter);
app.use(baseUrlAuthUser, UserRouter);


export default app;


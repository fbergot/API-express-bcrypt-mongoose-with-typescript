import * as express from 'express';
import * as mongoose from "mongoose";
import * as http from 'http';
import Connection from './class/Connection';
import ProductRouter from './router/productRouter';
import UserRouter from './router/userRouter';
import Utils from './class/Utils';
import * as dotenv from 'dotenv';

dotenv.config();

// mongo connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

Connection._connect(process.env.mongoUrl || "", options, mongoose);

const app: express.Application = express();
const utils: Utils = new Utils();
// base URL
const uriProduct = "/api/stuff";
const uriAuthUser = "/api/auth";

app.use(express.json());
app.use(utils.setHeadersCORS);

// add routers
app.use(uriProduct, ProductRouter);
app.use(uriAuthUser, UserRouter);


export default app;


import * as express from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import { modelUser, User } from "../models/user";
import { BasicUserController } from '../interface/interface';
import { MessagesUserController } from '../enum/enum';
import { factory } from '../class/Factory';

dotenv.config();


export default class UserController implements BasicUserController {

    constructor() {};
    /**
     * For signup 
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @returns {Promise<boolean>}
     * @memberof UserController
     */
    async signUp(req: express.Request, res: express.Response, next: CallableFunction): Promise<boolean> {
        const salt = process.env.SALT ?? "10";
        try {
            const hashPassword = await factory.InstanceBcrypt().bcyptHash(req.body.password, parseInt(salt));
            const user = new modelUser(
                {
                    email: req.body.email,
                    password: hashPassword
                }
            );
            await user.save()
            res.status(201).json({ message: MessagesUserController.success });
            return true;
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return false;
        }        
    }

    /**
     * For login
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @returns {(Promise<boolean|null>)}
     * @memberof UserController
     */
    async login(req: express.Request, res: express.Response, next: CallableFunction): Promise<boolean|null> {
        try {
            const filter: mongoose.FilterQuery<User> = { email: req.body.email };
            var user = await modelUser.findOne(filter);               
            if (!user) {
                res.status(401).json({ message: MessagesUserController.notPresent });
                return null;
            }                           
        } catch (e:any) {
            res.status(500).json({ error: e.message });
            return null;
        }

        try {
            const userPassword:string = user.password;
            if (!await factory.InstanceBcrypt().bcryptCompare(req.body.password, userPassword)) {
              res.status(401).json({ message: MessagesUserController.badPassword });
              return false;
            }
            const secret = process.env.SECRET ?? "";
            const paylaodSigned = await factory.InstanceJSONWebToken().signJWT({ userId: user._id }, secret, {expiresIn: '24h'});
            res.status(200).json({ userId: user.id, token: paylaodSigned });
            return true;
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return null; 
        }
    }
}

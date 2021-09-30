import * as express from "express";
import * as mongoose from "mongoose";
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { modelUser, User } from "../models/user";
import Bcrypt from "../class/Bcrypt";
import JSONWebToken from '../class/JSONwebToken';
import * as crypto from 'crypto';
import Crypto from '../class/Crypto';

dotenv.config();

export default class UserController {
    static _successMessage = 'Utilisateur crée';
    static _userNotPresent = 'Utilisateur non trouvé';
    static _badPassword = 'Mot de passe incorrect';

    static async _signUp(req: express.Request, res: express.Response, next: CallableFunction): Promise<boolean> {
        const salt = process.env.SALT ?? "10";
        try {
            const hashPassword = await Bcrypt._getInstance().bcyptHash(req.body.password, parseInt(salt));
            const user = new modelUser(
                {
                    email: req.body.email,
                    password: hashPassword
                }
            );
            await user.save()
            res.status(201).json({ message: UserController._successMessage });
            return true;
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return false;
        }        
    }

    static async _login(req: express.Request, res: express.Response, next: CallableFunction): Promise<boolean|null> {
        try {
            const filter:mongoose.FilterQuery<User> = { email: req.body.email };
            var user = await modelUser.findOne(filter);               
            if (!user) {
                res.status(401).json({ message: UserController._userNotPresent });
                return null;
            }                           
        } catch (e:any) {
            res.status(500).json({ error: e.message });
            return null;
        }

        try {
            const userPassword:string = user.password;
            if (!await Bcrypt._getInstance().bcryptCompare(req.body.password, userPassword)) {
              res.status(401).json({ message: UserController._badPassword });
              return false;
            }
            const secret = process.env.SECRET ?? await Crypto.generateSecretRandom(crypto, 48, 'hex');
            const paylaodSigned = await JSONWebToken._getInstance(jwt).signJWT({ userId: user._id, token: "TOKEN" }, secret, {expiresIn: '24h'});
            res.status(200).json({ userId: user.id, token: paylaodSigned });
            return true;
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return null; 
        }
    }
}

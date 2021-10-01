import {Request, Response} from 'express';

export interface BasicController {   
    find: (req: Request, res: Response, next: CallableFunction) => void,
    findOne: (req: Request, res: Response, next: CallableFunction) => void,
    save: (req: Request, res: Response, next: CallableFunction) => void,
    update: (req: Request, res: Response, next: CallableFunction) => void,
    delete: (req: Request, res: Response, next: CallableFunction) => void, 
}

export interface CryptoInterface {
    randomBytes: (bytes: number, callback: (err: any, buffer: Buffer) => void) => void;
}

export interface BasicUserController {
    signUp: (req: Request, res: Response, next: CallableFunction) => Promise<boolean>,
    login: (req: Request, res: Response, next: CallableFunction) => Promise<boolean|null>
}

export interface PayloadInterface {
    userId: string,
    token: string
}
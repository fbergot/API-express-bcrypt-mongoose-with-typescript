import * as express from 'express';
import Controller from '../controller/UserController';

const router: express.Router = express.Router();

router.post('/signup', Controller._signUp);
router.post('/login', Controller._login);

export default router;

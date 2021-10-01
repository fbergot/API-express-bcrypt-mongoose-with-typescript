import * as express from 'express';
import Controller from '../controller/UserController';

const router: express.Router = express.Router();
const controller = new Controller;

router.post('/signup', controller.signUp);
router.post('/login', controller.login);

export default router;

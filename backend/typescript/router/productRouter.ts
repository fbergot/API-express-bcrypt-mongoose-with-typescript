import * as express from "express";
import Controller from "../controller/ProductController";
import Auth from "../middleware/Auth";
import multer from '../middleware/multer-config';

const router: express.Router = express.Router();
const controller = new Controller;

router.get(`/:id`, Auth._verifAuth, controller.findOne);
router.get(`/`, Auth._verifAuth, controller.find);;
router.post(`/`, Auth._verifAuth, multer,  controller.save);
router.put(`/:id`, Auth._verifAuth, controller.update);
router.delete(`/:id`, Auth._verifAuth, controller.delete);

export default router;





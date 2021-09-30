import * as express from "express";
import Controller from "../controller/ProductController";

const router: express.Router = express.Router();

router.get(`/:id`, Controller.findOne);
router.get(`/`, Controller.find);;
router.post(`/`, Controller.save);
router.put(`/:id`, Controller.update);
router.delete(`/:id`, Controller.delete);

export default router;





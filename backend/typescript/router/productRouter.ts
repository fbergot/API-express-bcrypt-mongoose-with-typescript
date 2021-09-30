import * as express from "express";
import Controller from "../controller/ProductController";
import Auth from "../middleware/Auth";

const router: express.Router = express.Router();

router.get(`/:id`, Auth._verifAuth, Controller.findOne);
router.get(`/`, Auth._verifAuth, Controller.find);;
router.post(`/`, Auth._verifAuth, Controller.save);
router.put(`/:id`, Auth._verifAuth, Controller.update);
router.delete(`/:id`, Auth._verifAuth, Controller.delete);

export default router;





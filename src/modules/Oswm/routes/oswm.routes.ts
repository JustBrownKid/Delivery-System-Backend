import oswmControllers from "../controllers/oswm.controllers";
import { Router } from "express";

const router = Router();

router.post('/', oswmControllers.create);
router.post('/upload', oswmControllers.createMultiple);
router.get('/:trackingId', oswmControllers.getOswm);
// router.get("/date", oswmControllers.getOswmByDateRange);

export default router;
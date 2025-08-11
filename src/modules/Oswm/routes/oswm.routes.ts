// src/modules/Oswm/routes/oswm.routes.ts
import oswmControllers from "../controllers/oswm.controllers";
import { Router } from "express";

const router = Router();

router.post('/', oswmControllers.create);
router.get('/:trackingId', oswmControllers.getOswm);

export default router;
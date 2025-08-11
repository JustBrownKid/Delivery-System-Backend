import orderControllers from "../controllers/order.controllers";
import Router from "express";

const router = Router();
router.get("/search/", orderControllers.searchOrder);
router.post("/", orderControllers.create);
router.post("/uplode", orderControllers.createMultiple);
router.get("/:trackingId", orderControllers.ByTracking);
router.get("/s/:shipperId", orderControllers.ByShipperId);
router.put('/update/:tracking' , orderControllers.editDeliFee )

export default router;

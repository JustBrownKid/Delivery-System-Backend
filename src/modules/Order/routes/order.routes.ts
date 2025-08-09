import orderControllers from "../controllers/order.controllers";
import Router from "express";

const router = Router();
router.get("/search/", orderControllers.searchOrder);
router.post("/", orderControllers.create);
router.get("/:trackingId", orderControllers.ByTracking);
router.get("/s/:shipperId", orderControllers.ByShipperId);

export default router;

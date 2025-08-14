import orderControllers from "../controllers/order.controllers";
import Router from "express";

const router = Router();
router.get("/search/", orderControllers.searchOrder);
router.get("/", orderControllers.getAll);
router.post("/", orderControllers.create);
router.post("/upload", orderControllers.createMultiple);
router.get("/:trackingId", orderControllers.ByTracking);
router.get("/shipper/:shipperId", orderControllers.ByShipperId);
router.put('/update/:trackingId' , orderControllers.editDeliFee )
router.put('/OrderUpdate/:trackingId' , orderControllers.orderUpdate )

export default router;

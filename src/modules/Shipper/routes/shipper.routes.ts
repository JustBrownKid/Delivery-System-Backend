import { Router } from "express";
import shipperControllers from "../controllers/shipper.controllers";
import { validate ,validateMultiple} from "../../../common/utils/middleware/vaildation.middleware";
import { shipperRegisterSchema ,multiShipperRegisterSchema } from "../validation/shipper.validation";

const router =  Router()

router.post('/', validate(shipperRegisterSchema) ,shipperControllers.create);
router.post('/uplode', validateMultiple(multiShipperRegisterSchema) , shipperControllers.createMultipleShippers);
router.get('/:shipperId' , shipperControllers.findByShipperId)

export default router;

import { Router } from "express";
import authController from "../controllers/auth.controllers";
import { validate } from "../../../common/utils/middleware/vaildation.middleware";
import { registerSchema ,loginSchema  ,findEmail} from "../validation/auth.validation";
const router =  Router()

router.get('/find-by-email',validate(findEmail), authController.findByEmail)
router.post('/login' , validate(loginSchema) ,authController.login)
router.get('/:id' , authController.findById)
router.post('/register' , validate(registerSchema) ,authController.register)
router.post('/verify' , authController.verifyOtp)

export default router;

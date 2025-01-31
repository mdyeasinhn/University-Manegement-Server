import  express  from "express";
import validateRequest from "../../maddwares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";



const router = express.Router();

router.post(
    '/login', validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);

export const AuthRoute = router;
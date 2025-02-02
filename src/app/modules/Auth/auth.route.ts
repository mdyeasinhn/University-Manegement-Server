import  express  from "express";
import validateRequest from "../../maddwares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../maddwares/auth";
import { USER_ROLE } from "../User/user.constant";



const router = express.Router();

router.post(
    '/login', validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);
router.post(
    '/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(AuthValidation.changePasswordValidationSchema), AuthControllers.changePassword,
    AuthControllers.loginUser,
);

export const AuthRoute = router;
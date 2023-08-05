import { Router }from "express"
import {validation} from "../../middleware/validation.middleware.js";
import { asyncHandlier } from "../../utils/errorHandling.js";
import { forgetPassword, Login_Validation_Schema, resetPassword, signUp_Validation_Schema } from "./auth.validation.js";
import * as authController from "./controller/auth.controller.js"
const router=Router();

//signup
router.post('/signup',validation(signUp_Validation_Schema)  ,asyncHandlier(authController.signUp))
//confirm Email
router.get('/confirmEmail/:token'  ,asyncHandlier(authController.confirmEmail))
//new confirm Email
router.get('/newConfirmEmail/:token'  ,asyncHandlier(authController.newconfirmEmail))
//log in
router.post('/login',validation(Login_Validation_Schema) ,asyncHandlier(authController.logIn))
//forgetpassword
router.post('/password',validation(forgetPassword),asyncHandlier(authController.forgetPassword))
//resetpassword
router.post('/resetPassword/:userId/:f_p_token',validation(resetPassword),asyncHandlier(authController.resetPassword))

export default router
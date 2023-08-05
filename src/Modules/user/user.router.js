import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/isAdmin.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { fileUploadCloud, fileValidationCloud } from "../../utils/cloudmulter.js";
import { asyncHandlier } from "../../utils/ErrorHandling.js";
//import { fileUpload, fileValidation } from "../../utils/multer.js";

import * as userController from "../user/controller/user.controller.js";
import { updatePassword } from "./user.validation.js";

const router = Router();

router.get("/",auth,isAdmin,asyncHandlier(userController.getAllUsers));
router.patch("/deleteUser",auth,asyncHandlier(userController.userSoftDelete));
router.get("/profile", auth,asyncHandlier(userController.profile));
router.patch("/updateProfile", auth,asyncHandlier(userController.updateProfile));
router.patch("/updatePassword", auth,validation(updatePassword),asyncHandlier(userController.updatePassword));
 router.patch("/profilePiccloud",fileUploadCloud({ customValidation: fileValidationCloud.image}).single("image"),auth,asyncHandlier(userController.profilePicClould));
// router.patch("/profilePic",
// fileUpload({customPath:"/user/profile",
//  customValidation:fileValidation.image}).single("image"),auth,
//  userController.profilePic);
 



export default router;

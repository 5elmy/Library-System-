import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/isAdmin.middleware.js";
import { fileUploadCloud, fileValidationCloud } from "../../utils/cloudmulter.js";
import { asyncHandlier } from "../../utils/ErrorHandling.js";
import * as bookController from './controller/books.controller.js'

const router =Router();

router.post('/',
fileUploadCloud({customValidation:fileValidationCloud.image}).single('image'),
 auth, 
isAdmin,
asyncHandlier(bookController.addBook))  

router.delete("/deleteBook/:bookId",auth,isAdmin,bookController.deleteBook)

router.get("/",auth,bookController.getbooks)
router.get("/validBooks",auth,bookController.getValidbooks)

router.get("/invalidBooks",auth,bookController.getInvalidbooks)

router.patch("/resevedBook/:bookId",auth,bookController.resevedBook)
router.patch("/:bookId/reverBook",auth,bookController.reverBook)
router.patch("/:bookId/calculate",auth,bookController.calcmoney)
// router.put("/updateBook/:bookId",fileUploadCloud({customValidation:fileValidationCloud.image}).single('image'),auth,isAdmin,asyncHandlier(bookController.updateBook))

export default router
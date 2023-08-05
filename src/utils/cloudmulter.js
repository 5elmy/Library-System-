import multer from "multer";



 export const  fileValidationCloud={
    image:["image/gif","image/jpeg","image/png","image/tiff"],
    file:["application/pdf","application/msword"]
 }

 export const fileUploadCloud=({customValidation = fileValidationCloud.image})=>{
   
  
    const storage = multer.diskStorage({})

    const fileFilter=(req,file,cb)=>{
        if(customValidation.includes(file.mimetype))
        {
          cb(null,true)
        }else{
            cb("in-vaild format",false)
        }
    }

    const upload=multer({fileFilter,storage});
    return upload

}
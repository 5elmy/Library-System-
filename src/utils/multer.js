import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import {fileURLToPath} from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
 export const  fileValidation={
    image:["image/gif","image/jpeg","image/png","image/tiff"],
    file:["application/pdf","application/msword"]
 }

 export const fileUpload=({customPath="general",customValidation=fileValidation.image})=>{
   
    const fullpath = path.join(__dirname,`../uploads/${customPath}`)
    if(!fs.existsSync(fullpath))
    {
        fs.mkdirSync(fullpath ,{recursive:true}) 
    }

    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
          
            cb(null,fullpath)
        },
        filename:(req,file,cb)=>{
            const suffixName=nanoid()+"_"+file.originalname;
            file.dest = `Uploads/${customPath}/${suffixName}`// image link 
            cb(null,suffixName)
        }
    })

    const fileFilter=(req,file,cb)=>{
        if(customValidation.includes(file.mimetype))
        {
          cb(null,true)
        }else{
            cb(null,false)
        }
    }

    const upload=multer({fileFilter,storage});
    return upload

}
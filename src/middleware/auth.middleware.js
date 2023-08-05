import userModel from "../../DB/models/User.model.js";
import {  asyncHandlier } from "../utils/ErrorHandling.js";
import { verifyToken } from "../utils/generateAndVerifyToken.js";



const auth= asyncHandlier(async(req,res,next)=>{
    const authorization = req.headers.authorization
    //console.log(authorization);
    if(!authorization)
    {
        return next(new Error('Authorization is required'))
    }
    if(!authorization.startsWith(process.env.BEARER_KEY))
    {
     return next(new Error('in-vaild authorization'))
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    //console.log("token  ///////////////   "+token)
   if(!token)
    {
        return next(new Error('token is required'))
    }
    
     const decoded = verifyToken({payload:token})
    //  console.log("decoded : *****  " + decoded)
     if(!decoded.id || !decoded.isLoggedIN)
     {
        return next(new Error('in-valid token payload...'))
     }
     const authuser = await userModel.findById(decoded.id)
     //console.log(authuser)
     if(!authuser || authuser.isDeleted ==true)
     {
        return next(new Error('not register account.. Alab beeعd'))
     }
     req.user = authuser;
     
     return next()
    
    }
)
export default auth
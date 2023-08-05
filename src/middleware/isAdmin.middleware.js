import { asyncHandlier, StatusCodeError } from "../utils/errorHandling.js"

const isAdmin = asyncHandlier(async (req,res,next)=>{
 
    if(req.user.role != "admin")
    {
        return next(new StatusCodeError('you is not admin ' ,403))
    }
    else
    {
        next()
    }

})
export default isAdmin
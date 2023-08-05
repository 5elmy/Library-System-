
 export class StatusCodeError extends Error
 {
   constructor(message, statusCode){
    super(message);
    this.statusCode= statusCode
   }

 }

export const asyncHandlier =(fn)=>{
    return (req,res,next)=>{
      fn(req,res,next).catch((err)=> {
        console.log("err .... "+err)
         next(new Error(err))

       // return next(new StatusCodeError(err,500))
         
                   

      })
    }
}

export const globalErrorHandling= (err,req,res,next)=>{
  
    if(err)
    {
      console.log(err)
        const status = err.statusCode || 500;
        const message = err.message;
        return res.status(status).json({message:message })
      //  return res.status(status).json({message:err.message })
        
    }
}

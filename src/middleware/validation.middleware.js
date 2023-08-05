import Joi from "joi";

export const generalFelids ={
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().pattern( new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) .required(),
    id:Joi.string().min(24).max(24).required(),
    phone:Joi.number().integer().min(11).max(11),
    gender: Joi.string().valid("Male","Female"),
    age:Joi.number().integer().min(18).max(95),
    userName:Joi.string().alphanum()
}

export  const validation= (schema)=>{
  
        return (req,res,next)=>{
            const copyReq ={...req.body,...req.params,...req.query , ...req.file };
            const {error} = schema.validate(copyReq,{abortEarly:false})
           // const validationresult = signUp_Validation_Schema.validate(copyReq,{abortEarly:false})

            if(error)
            {
                return next(new Error(error))
            }
            else
            {
                next()
            }
         }
 }

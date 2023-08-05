import Joi from "joi"
import { generalFelids } from "../../middleware/validation.middleware.js"



export const signUp_Validation_Schema=Joi.object({
  userName:generalFelids.userName.required(),                             
  email:generalFelids.email , //email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: generalFelids.password,    //Joi.string().pattern( new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
  confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
  age:generalFelids.age,
  gender: generalFelids.gender ,
  phone:generalFelids.phone
}).required()

export const Login_Validation_Schema=Joi.object({
      
    email:generalFelids.email ,
    password: generalFelids.password
  }).required();

  export const resetPassword =Joi.object({
    userId:generalFelids.id,
    password:generalFelids.password
  }).required();

  export const forgetPassword =Joi.object({
  email:generalFelids.email
  }).required()

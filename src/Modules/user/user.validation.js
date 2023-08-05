import Joi from "joi";
import { generalFelids } from "../../middleware/validation.middleware.js";


export const updatePassword =
    Joi.object({
        oldPassword:generalFelids.password,
        newPassword:generalFelids.password.invalid(Joi.ref('oldPassword')),
        confirmPassword:generalFelids.password.valid(Joi.ref('newPassword'))
    }).required()
export const updateProfile =
    Joi.object({
        userName:generalFelids.userName,
        phone:generalFelids.phone,
        age:generalFelids.age,
        gender:generalFelids.gender
    }).required()

import Joi from "joi";

export const userValidation = Joi.object({
    userName : Joi.string().min(5).max(30).required(),
    email : Joi.string().email().min(3).required(),
    password : Joi.string().min(8).required(),
    profileImage : Joi.string().optional(),
    role : Joi.string().optional(),
})


export const loginValidation = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
})
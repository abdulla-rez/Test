import Joi from "joi";

export const userRegisterSchema = Joi.object({
    email: Joi.string().required().messages({
        "string.base": "email should be a string",
        "string.empty": "email must contain a value",
        "any.required": "email is a required field"
    }),
    name: Joi.string().min(3).required().messages({
        "string.base": "name should be a string",
        "string.empty": "name must contain a value",
        "string.min": "name must be atleast 3 characters",
        "any.required": "name is a required field"
    }),
    password: Joi.string().min(3).required().messages({
        "string.base": "password should be a text",
        "string.min": "passowrd must be atleast 3 characters",
        "any.required": "password is a required field"
    }),
    role: Joi.string().optional().messages({
        "string.base": "role should be a string",
    })
})
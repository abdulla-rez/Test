import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";
import { createUser, findUserByEmail, userRepo } from "../services/auth.service";
import { instanceToPlain } from "class-transformer";
import { generateAccessToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name,email,password,role} = req.body;

        const user = await findUserByEmail(email);
        if(user){
            throw new ApiError("Email already registered", 409)
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

       const newUser = userRepo.create({
        name,
        email,
        password:hashedPassword,
        role
       })

       await userRepo.save(newUser)

        res.status(201).json({
            success: true,
            message: "User registration successful",
            data: instanceToPlain(newUser)
        })
   
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body
        const userFound = await findUserByEmail(email);
        if(!userFound){
            throw new ApiError("user not found", 404);
        }

        const match = await bcrypt.compare(password, userFound.password);

        if(!match){
            throw new ApiError("Invalid credentials");
        }

        const accessToken = await generateAccessToken({
            user_id: userFound.user_id,
            name: userFound.name,
        })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: instanceToPlain(userFound),
                accessToken
            }
        })
       
    } catch (error) {
        next(error)
    }
}

import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
dotenv.config();
import jwt from 'jsonwebtoken'
import { LoginUserRequest } from '../interface/user'

export interface ExtendedUser extends Request{
    info?: LoginUserRequest
}

export const verifyToken = (req:ExtendedUser, res:Response, next:NextFunction) =>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.status(404).json({
                message: "You do not have access"
            })
        }

        const data = jwt.verify(token, process.env.SECRET as string) as LoginUserRequest;
        console.log('Decoded Token:', data);
        req.info = data;

        
        
    } catch (error) {
        return res.json({
            message: error
        })
    }

    next();
}





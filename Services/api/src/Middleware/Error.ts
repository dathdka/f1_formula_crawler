import { Request, Response, NextFunction } from "express"

export const errorHandlerMiddleware = async (err : Error, req : Request, res : Response, next : NextFunction) => {
    try {
        next();
    } catch (error) {
        
        console.error(err);
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
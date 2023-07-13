import { logger } from "../Initialize/logger";
import { Request, Response, NextFunction } from "express"

export const errorHandlerMiddleware = async (err : Error, req : Request, res : Response, next : NextFunction) => {
    try {
        next();
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
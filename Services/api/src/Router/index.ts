import { Router } from "express";
import { router as driverRouter } from "./drivers";

export const router = Router();
router.use('/driver',driverRouter);



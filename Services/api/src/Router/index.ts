import { Router } from "express";
import { router as driverRouter } from "./drivers";
import { router as seasonRouter } from "./seasons";

export const router = Router();
router.use("/driver", driverRouter);
router.use("/season", seasonRouter);

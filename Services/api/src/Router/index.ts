import { Router } from "express";
import { router as driverRouter } from "./drivers";
import { router as seasonRouter } from "./seasons";
import { router as carSeason } from "./cars";

export const router = Router();
router.use("/driver", driverRouter);
router.use("/season", seasonRouter);
router.use("/car", carSeason);

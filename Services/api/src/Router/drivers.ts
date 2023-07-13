import { Router } from "express";
import { getAll, getDriverById } from "../Service/drivers";
import { driverValidator } from "../Middleware/Driver";
export const router = Router();

router.get("/", driverValidator ,getAll);
router.get("/:id", getDriverById);

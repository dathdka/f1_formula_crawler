import { Router } from "express";
import { getAll, getDriversHadBeenDrivenCar } from "../Service/cars";
import { queryStringMiddleware } from "../Middleware/queryString";
export const router = Router();

router.get("/", queryStringMiddleware, getAll);
router.get("/:name/driver", getDriversHadBeenDrivenCar);

import { Router } from "express";
import { getAll, getDriverById , getSeasonsByDriverId, getCarsByDriverId, getDriverCareerByDriverId } from "../Service/drivers";
import { queryStringMiddleware } from "../Middleware/queryString";
export const router = Router();

router.get("/", queryStringMiddleware, getAll);
router.get("/:id", getDriverById);
router.get("/:id/seasons", getSeasonsByDriverId)
router.get("/:id/cars", getCarsByDriverId)
router.get("/:id/career", getDriverCareerByDriverId)
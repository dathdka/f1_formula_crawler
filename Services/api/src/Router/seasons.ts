import { Router } from "express";
import { queryStringMiddleware } from "../Middleware/queryString";
import {
  getAll,
  getWinner,
  getSeasonByName,
  getTeamsByName,
} from "../Service/seasons";
export const router = Router();

router.get("/", queryStringMiddleware, getAll);
router.get("/:name", getSeasonByName);
router.get("/:name/winner", getWinner);
router.get("/:name/teams", getTeamsByName);

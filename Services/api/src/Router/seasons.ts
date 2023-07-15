import { Router } from "express";
import { queryStringMiddleware } from "../Middleware/queryString";
import { getAll, getWinner } from "../Service/seasons";
export const router = Router();

router.get("/", queryStringMiddleware, getAll);
router.get("/:name/winner", getWinner);

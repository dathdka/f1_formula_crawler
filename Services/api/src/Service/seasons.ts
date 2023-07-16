import { Request, Response } from "express";
import { parseQueryString } from "../Utils/parseQueryString";
import { logger } from "../Initialize/logger";
import {
  all,
  champion,
  getByName,
  getTeamsBySeasonName,
} from "../Repos/seasons";
const ERROR = require("../constants").ERROR_MESSAGE;

export const getAll = async (req: Request, res: Response) => {
  try {
    const queryString = req.query;
    const { conditions, page, limit } = parseQueryString(queryString);
    const seasons = await all(conditions, page, limit);
    return res.status(200).json(seasons);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getWinner = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name || name.match(/[^0-9]/)) {
      return res.status(400).send("Invalid name");
    }
    const winner = await champion(name);
    return res.status(200).json(winner);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getSeasonByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name || name.match(/[^0-9]/)) {
      return res.status(400).send("Invalid name");
    }
    const seasonInfo = await getByName(name);
    return res.status(200).json(seasonInfo);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getTeamsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name || name.match(/[^0-9]/)) {
      return res.status(400).send("Invalid name");
    }
    const teamRank = await getTeamsBySeasonName(name);
    return res.status(200).json(teamRank);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

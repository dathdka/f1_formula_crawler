import { Request, Response } from "express";
import { parseQueryString } from "../Utils/parseQueryString";
import { all, getDriversByCarName } from "../Repos/cars";
import { logger } from "../Initialize/logger";

const ERROR = require("../constants").ERROR_MESSAGE;

export const getAll = async (req: Request, res: Response) => {
  try {
    const queryString = req.query;
    const { conditions, page, limit } = parseQueryString(queryString);
    const cars = await all(conditions, page, limit);
    return res.status(200).json(cars);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getDriversHadBeenDrivenCar = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.params;
    const drivers = await getDriversByCarName(name);
    return res.status(200).json(drivers);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

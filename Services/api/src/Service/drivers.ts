import { Request, Response } from "express";
import { all, getById } from "../Repos/drivers";
import { parseQueryString } from "../Utils/parseQueryString";
import { logger } from "../Initialize/logger";

const ERROR_MESSAGE = "something went wrong, please try again later";

export const getAll = async (req: Request, res: Response) => {
  try {
    const queryString = req.query;
    const { conditions, page, limit } = parseQueryString(queryString);
    const drivers = await all(conditions, page, limit);
    return res.status(200).json(drivers);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR_MESSAGE });
  }
};

export const getDriverById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const driver = await getById(id);
    return res.status(200).json(driver);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR_MESSAGE });
  }
};

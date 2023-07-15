import { Request, Response } from "express";
import { all, getById, getSeasonsById, getCarsById, getDriverCareerById } from "../Repos/drivers";
import { parseQueryString } from "../Utils/parseQueryString";
import { logger } from "../Initialize/logger";

const ERROR = require("../constants").ERROR_MESSAGE;

export const getAll = async (req: Request, res: Response) => {
  try {
    const queryString = req.query;
    const { conditions, page, limit } = parseQueryString(queryString);
    const drivers = await all(conditions, page, limit);
    return res.status(200).json(drivers);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getDriverById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (Number.isNaN(+id)) return res.status(400).send("Invalid id");
    const driver = await getById(+id);
    return res.status(200).json(driver);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getSeasonsByDriverId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;    
    if (Number.isNaN(+id)) return res.status(400).send("Invalid id");
    const seasons = await getSeasonsById(+id);    
    return res.status(200).json(seasons);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getCarsByDriverId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;    
    if (Number.isNaN(+id)) return res.status(400).send("Invalid id");
    const cars = await getCarsById(+id);    
    return res.status(200).json(cars);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

export const getDriverCareerByDriverId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;    
    if (Number.isNaN(+id)) return res.status(400).send("Invalid id");
    const cars = await getDriverCareerById(+id);    
    return res.status(200).json(cars);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send({ err: ERROR.ERROR_MESSAGE });
  }
};

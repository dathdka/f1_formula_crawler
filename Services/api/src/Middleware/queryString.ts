import { logger } from "../Initialize/logger";
import { NextFunction, Request, Response } from "express";

export const queryStringMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString = req.query as any;
  for (let comparator in queryString) {
    if (
      comparator.match(/[^0-9a-z\@\/\.\_]/gi) ||
      queryString[comparator].match(/[^0-9a-z\@\/\.\_\:]/gi)
    ) {
      logger.info("Invalid query");
      return res.status(400).send({ err: "Invalid query string" });
    }
  }
  next();
};

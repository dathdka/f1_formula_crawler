import { NextFunction, Request, Response } from "express";

export const driverValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString = req.query as any;
  for (let comparator in queryString) {
    if (
      comparator.match(/[^0-9a-z\@\/\.]/gi) ||
      queryString[comparator].match(/[^0-9a-z\@\/\.]/gi)
    ) {
      return res.status(400).send({ err: "invalid query" });
    }
  }
  next();
};

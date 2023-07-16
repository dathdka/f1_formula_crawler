import "dotenv/config";

const OPERATORS = {
  start: ">=",
  end: "<=",
  lte: "<=",
  "<=": "<=",
  lessThan: "<=",
  "<": "<",
  gte: ">=",
  greaterThan: ">=",
  equals: "=",
  like: "like",
  is: "is",
  emptyOrNull: { is: "is", equals: "=" },
};

const ERROR_MESSAGE = "something went wrong, please try again later";

const CONDITIONS = {
  DEFAULT_PAGE : 0,
  DEFAULT_LIMIT : 100,
}


module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  OPERATORS,
  CONDITIONS,
  ERROR_MESSAGE
};

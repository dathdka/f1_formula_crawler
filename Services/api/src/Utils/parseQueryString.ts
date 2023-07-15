import { Condition } from "../types/conditions/Condition";
import moment from "moment";
const OPERATORS = require("../constants").OPERATORS;
const CONDITIONS = require("../constants").CONDITIONS;

const parseValue = (value: string, operator: string) => {
  switch (operator) {
    case "emptyOrNull":
      return { null: null, empty: "" };
    case "is":
      return null;
    case "like":
      return `%${value}%`;
    case "start":
      return moment(value).format("MM/DD/YYYY");
    case "end":
      return moment(value).format("MM/DD/YYYY");
    default:
      return value;
  }
};

export const parseQueryString = (queryString: any) => {
  const conditions: Condition[] = [];
  let page = CONDITIONS.DEFAULT_PAGE;
  let limit = CONDITIONS.DEFAULT_LIMIT;
  if (!queryString) {
    return { conditions, page, limit };
  }
  for (let query in queryString) {
    if (query === "page") {
      page = +queryString[query] || CONDITIONS.DEFAULT_PAGE;
      continue;
    } else if (query === "limit") {
      limit = +queryString[query] || CONDITIONS.DEFAULT_LIMIT;
      continue;
    }
    let [columnName, operator] = query.split(".");

    operator = operator ? OPERATORS[operator] : "=";
    conditions.push({
      columnName: columnName ? columnName.replace(/[@]/g, ".") : "",
      operator,
      value: parseValue(queryString[query], operator),
    });
  }

  return { conditions, page, limit };
};

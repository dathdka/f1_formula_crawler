const MONTH_OF_YEAR = require("../constants").MONTH;

export const formatDate = (date: string) => {
  let [day, month, year] = date.split(" ");
  month = MONTH_OF_YEAR[`${month}`];
  return [month, day, year].join('/')
};

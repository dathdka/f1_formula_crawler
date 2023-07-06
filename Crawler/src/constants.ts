import "dotenv/config";

const crawlSelector = {
  URL: "https://www.formula1.com/en/results.html/2023/races.html",
  COOKIES_CONFIRM:
    "#truste-consent-track > div.trustarc-banner-section > div.trustarc-banner-container",
  ACCEPT_COOKIES_BUTTON: "#truste-consent-button",
  RACE_DATE:
    "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content-header.group > p > .full-date",
  CIRCUIT_NAME:
    "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content-header.group > p > span.circuit-info",
  DRIVER_INFO:
    "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content > div > table > tbody > tr",
  DRIVER_FIRST_NAME: "td:nth-child(3) > a > span.hide-for-tablet",
  DRIVER_LAST_NAME: "td:nth-child(3) > a > span.hide-for-mobile",
  DRIVER_NATIONALITY: "td.dark.semi-bold.uppercase",
  DRIVER_CAR: "td:nth-child(5) > a",
  DRIVER_RESULTS:
    "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content.group > div.resultsarchive-col-right > table > tbody > tr",
  DRIVER_POSITION: "td:nth-child(2)",
  DRIVER_RANK_FIRST_NAME: "td:nth-child(4) > span.hide-for-tablet",
  DRIVER_RANK_LAST_NAME: "td:nth-child(4) > span.hide-for-mobile",
  DRIVER_NUMBER: "td.dark.hide-for-mobile",
  DRIVER_COMPLETED_LAPS: "td.bold.hide-for-mobile",
  DRIVER_FINISH_TIME: "td:nth-child(7)",
  DRIVER_POINTS: "td:nth-child(8)",
  FASTEST_LAPS_RESULT:
    "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content.group > div.resultsarchive-col-right > table > tbody > tr",
  FASTEST_LAPS_DRIVER_FIRST_NAME: "td:nth-child(4) > span.hide-for-tablet",
  FASTEST_LAPS_DRIVER_LAST_NAME: "td:nth-child(4) > span.hide-for-mobile",
  FASTEST_LAPS_LAP: "td:nth-child(6)",
  FASTEST_LAPS_TIME_OF_DAY: "td:nth-child(7)",
  FASTEST_LAPS_TIME: "td:nth-child(8)",
  FASTEST_LAPS_AVERAGE_SPEED: "td:nth-child(9)",
  QUALIFYING_RESULT: "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content.group > div.resultsarchive-col-right > table > tbody > tr",
  QUALIFYING_DRIVER_FIRST_NAME: "td:nth-child(4) > span.hide-for-tablet",
  QUALIFYING_DRIVER_LAST_NAME: "td:nth-child(4) > span.hide-for-mobile",
  QUALIFYING_Q1: "td:nth-child(6)",
  QUALIFYING_Q2: "td:nth-child(7)",
  QUALIFYING_Q3: "td:nth-child(8)",
  QUALIFYING_LAPS: "td.semi-bold.hide-for-mobile",
  SEASON_URLS:
    "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-filter-container > div:nth-child(1) > ul > li > a",
  RACE_URLS:
    "body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-filter-container > div:nth-child(3) > ul > li > a",
};

const monthOfYear = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  CRAWL: crawlSelector,
  MONTH: monthOfYear,
};

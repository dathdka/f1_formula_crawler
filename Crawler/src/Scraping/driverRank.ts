import { Page } from "puppeteer";
import { SeasonDriver } from "../types/SeasonDriver";
import { SeasonRace } from "../types/SeasonRace";
import { DriverRank } from "../types/DriverRank";
import { formatDate } from "../Utils/formatDate";
import { createNew } from "../Service/driver_rank";
import moment from "moment";
const CRAWL_SELECTOR = require("../constants").CRAWL;

const getResults = async (
  page: Page,
  raceUrl: string,
  seasonRaces: SeasonRace[],
  seasonDrivers: SeasonDriver[]
) => {
  await page.goto(raceUrl);

  const resultElements = await page.$$(CRAWL_SELECTOR.DRIVER_RESULTS);

  if (resultElements.length === 0) throw new Error("no element found");
  for (let resultElement of resultElements) {
    const position = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_POSITION,
      (position) => +position.textContent || 0
    );

    const firstName = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_RANK_FIRST_NAME,
      (firstName) => firstName.textContent
    );

    const lastName = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_RANK_LAST_NAME,
      (lastName) => lastName.textContent
    );

    const number = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_NUMBER,
      (number) => +number.textContent || 0
    );

    const completed_laps = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_COMPLETED_LAPS,
      (completedLaps) => +completedLaps.textContent || 0
    );

    const finish_time = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_FINISH_TIME,
      (finishTime) => finishTime.textContent
    );

    const points = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_POINTS,
      (points) => +points.textContent || 0
    );

    const raceDate = formatDate(
      await page.$eval(
        CRAWL_SELECTOR.RACE_DATE,
        (raceDate) => raceDate.textContent
      )
    );

    const race_id = seasonRaces.find((seasonRace) => {
      const formatedDate = moment(seasonRace.race?.date).format("MM/DD/YYYY");
      return formatedDate == raceDate;
    })?.id;

    const driver_id = seasonDrivers.find((seasonDriver) => {
      return seasonDriver.driver?.name === `${firstName} ${lastName}`;
    })?.id;

    const driverRank: DriverRank = {
      driver_id,
      race_id,
      position,
      points,
      completed_laps,
      finish_time,
    };

    await createNew(driverRank);
  }
};

export const driverRank = async (
  page: Page,
  seasonUrl: string,
  seasonRaces: SeasonRace[],
  seasonDrivers: SeasonDriver[]
) => {
  await page.goto(seasonUrl);
  await page.waitForSelector(CRAWL_SELECTOR.RACE_URLS);

  const raceUrls = await page.$$eval(CRAWL_SELECTOR.RACE_URLS, (races) => {
    races.shift();
    return races.map((race) => {
      return race.href;
    });
  });

  for (let raceUrl of raceUrls) {
    try {
      await getResults(page, raceUrl, seasonRaces, seasonDrivers);
    } catch (error) {
      continue;
    }
  }
};

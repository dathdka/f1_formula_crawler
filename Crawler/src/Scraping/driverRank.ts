import { Page } from "puppeteer";
import moment from "moment";

import { SeasonDriver } from "../types/SeasonDriver";
import { SeasonRace } from "../types/SeasonRace";
import { DriverRank } from "../types/DriverRank";

import { createNew, updateData as driverRankUpdate } from "../Service/driver_rank";
import { updateData as seasonDriverUpdate } from "../Service/season_driver";

import { fastestLaps } from "./fastest_laps";
import { qualifying } from "./qualifying";
import { pitStop } from "./pitStop";

import { formatDate } from "../Utils/formatDate";
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

  let driverRanks: DriverRank[] = [];
  for (let resultElement of resultElements) {
    const position = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_POSITION,
      (position) => +position.textContent.trim() || 0
    );

    const firstName = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_RANK_FIRST_NAME,
      (firstName) => firstName.textContent.trim()
    );

    const lastName = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_RANK_LAST_NAME,
      (lastName) => lastName.textContent.trim()
    );

    const number = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_NUMBER,
      (number) => +number.textContent.trim() || 0
    );

    const completed_laps = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_COMPLETED_LAPS,
      (completedLaps) => +completedLaps.textContent.trim() || 0
    );

    const finish_time = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_FINISH_TIME,
      (finishTime) => finishTime.textContent.trim()
    );

    const points = await resultElement.$eval(
      CRAWL_SELECTOR.DRIVER_POINTS,
      (points) => +points.textContent.trim() || 0
    );

    const raceDate = formatDate(
      await page.$eval(
        CRAWL_SELECTOR.RACE_DATE,
        (raceDate) => raceDate.textContent.trim()
      )
    );

    const race_id = seasonRaces.find((seasonRace) => {
      const formatedDate = moment(seasonRace.race?.date).format("MM/DD/YYYY");
      return formatedDate == raceDate;
    })?.id;

    
    const seasonDriver = seasonDrivers.find((seasonDriver) => {
      return seasonDriver.driver?.name === `${firstName} ${lastName}`;
    });
    

    const driverRank: DriverRank = {
      driver_id: seasonDriver?.id,
      race_id,
      position,
      points,
      completed_laps,
      finish_time,
    };
    

    driverRanks.push((await createNew(driverRank)) as DriverRank);
    if (seasonDriver) {
      seasonDriver.number = number;
      await seasonDriverUpdate(seasonDriver);
    }
  }
  return driverRanks;
};

const getStartGrid = async (
  page: Page,
  raceUrl: string,
  seasonRaces: SeasonRace[],
  seasonDrivers: SeasonDriver[],
  driverRanks: DriverRank[]
) => {
  const startGridUrl = raceUrl.replace("race-result", "starting-grid");
  await page.goto(startGridUrl);
  const startGridElements = await page.$$(CRAWL_SELECTOR.START_GRID_INFO);

  if (startGridElements.length === 0) throw new Error("no element found");
  for (let startGridElement of startGridElements) {
    const firstName = await startGridElement.$eval(
      CRAWL_SELECTOR.START_GRID_FIRST_NAME,
      (firstName) => firstName.textContent.trim()
    );

    const lastName = await startGridElement.$eval(
      CRAWL_SELECTOR.START_GRID_LAST_NAME,
      (lastName) => lastName.textContent.trim()
    );

    const position = await startGridElement.$eval(
      CRAWL_SELECTOR.START_GRID_POSITION,
      (position) => position.textContent.trim()
    );

    const raceDate = formatDate(
      await page.$eval(
        CRAWL_SELECTOR.RACE_DATE,
        (raceDate) => raceDate.textContent.trim()
      )
    );

    const race_id = seasonRaces.find((seasonRace) => {
      const formatedDate = moment(seasonRace.race?.date).format("MM/DD/YYYY");
      return formatedDate == raceDate;
    })?.id;

    const driver_id = seasonDrivers.find((seasonDriver) => {
      return seasonDriver.driver?.name === `${firstName} ${lastName}`;
    })?.id;

    const driverRank = driverRanks.find((driverRank) => {
      return (
        driverRank.driver_id === driver_id && driverRank.race_id === race_id
      );
    });

    if (driverRank) {
      driverRank.start_position = +`${position}`;
      await driverRankUpdate(driverRank);
    }
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

  let driverRanks: DriverRank[] = [];
  for (let raceUrl of raceUrls) {
    try {
      driverRanks.push(...(await getResults(page, raceUrl, seasonRaces, seasonDrivers)));
      await getStartGrid(
        page,
        raceUrl,
        seasonRaces,
        seasonDrivers,
        driverRanks
      );
    } catch (error) {
      console.log(error);
      continue;
    }
  }
  for (let raceUrl of raceUrls) {
    try {
      await fastestLaps(page, raceUrl, seasonRaces, seasonDrivers, driverRanks);
      await qualifying(page, raceUrl, seasonRaces, seasonDrivers, driverRanks);
      await pitStop(page, raceUrl, seasonRaces, seasonDrivers, driverRanks);
    } catch (error) {
      console.log(error);
      continue;
    }
  }
};

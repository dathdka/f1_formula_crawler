import { Page } from "puppeteer";
import moment from "moment";
import { SeasonDriver } from "../types/SeasonDriver";
import { SeasonRace } from "../types/SeasonRace";
import { formatDate } from "../Utils/formatDate";
import { DriverRank } from "../types/DriverRank";
import { FastestLap } from "../types/FastestLap";
import { createNew } from "../Service/fastest_lap";
import { updateData } from "../Service/driver_rank";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const fastestLaps = async (
  page: Page,
  raceUrl: string,
  seasonRaces: SeasonRace[],
  seasonDrivers: SeasonDriver[],
  driverRanks: DriverRank[]
) => {
  const fastestLapUrl = raceUrl.replace("race-result", "fastest-laps");  
  await page.goto(fastestLapUrl);   
  const fastestLapsResultElements = await page.$$(
    CRAWL_SELECTOR.FASTEST_LAPS_RESULT
  );
  if (fastestLapsResultElements.length === 0) throw new Error("no element found");
  for (let fastestLapsResultElement of fastestLapsResultElements) {
    const firstName = await fastestLapsResultElement.$eval(
      CRAWL_SELECTOR.FASTEST_LAPS_DRIVER_FIRST_NAME,
      (firstName) => firstName.textContent
    );
      
    const lastName = await fastestLapsResultElement.$eval(
      CRAWL_SELECTOR.FASTEST_LAPS_DRIVER_LAST_NAME,
      (lastName) => lastName.textContent
    );

    const fastest_lap = await fastestLapsResultElement.$eval(
      CRAWL_SELECTOR.FASTEST_LAPS_LAP,
      (fastestLap) => fastestLap.textContent
    );

    const time_of_day = await fastestLapsResultElement.$eval(
      CRAWL_SELECTOR.FASTEST_LAPS_TIME_OF_DAY,
      (timeOfDay) => timeOfDay.textContent
    );

    const time = await fastestLapsResultElement.$eval(
      CRAWL_SELECTOR.FASTEST_LAPS_TIME,
      (time) => time.textContent
    );

    const average_speed = await fastestLapsResultElement.$eval(
      CRAWL_SELECTOR.FASTEST_LAPS_AVERAGE_SPEED,
      (averageSpeed) => averageSpeed.textContent
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

    const driverRank = driverRanks.find((driverRank) => {
      return (
        driverRank.driver_id === driver_id && driverRank.race_id === race_id
      );
    });

    const fastestLapsResult: FastestLap = {
      fastest_lap,
      time,
      time_of_day,
      average_speed,
    };
    
    const newFastestLapRecord = await createNew(fastestLapsResult) as FastestLap ;
    
    if (driverRank) {
      driverRank.fastest_lap_id = newFastestLapRecord.id;
      await updateData(driverRank);
    }
  }
};

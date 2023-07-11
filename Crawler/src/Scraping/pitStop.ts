import { Page } from "puppeteer";
import moment from "moment";
import { SeasonDriver } from "../types/SeasonDriver";
import { SeasonRace } from "../types/SeasonRace";
import { PitStop } from "../types/PitStop";
import { formatDate } from "../Utils/formatDate";
import { DriverRank } from "../types/DriverRank";
import { createNew } from "../Service/pit_stop";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const pitStop = async (
  page: Page,
  raceUrl: string,
  seasonRaces: SeasonRace[],
  seasonDrivers: SeasonDriver[],
  driverRanks: DriverRank[]
) => {
  const pitStopUrl = raceUrl.replace("race-result", "pit-stop-summary");
  await page.goto(pitStopUrl);
  const pitStopResultElements = await page.$$(CRAWL_SELECTOR.PIT_STOP_RESULT);

  if (pitStopResultElements.length === 0) throw new Error("no element found");

  for (let pitStopResultElement of pitStopResultElements) {
    const firstName = await pitStopResultElement.$eval(
      CRAWL_SELECTOR.PIT_STOP_DRIVER_FIRST_NAME,
      (firstName) => firstName.textContent.trim()
    );

    const lastName = await pitStopResultElement.$eval(
      CRAWL_SELECTOR.PIT_STOP_DRIVER_LAST_NAME,
      (lastName) => lastName.textContent.trim()
    );

    const number_of_stops = await pitStopResultElement.$eval(
      CRAWL_SELECTOR.PIT_STOP_NUMBER_OF_STOP,
      (numberOfStop) => numberOfStop.textContent.trim()
    );

    const time = await pitStopResultElement.$eval(
      CRAWL_SELECTOR.PIT_STOP_TIME,
      (time) => time.textContent.trim()
    );

    let time_of_day = "";
    const timeOfDayElement = await pitStopResultElement.$(
      CRAWL_SELECTOR.PIT_STOP_TIME_OF_DAY
    );
    if (timeOfDayElement) {
      time_of_day = await pitStopResultElement.$eval(
        CRAWL_SELECTOR.PIT_STOP_TIME_OF_DAY,
        (timeOfDay) => timeOfDay.textContent.trim()
      );
    }

    const total_time = await pitStopResultElement.$eval(
      CRAWL_SELECTOR.PIT_STOP_TOTAL,
      (totalTime) => totalTime.textContent.trim()
    );

    const raceDate = formatDate(
      await page.$eval(CRAWL_SELECTOR.RACE_DATE, (raceDate) =>
        raceDate.textContent.trim()
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

    const pitStopResult: PitStop = {
      time,
      time_of_day,
      total_time,
      number_of_stops,
      driver_rank_id: +`${driverRank?.id}`,
    };    

    await createNew(pitStopResult);
  }
};

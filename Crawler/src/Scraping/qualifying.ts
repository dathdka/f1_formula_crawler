import { Page } from "puppeteer";
import moment from "moment";
import { SeasonDriver } from "../types/SeasonDriver";
import { SeasonRace } from "../types/SeasonRace";
import { formatDate } from "../Utils/formatDate";
import { DriverRank } from "../types/DriverRank";
import { FastestLap } from "../types/FastestLap";
import { createNew } from "../Service/qualifying";
import { updateData } from "../Service/driver_rank";
import { Qualifying } from "../types/Qualifying";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const qualifying = async (
  page: Page,
  raceUrl: string,
  seasonRaces: SeasonRace[],
  seasonDrivers: SeasonDriver[],
  driverRanks: DriverRank[]
) => {
  const qualifyingUrl = raceUrl.replace("race-result", "qualifying");
  await page.goto(qualifyingUrl);
  const qualifyingResultElements = await page.$$(
    CRAWL_SELECTOR.QUALIFYING_RESULT
  );

  if (qualifyingResultElements.length === 0)
    throw new Error("no element found");

  for (let qualifyingResultElement of qualifyingResultElements) {
    const firstName = await qualifyingResultElement.$eval(
      CRAWL_SELECTOR.QUALIFYING_DRIVER_FIRST_NAME,
      (firstName) => firstName.textContent.trim()
    );

    const lastName = await qualifyingResultElement.$eval(
      CRAWL_SELECTOR.QUALIFYING_DRIVER_LAST_NAME,
      (lastName) => lastName.textContent.trim()
    );

    let laps = 0;
    let q2 = '';
    let q3 = '';
    const lapsElement = await qualifyingResultElement.$(
      CRAWL_SELECTOR.QUALIFYING_LAPS
    );
    if (lapsElement){
      laps = await qualifyingResultElement.$eval(
        CRAWL_SELECTOR.QUALIFYING_LAPS,
        (qualifyingLaps) => qualifyingLaps.textContent.trim()
      );
    }

    const q1 = await qualifyingResultElement.$eval(
      CRAWL_SELECTOR.QUALIFYING_Q1,
      (q1) => q1.textContent.trim()
    );

    const q2Element = await qualifyingResultElement.$(CRAWL_SELECTOR.QUALIFYING_Q2);
    if(q2Element){
      q2 = await qualifyingResultElement.$eval(
        CRAWL_SELECTOR.QUALIFYING_Q2,
        (q2) => q2.textContent.trim()
      );
    }
     
    const q3Element = await qualifyingResultElement.$(CRAWL_SELECTOR.QUALIFYING_Q3);
    if(q3Element){
      q3 = await qualifyingResultElement.$eval(
        CRAWL_SELECTOR.QUALIFYING_Q3,
        (q3) => q3.textContent.trim()
      );
    }

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

    const qualifyingResult: Qualifying = {
      laps,
      q1,
      q2,
      q3,
    };
    

    const newQualifyingLapRecord = (await createNew(
      qualifyingResult
    )) as FastestLap;

    if (driverRank) {
      driverRank.qualifying_id = newQualifyingLapRecord.id;
      await updateData(driverRank);
    }
  }
};

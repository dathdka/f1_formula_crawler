import { Page } from "puppeteer";
import { Driver } from "../types/Driver";
import { SeasonDriver } from "../types/SeasonDriver";
import { Season } from "../types/Season";
import { findSeasonByName } from "../Service/seasons";
import { createNew as createSeasonDriver } from "../Service/season_driver";
import { createNew as createCar } from "../Service/cars";
import { Car } from "../types/Car";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const getSeasonDriver = async (page: Page, driver: Driver, carName: string) => {
  const selectedSeason = await page.$eval(
    `${CRAWL_SELECTOR.SEASON_URLS}.selected`,
    (season) => season.textContent?.trim()
  );

  const existsSeason = (await findSeasonByName(selectedSeason || "")) as Season;
  const carRecord = await createCar({name : carName}) as Car;
  
  const seasonDriver: SeasonDriver = {
    season_id: existsSeason.id,
    driver_id: driver.id,
    car_id: +`${carRecord.id}`,
  };
  return await createSeasonDriver(seasonDriver) as SeasonDriver;
};

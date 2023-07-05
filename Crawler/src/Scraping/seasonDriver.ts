import { Page } from "puppeteer";
import { Driver } from "../types/Driver";
import { SeasonDriver } from "../types/SeasonDriver";
import { Season } from "../types/Season";
import { findSeasonByName } from "../Service/seasons";
import { createNew } from "../Service/season_driver";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const getSeasonDriver = async (page: Page, driver: Driver) => {
  const selectedSeason = await page.$eval(
    `${CRAWL_SELECTOR.SEASON_URLS}.selected`,
    (season) => season.textContent?.trim()
  );

  const driverInfo = await page.$(CRAWL_SELECTOR.DRIVER_INFO);
  const car = await driverInfo?.$eval(
    CRAWL_SELECTOR.DRIVER_CAR,
    (car) => car.textContent
  );

  const existsSeason = (await findSeasonByName(selectedSeason || "")) as Season;

  const seasonDriver: SeasonDriver = {
    season_id: existsSeason.id,
    driver_id: driver.id,
    car: car,
  };
  await createNew(seasonDriver);
};

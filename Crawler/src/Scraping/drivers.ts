import { Page } from "puppeteer";
import { Driver } from "../types/Driver";
import { createNew } from "../Service/drivers";
import { getSeasonDriver } from "./seasonDriver";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const getDriver = async (page: Page, raceUrl: string) => {
  const driverUrl = raceUrl.replace('races', 'drivers');
  await page.goto(driverUrl);
  await page.waitForSelector(CRAWL_SELECTOR.DRIVER_INFO);
  const driverInfoElements = await page.$$(CRAWL_SELECTOR.DRIVER_INFO);
  for (let driverInfoElement of driverInfoElements) {
    const firstName = await driverInfoElement.$eval(
      CRAWL_SELECTOR.DRIVER_FIRST_NAME,
      (firstName) => firstName.textContent
    );
    const lastName = await driverInfoElement.$eval(
      CRAWL_SELECTOR.DRIVER_LAST_NAME,
      (lastName) => lastName.textContent
    );
    const nationality = await driverInfoElement.$eval(
      CRAWL_SELECTOR.DRIVER_NATIONALITY,
      (nationality) => nationality.textContent
    );
    const driver: Driver = {
      name: `${firstName} ${lastName}`,
      nationality: nationality,
    };    
    const newDriver = await createNew(driver) as Driver;
    await getSeasonDriver(page, newDriver);
  }
};

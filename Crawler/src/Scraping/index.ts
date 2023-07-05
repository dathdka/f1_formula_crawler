import { startBrowser } from "../Initialize/puppeteer";
import { Page } from "puppeteer";
import { createNew } from "../Service/seasons";
import { Season } from "types/Season";
import { getRacesAndCircuits } from "./racesAndCircuits";
import { getDriver } from "./drivers";
import { getSeasons } from "./seasons";
const CRAWL_SELECTOR = require("../constants").CRAWL;


export const startCrawl = async () => {
  let browser = await startBrowser();
  const page = (await browser.pages())[0];
  try {
    await page.goto(CRAWL_SELECTOR.URL);
    await page.waitForSelector(CRAWL_SELECTOR.COOKIES_CONFIRM, {
      visible: true,
    });
    await page.$eval(CRAWL_SELECTOR.ACCEPT_COOKIES_BUTTON, (button) =>
      button.click()
    );
    const seasonsInfo = await getSeasons(page);
        
    const driverPage = await browser.newPage();
    for(let season of seasonsInfo){
      await createNew(season.name);
      await getRacesAndCircuits(season.link, page);
      await getDriver(driverPage, season.link)
    }
    
    await driverPage.close()

  } catch (error) {
    console.log(error);
  } finally {
    // await browser.close();
  }
};

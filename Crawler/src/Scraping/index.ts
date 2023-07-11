import { startBrowser } from "../Initialize/puppeteer";
import { createNew } from "../Service/seasons";
import { getRacesAndCircuits } from "./racesAndCircuits";
import { getTeamsAndTeamRank } from "./teamsAndTeamRank";
import { getDriver } from "./drivers";
import { getSeasons } from "./seasons";
import { SeasonRace } from "types/SeasonRace";
import { SeasonDriver } from "types/SeasonDriver";
import { driverRank } from "./driverRank";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const startCrawl = async () => {
  let browser = await startBrowser();
  const page = (await browser.pages())[0];
  try {
    const startTimeCrawl = new Date().getTime();
    await page.goto(CRAWL_SELECTOR.URL);
    await page.waitForSelector(CRAWL_SELECTOR.COOKIES_CONFIRM, {
      visible: true,
    });
    await page.$eval(CRAWL_SELECTOR.ACCEPT_COOKIES_BUTTON, (button) =>
      button.click()
    );
    const seasonsInfo = await getSeasons(page);
    let seasonRaces: SeasonRace[] = [];
    let seasonDriver: SeasonDriver[] = [];
    for (let season of seasonsInfo) {
      try {
        let seasonStartCrawlTime = new Date().getTime();
        console.log(`Crawling season ${season.name}`);
        await createNew(season.name);
        seasonRaces = [...(await getRacesAndCircuits(season.link, page))];
        seasonDriver = [...(await getDriver(page, season.link))];
        await driverRank(page, season.link, seasonRaces, seasonDriver);
        await getTeamsAndTeamRank(page, season.link);
        let seasonTotalCrawlTime =
          (new Date().getTime() - seasonStartCrawlTime) / (60 * 1000);
        console.log(
          `${season.name} took ${seasonTotalCrawlTime} minutes to complete`
        );
      } catch (error) {
        continue;
      }
    }
    const totalTimeCrawl =
      (new Date().getTime() - startTimeCrawl) / (60 * 1000);
    console.log(`Total time: ${totalTimeCrawl} minutes`);
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
};

import { Page } from "puppeteer";
import { Season } from "../types/Season";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const getSeasons = async (page: Page): Promise<Season[]> => {
  await page.waitForSelector(CRAWL_SELECTOR.SEASON_URLS);
  const seasons = await page.$$eval(CRAWL_SELECTOR.SEASON_URLS, (seasons) =>
    seasons.map((season) => {
      return { name: season.textContent.trim(), link: season.href };
    })
  );
  return seasons;
};

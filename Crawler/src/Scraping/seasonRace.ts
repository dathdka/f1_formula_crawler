import { Page } from "puppeteer";
import { findSeasonByName } from "../Service/seasons";
import { Race } from "../types/Race";
import { Season } from "../types/Season";
import { SeasonRace } from "../types/SeasonRace";
import { createNew } from "../Service/season_race";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const getSeasonRace = async (page: Page, race: Race) => {
  const selectedSeason = await page.$eval(
    `${CRAWL_SELECTOR.SEASON_URLS}.selected`,
    (season) => season.textContent?.trim()
  );
  const existsSeason = (await findSeasonByName(selectedSeason || "")) as Season;
  
  const seasonRace: SeasonRace = {
    race_id: +`${race.id}`,
    season_id: +`${existsSeason.id}`,
  };
  return await createNew(seasonRace) as SeasonRace;
};

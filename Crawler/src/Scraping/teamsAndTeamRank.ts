import { Page } from "puppeteer";
import { createNew as seasonCreate } from "../Service/seasons";
import { createNew as teamCreate } from "../Service/teams";
import { createNew as seasonTeamCreate } from "../Service/season_team";
import { Season } from "../types/Season";
import { SeasonTeam } from "../types/SeasonTeam";
import { Team } from "../types/Team";
const CRAWL_SELECTOR = require("../constants").CRAWL;

export const getTeamsAndTeamRank = async (page: Page, seasonUrl: string) => {
  const teamUrl = seasonUrl.replace("races", "team");
  await page.goto(teamUrl);
  const teamResultElements = await page.$$(CRAWL_SELECTOR.TEAM_RESULTS);
  if (teamResultElements.length === 0) throw new Error("no element found");
  const selectedSeason = await page.$eval(
    `${CRAWL_SELECTOR.SEASON_URLS}.selected`,
    (season) => season.textContent?.trim()
  );
  const seasonRecord = (await seasonCreate(`${selectedSeason}`)) as Season;
  for (let teamResultElement of teamResultElements) {
    const name = await teamResultElement.$eval(
      CRAWL_SELECTOR.TEAM_NAME,
      (name) => name.textContent.trim()
    );
    const teamRecord = (await teamCreate({ name })) as Team;
    const points = await teamResultElement.$eval(
      CRAWL_SELECTOR.TEAM_POINTS,
      (points) => points.textContent.trim()
    );
    const seasonTeam: SeasonTeam = {
      team_id: +`${teamRecord.id}`,
      season_id: +`${seasonRecord.id}`,
      points,
    };
    await seasonTeamCreate(seasonTeam);
  }
};

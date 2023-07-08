import { SeasonTeam } from "../types/SeasonTeam";
import { findBySeasonTeam, create } from "../Repos/season_team";

export const createNew = async (seasonTeam: SeasonTeam) => {
  const seasonTeamAlreadyExists = await findBySeasonTeam(seasonTeam)
  if (!seasonTeamAlreadyExists) {
    return await create(seasonTeam);
  }
  return seasonTeamAlreadyExists;
};

import { SeasonRace } from "../types/SeasonRace";
import { findBySeasonRace, create } from "../Repos/season_race";

export const createNew = async (seasonRace: SeasonRace) => {
  const seasonRaceAlreadyExists = await findBySeasonRace(seasonRace);
  if (!seasonRaceAlreadyExists) {
    return await create(seasonRace);
  }
  return seasonRaceAlreadyExists;
};
